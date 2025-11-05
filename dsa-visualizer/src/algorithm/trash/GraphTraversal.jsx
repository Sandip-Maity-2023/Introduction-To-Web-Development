import React from 'react'

export function buildSampleGraph() {
  return {
    0:[1,2],
    1:[0,3,4],
    2:[0,5],
    3:[1],
    4:[1,5],
    5:[2,4],
  };
}

export function bfsGraph(graph,start=0){
    const animation=[];
    const visited=new Set();
    let queue=[start];

    while(queue.length>0){
        const node=queue.shift(); //
        if(!visited.has(node)){
            animation.push(node);
            visited.add(node);
            for(let neighbour of graph[node]){
                if(!visited.has(neighbour)) queue.push(neighbour);
            }
        }
    }
    return animation;
}

export function dfsGraph(graph,start=0){
    const animation=[];
    const visited=new Set();

    function dfs(node){
        if(visited.has(node)) return;
        animation.push(node);
        visited.add(node);
        for(let neighbour of graph[node]){
            dfs(neighbour);
        }
    }
    dfs(start);
    return animation;
}
