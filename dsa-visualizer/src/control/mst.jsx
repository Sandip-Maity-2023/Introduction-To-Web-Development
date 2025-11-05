import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- I. GRAPH DATA & UTILITIES ---

const INITIAL_GRAPH = {
    nodes: [
        { id: 'A', x: 100, y: 100 },
        { id: 'B', x: 250, y: 50 },
        { id: 'C', x: 400, y: 100 },
        { id: 'D', x: 450, y: 300 },
        { id: 'E', x: 300, y: 400 },
        { id: 'F', x: 150, y: 350 },
        { id: 'G', x: 550, y: 450 },
        { id: 'H', x: 650, y: 150 }
    ],
    edges: [
        { u: 'A', v: 'B', w: 4 },
        { u: 'A', v: 'F', w: 8 },
        { u: 'B', v: 'C', w: 8 },
        { u: 'B', v: 'H', w: 11 },
        { u: 'C', v: 'D', w: 7 },
        { u: 'C', v: 'H', w: 4 },
        { u: 'D', v: 'E', w: 9 },
        { u: 'D', v: 'G', w: 2 },
        { u: 'E', v: 'F', w: 10 },
        { u: 'E', v: 'G', w: 14 },
        { u: 'F', v: 'D', w: 4 },
        { u: 'G', v: 'H', w: 6 }
    ]
};

// Custom Priority Queue for Prim's
class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(element, priority) {
        this.values.push({element, priority});
        this.values.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        return this.values.shift();
    }
    isEmpty() {
        return this.values.length === 0;
    }
}

// Disjoint Set (Union-Find) structure for Kruskal's
class UnionFind {
    constructor(nodes) {
        this.parent = new Map(nodes.map(n => [n.id, n.id]));
        this.rank = new Map(nodes.map(n => [n.id, 0]));
    }
    find(i) {
        if (this.parent.get(i) === i) return i;
        let root = this.find(this.parent.get(i));
        this.parent.set(i, root);
        return root;
    }
    union(i, j) {
        let rootI = this.find(i);
        let rootJ = this.find(j);
        if (rootI !== rootJ) {
            if (this.rank.get(rootI) < this.rank.get(rootJ)) {
                this.parent.set(rootI, rootJ);
            } else if (this.rank.get(rootI) > this.rank.get(rootJ)) {
                this.parent.set(rootJ, rootI);
            } else {
                this.parent.set(rootJ, rootI);
                this.rank.set(rootI, this.rank.get(rootI) + 1);
            }
            return true;
        }
        return false;
    }
}


// --- II. ALGORITHM GENERATOR FUNCTIONS ---

function* primsAlgorithm(graph, startNodeId) {
    const nodeIds = graph.nodes.map(n => n.id);
    const adj = new Map(nodeIds.map(id => [id, []]));

    graph.edges.forEach(edge => {
        adj.get(edge.u).push({ neighbor: edge.v, weight: edge.w });
        adj.get(edge.v).push({ neighbor: edge.u, weight: edge.w });
    });

    const pq = new PriorityQueue();
    const visited = new Set();
    const mst = [];
    let totalW = 0;

    pq.enqueue({ node: startNodeId, edge: null }, 0); 

    while (!pq.isEmpty() && visited.size < nodeIds.length) {
        const { element: { node: u, edge: connectingEdge }, priority: weight } = pq.dequeue();

        if (visited.has(u)) continue;
        
        visited.add(u);
        
        // State yielded before exploring neighbors for visualization clarity
        yield { mstEdges: [...mst], totalWeight: totalW, activeNode: u };

        if (connectingEdge) {
            mst.push(connectingEdge);
            totalW += connectingEdge.w;
        }

        // Explore neighbors and update PQ
        for (const { neighbor: v, weight: w } of adj.get(u)) {
            if (!visited.has(v)) {
                pq.enqueue({ 
                    node: v, 
                    edge: { u, v, w }
                }, w);
            }
        }
    }
    // Final state
    yield { mstEdges: mst, totalWeight: totalW, activeNode: null, finished: true };
}

function* kruskalsAlgorithm(graph) {
    const sortedEdges = [...graph.edges].sort((a, b) => a.w - b.w);
    const uf = new UnionFind(graph.nodes);
    const mst = [];
    let totalW = 0;
    let edgeIndex = 0;
    
    while (mst.length < graph.nodes.length - 1 && edgeIndex < sortedEdges.length) {
        const edge = sortedEdges[edgeIndex++];
        
        // State 1: Highlight the edge being considered
        yield { mstEdges: [...mst], totalWeight: totalW, activeEdge: edge };
        
        if (uf.union(edge.u, edge.v)) {
            mst.push(edge);
            totalW += edge.w;
            
            // State 2: Edge is accepted (green line in next draw)
            yield { mstEdges: [...mst], totalWeight: totalW, activeEdge: null };
        } 
        // If rejected, it moves on to the next edge immediately.
    }
    // Final state
    yield { mstEdges: mst, totalWeight: totalW, activeEdge: null, finished: true };
}


// --- III. REACT COMPONENT ---

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const NODE_RADIUS = 15;

const MSTVisualizer = () => {
    const canvasRef = useRef(null);
    const [graph] = useState(INITIAL_GRAPH);
    const [algorithmType, setAlgorithmType] = useState(null);
    
    // State to hold the current step's visualization data
    const [visualizationState, setVisualizationState] = useState({
        mstEdges: [],
        totalWeight: 0,
        activeNode: null, // For Prim's
        activeEdge: null, // For Kruskal's
        finished: false,
        step: 0
    });
    
    // useRef to hold the generator and control its steps
    const algorithmRef = useRef(null);
    
    // Memoize the map for quick node lookup
    const nodeMap = useMemo(() => 
        new Map(graph.nodes.map(node => [node.id, node]))
    , [graph.nodes]);

    // --- DRAWING LOGIC (useEffect) ---

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const { mstEdges, activeNode, activeEdge } = visualizationState;

        // 1. Draw Edges
        graph.edges.forEach(edge => {
            const u = nodeMap.get(edge.u);
            const v = nodeMap.get(edge.v);
            
            // Check if edge is part of the MST
            const isMST = mstEdges.some(e => 
                (e.u === edge.u && e.v === edge.v) || (e.u === edge.v && e.v === edge.u)
            );
            
            // Check if edge is currently being considered/highlighted
            const isActive = activeEdge && 
                ((activeEdge.u === edge.u && activeEdge.v === edge.v) || (activeEdge.u === edge.v && activeEdge.v === edge.u));

            ctx.beginPath();
            ctx.moveTo(u.x, u.y);
            ctx.lineTo(v.x, v.y);
            ctx.strokeStyle = isMST ? '#27ae60' : (isActive ? '#f1c40f' : '#95a5a6'); // Green, Yellow, or Grey
            ctx.lineWidth = isMST ? 4 : (isActive ? 3 : 2);
            ctx.stroke();

            // Draw weight
            const midX = (u.x + v.x) / 2;
            const midY = (u.y + v.y) / 2;
            ctx.fillStyle = '#2c3e50';
            ctx.font = '14px Arial';
            ctx.fillText(edge.w, midX + 5, midY - 5);
        });

        // 2. Draw Nodes
        graph.nodes.forEach(node => {
            const isCurrent = node.id === activeNode; // For Prim's

            ctx.beginPath();
            ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = isCurrent ? '#e67e22' : '#3498db'; // Orange or Blue
            ctx.fill();
            ctx.strokeStyle = '#2c3e50';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw node ID
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.id, node.x, node.y);
        });
        
    }, [visualizationState, graph.edges, graph.nodes, nodeMap]); // Redraw when state changes

    // --- CONTROL HANDLERS ---

    const startAlgorithm = (type) => {
        // Reset state and set up the generator
        setVisualizationState({ mstEdges: [], totalWeight: 0, activeNode: null, activeEdge: null, finished: false, step: 0 });
        setAlgorithmType(type);
        
        let generator;
        if (type === 'prim') {
            generator = primsAlgorithm(graph, graph.nodes[0].id);
        } else if (type === 'kruskal') {
            generator = kruskalsAlgorithm(graph);
        }
        
        algorithmRef.current = generator;
        
        // Immediately run the first step
        stepAlgorithm();
    };

    const stepAlgorithm = () => {
        if (!algorithmRef.current) return;
        
        const result = algorithmRef.current.next();

        if (!result.done) {
            setVisualizationState(prevState => ({
                ...result.value,
                step: prevState.step + 1
            }));
        } else {
            setVisualizationState(prevState => ({
                ...result.value,
                step: prevState.step,
                finished: true
            }));
            algorithmRef.current = null; // Mark as done
            setAlgorithmType(null);
        }
    };
    
    const resetGraph = () => {
        setVisualizationState({ mstEdges: [], totalWeight: 0, activeNode: null, activeEdge: null, finished: false, step: 0 });
        setAlgorithmType(null);
        algorithmRef.current = null;
    };


    // --- RENDERING ---

    const isRunning = algorithmRef.current !== null;

    return (
        <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f4f7f6' }}>
            <h1>Minimum Spanning Tree (MST) Visualizer</h1>

            <div style={{ marginBottom: '15px' }}>
                <button 
                    onClick={() => startAlgorithm('prim')} 
                    disabled={isRunning}
                    style={{ padding: '10px 20px', margin: '5px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#2ecc71', color: 'white' }}
                >
                    Start Prim's Algorithm
                </button>
                <button 
                    onClick={() => startAlgorithm('kruskal')} 
                    disabled={isRunning}
                    style={{ padding: '10px 20px', margin: '5px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#e67e22', color: 'white' }}
                >
                    Start Kruskal's Algorithm
                </button>
                <button 
                    onClick={stepAlgorithm} 
                    disabled={!isRunning || visualizationState.finished}
                    style={{ padding: '10px 20px', margin: '5px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#3498db', color: 'white' }}
                >
                    Next Step
                </button>
                <button 
                    onClick={resetGraph} 
                    style={{ padding: '10px 20px', margin: '5px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#e74c3c', color: 'white' }}
                >
                    Reset Graph
                </button>
            </div>

            <canvas 
                ref={canvasRef} 
                width={CANVAS_WIDTH} 
                height={CANVAS_HEIGHT} 
                style={{ border: '2px solid #3498db', backgroundColor: '#ecf0f1', marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            />

            <div style={{ marginTop: '10px', fontSize: '1.1em', color: '#34495e', fontWeight: 'bold' }}>
                {visualizationState.finished 
                    ? `✅ Algorithm Finished! Final MST Weight: ${visualizationState.totalWeight}`
                    : `Current Algorithm: ${algorithmType || 'None'} | Step: ${visualizationState.step} | MST Weight: ${visualizationState.totalWeight}`
                }
            </div>
            <div style={{ fontSize: '0.9em', color: '#7f8c8d' }}>
                {algorithmType === 'prim' && visualizationState.activeNode && `Prim's: Exploring neighbors of Node ${visualizationState.activeNode}`}
                {algorithmType === 'kruskal' && visualizationState.activeEdge && `Kruskal's: Considering Edge (${visualizationState.activeEdge.u}, ${visualizationState.activeEdge.v}) with weight ${visualizationState.activeEdge.w}`}
            </div>
        </div>
    );
};

export default MSTVisualizer;