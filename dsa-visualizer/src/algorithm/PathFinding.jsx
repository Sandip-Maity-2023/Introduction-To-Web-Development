import { random, round } from "lodash";

function allNodes(grid) {
  const re = [];
  for (const row of grid) {
    for (const node of row) {
      re.push(node);
    }
  }
  return re;
}

function sortNodes(nodes) {
  nodes.sort((a, b) => a.distance - b.distance);
}

function makeWall(grid, row, col, isW) {
  const node = grid[row][col];
  const newnode = { ...node, isWall: isW };
  grid[row][col] = newnode;
}

function isVisited(visited, node) {
  let { row: nr, col: nc } = node;
  for (let index = 0; index < visited.length; index++) {
    let { row: ir, col: ic } = visited[index];
    if (nr === ir && nc === ic) return true;
  }
  return false;
}

function updateUnvisitedNeighbours(closest, grid) {
  const neighbours = [];
  const { row, col } = closest;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);

  for (const neigh of neighbours) {
    if (!neigh.isVisited) {
      neighbours.distance = closest.distance + 1;
      neighbours.previousNode = closest;
    }
  }
}

function getUNeighbours(node, grid) {
  const neighbours = [];
  const reN = [];
  const { row, col } = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);

  for (let index = 0; index < neighbours.length; index++) {
    const neigh = neighbours[index];
    if (!neigh.isVisited) {
      neigh.previousNode = node;
      neigh.isVisited = true;
      reN.push(neigh);
    }
    return reN;
  }
}

function sortNodesStar(nodes) {
  nodes.sort((a, b) => a.distance + a.heuristic - (b.distance + b.heuristic));
}

function manhattanDistance(a, b) {
  let { row: ar, col: ac } = a;
  let { row: br, col: bc } = b;
  return Math.abs(ar - br) + Math.abs(ac - bc);
}

function updateUnvisitedNeighboursStar() {
  const neighbours = [];
  const { row, col } = curr;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  for (const neigh of neighbours) {
    if (!neigh.isVisited) {
      neigh.distance = curr.distance + 1;
      neigh.heuristic = manhattanDistance(neigh, finish);
      neigh.previousNode = curr;
    }
  }
}

function randomSelect(path) {
  return randomInt(0, path.length - 1);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function connect(grid, a, b) {
  let { row: ar, col: ac } = a;
  let { row: br, col: bc } = b;
  let row = (ar + br) / 2;
  let col = (ac + bc) / 2;
  makeWall(grid, row, col, false);
}

function validate(grid,points){
let height=grid.length,width=grid[0].length;
let pRe=[];
for(let index=0;index<points.length;index++){
    let {row,col}=points[index];
    if((0<=row && row<height && 0<=col && col<width)){
        pRe.push(points[index]);
    }
}
return pRe;
}


function getNeighbours(grid,visited,node){
let {row,col}=node;
let neigh=[{row:row+2,col:col},{row:row-2,col:col},{row:row,col:col-2}];
neigh=validate(grid,neigh.slice());
let connected=[];
let unconnected=[];

neigh.forEach(neigh=>{
    if(isVisited(visited,neigh)) connected.push(neigh);
    else unconnected.push(neigh);
});
return {c:connected,u:unconnected};
}


//Dijkstra
function dijkstra(grid, start, finish) {
  const visitedInorder = [];
  start.distance = 0;
  const unvisited = allNodes(grid);
  while (unvisited.length) {
    sortNodes(unvisited);
    const closest = unvisited.shift();
    if (closest === finish) return visitedInorder;
    if (closest.isWall) continue;
    if (closest.distance === Infinity) return visitedInorder;

    closest.isVisited = true;
    visitedInorder.push(closest);
    updateUnvisitedNeighbours(closest, grid);
  }
  return visitedInorder;
}

//DFS(Depth First Search)
function DFS(grid, start, finish) {
  const visitedInorder = [];
  let unvisited = [];
  unvisited.push(start);

  while (unvisited.length) {
    const node = unvisited.pop();
    if (node === finish) return visitedInorder;
    if (node.isWall) continue;
    node.isVisited = true;
    visitedInorder.push(node);
    unvisited = unvisited.concat(getUNeighbours(node, grid));
  }
  return visitedInorder;
}

//BFS(Breadth First Search)
function BFS(grid, start, finish) {
  const visitedInorder = [];
  let unvisited = [];
  unvisited.push(start);
  while (unvisited.length) {
    const node = unvisited.shift();
    if (node === finish) return visitedInorder;
    if (node.isWall) continue;
    node.isVisited = true;
    visitedInorder.push(node);
    unvisited = unvisited.concat(getUNeighbours(node, grid));
  }
  return visitedInorder;
}

function Astar(grid, start, finish) {
  const visitedInorder = [];
  start.distance = 0;
  start.heuristic = 0;

  const unvisited = allNodes(grid);
  while (unvisited.length) {
    sortNodesStar(unvisited);
    const curr = unvisited.shift();
    if (curr === finish) return visitedInorder;
    if (curr.isWall) continue;
    if (curr.distance + curr.heuristic === Infinity) return visitedInorder;
    curr.isVisited = true;
    visitedInorder.push(curr);

    updateUnvisitedNeighboursStar(curr, grid, finish);
  }
  return visitedInorder;
}

function primMaze(grid) {
  let sr = 7,
    sc = 17; //set a starting point for generating maze
  let height = grid.length,
    width = grid[0].length;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      makeWall(grid, i, j, false);
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = (i % 2) + 1; j < width; j += (i % 2) + 1) {
      makeWall(grid, i, j, true);
    }
  }

  for (let i = 0; i < height; i++) {
    makeWall(grid, i, 0, true);
  }
  let visited = [];
  let path = [{ row: sr, col: sc }];
  while (path.length > 0) {
    const index = randomSelect(path);
    const node = path[index];
    path.splice(index, 1);
    visited = visited.concat([mode]);
    const { c: connected, u: unconnected } = getNeighbours(
      grid,
      visited,
      mode
    );
    if (connected > 0) {
      let rn = randomSelect(connected);
      connect(grid, node, connected[rn]);
      connected.splice(rn);
    }
    path = path.concat(unconnected);
  }
}


function getShortestPath(){
    const path=[];
    let curr=finish;
    while(curr !==null){
        path.unshift(curr);
        curr=curr.previousNode;
    }
    return path;
}

export { dijkstra, BFS, DFS,Astar,getShortestPath,primMaze };
