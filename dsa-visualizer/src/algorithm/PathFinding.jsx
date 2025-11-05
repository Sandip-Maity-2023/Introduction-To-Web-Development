// Pathfinding & Maze utilities - corrected version

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
  // ensure integer indices
  row = Math.floor(row);
  col = Math.floor(col);
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return;
  const node = grid[row][col];
  const newnode = { ...node, isWall: isW };
  grid[row][col] = newnode;
}

function isVisited(visited, node) {
  // visited is expected to be an array of {row, col} or node objects
  if (!visited) return false;
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
    if (!neigh.isVisited && !neigh.isWall) {
      // correctly set on the neighbour object
      neigh.distance = closest.distance + 1;
      neigh.previousNode = closest;
    }
  }
}

function getUNeighbours(node, grid) {
  const neighbours = [];
  const reN = [];
  const { row, col } = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]); // fixed: +1
  if (col > 0) neighbours.push(grid[row][col - 1]);

  for (let index = 0; index < neighbours.length; index++) {
    const neigh = neighbours[index];
    if (!neigh.isVisited && !neigh.isWall) {
      neigh.previousNode = node;
      // mark it visited here so BFS/DFS don't enqueue duplicates
      neigh.isVisited = true;
      reN.push(neigh);
    }
  }
  return reN;
}

function sortNodesStar(nodes) {
  nodes.sort((a, b) => (a.distance + (a.heuristic || 0)) - (b.distance + (b.heuristic || 0)));
}

function manhattanDistance(a, b) {
  let { row: ar, col: ac } = a;
  let { row: br, col: bc } = b;
  return Math.abs(ar - br) + Math.abs(ac - bc);
}

function updateUnvisitedNeighboursStar(curr, grid, finish) {
  const neighbours = [];
  const { row, col } = curr;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  for (const neigh of neighbours) {
    if (!neigh.isVisited && !neigh.isWall) {
      neigh.distance = curr.distance + 1;
      neigh.heuristic = manhattanDistance(neigh, finish);
      neigh.previousNode = curr;
    }
  }
}

function randomSelect(arr) {
  // return a random index for array `arr`
  if (!arr || arr.length === 0) return -1;
  return randomInt(0, arr.length - 1);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function connect(grid, a, b) {
  let { row: ar, col: ac } = a;
  let { row: br, col: bc } = b;
  // midpoint must be integer
  let row = Math.floor((ar + br) / 2);
  let col = Math.floor((ac + bc) / 2);
  makeWall(grid, row, col, false);
}

function validate(grid, points) {
  let height = grid.length,
    width = grid[0].length;
  let pRe = [];
  for (let index = 0; index < points.length; index++) {
    let { row, col } = points[index];
    if (Number.isInteger(row) && Number.isInteger(col) && (0 <= row && row < height && 0 <= col && col < width)) {
      pRe.push(points[index]);
    }
  }
  return pRe;
}

function getNeighbours(grid, visited, node) {
  let { row, col } = node;
  // include all four 2-step neighbors (up, down, right, left)
  let neigh = [
    { row: row + 2, col: col },
    { row: row - 2, col: col },
    { row: row, col: col + 2 }, // fixed: +2 for right
    { row: row, col: col - 2 }
  ];
  neigh = validate(grid, neigh.slice());
  let connected = [];
  let unconnected = [];

  neigh.forEach(n => {
    if (isVisited(visited, n)) connected.push(n);
    else unconnected.push(n);
  });
  return { c: connected, u: unconnected };
}

// Dijkstra
function dijkstra(grid, start, finish) {
  const visitedInorder = [];
  // initialize distances if not already initialized
  for (const node of allNodes(grid)) {
    if (node.distance === undefined) node.distance = Infinity;
    node.isVisited = false;
    node.previousNode = null;
  }

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

// DFS (Depth First Search)
function DFS(grid, start, finish) {
  const visitedInorder = [];
  let unvisited = [];
  // reset visited flags
  for (const node of allNodes(grid)) node.isVisited = false;

  unvisited.push(start);

  while (unvisited.length) {
    const node = unvisited.pop();
    if (node === finish) return visitedInorder;
    if (node.isWall) continue;
    if (node.isVisited) continue;
    node.isVisited = true;
    visitedInorder.push(node);
    // getUNeighbours will mark neighbours as visited to avoid duplicates when enqueued
    unvisited = unvisited.concat(getUNeighbours(node, grid));
  }
  return visitedInorder;
}

// BFS (Breadth First Search)
function BFS(grid, start, finish) {
  const visitedInorder = [];
  let unvisited = [];
  for (const node of allNodes(grid)) node.isVisited = false;

  unvisited.push(start);
  while (unvisited.length) {
    const node = unvisited.shift();
    if (node === finish) return visitedInorder;
    if (node.isWall) continue;
    if (node.isVisited) continue;
    node.isVisited = true;
    visitedInorder.push(node);
    unvisited = unvisited.concat(getUNeighbours(node, grid));
  }
  return visitedInorder;
}

function Astar(grid, start, finish) {
  const visitedInorder = [];
  // initialize nodes
  for (const node of allNodes(grid)) {
    if (node.distance === undefined) node.distance = Infinity;
    node.heuristic = Infinity;
    node.isVisited = false;
    node.previousNode = null;
  }

  start.distance = 0;
  start.heuristic = manhattanDistance(start, finish);

  const unvisited = allNodes(grid);
  while (unvisited.length) {
    sortNodesStar(unvisited);
    const curr = unvisited.shift();
    if (curr === finish) return visitedInorder;
    if (curr.isWall) continue;
    if (curr.distance === Infinity) return visitedInorder; // unreachable
    curr.isVisited = true;
    visitedInorder.push(curr);

    updateUnvisitedNeighboursStar(curr, grid, finish);
  }
  return visitedInorder;
}

function primMaze(grid) {
  // pick a valid starting cell (odd coordinates inside grid)
  let sr = Math.max(1, Math.min(grid.length - 2, 7));
  let sc = Math.max(1, Math.min(grid[0].length - 2, 17));
  let height = grid.length,
    width = grid[0].length;

  // Clear the grid to passages
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      makeWall(grid, i, j, false);
    }
  }

  // Put walls in a checker-ish pattern (optional)
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (i % 2 === 0 && j % 2 === 0) makeWall(grid, i, j, true);
    }
  }

  // Ensure border walls
  for (let i = 0; i < height; i++) {
    makeWall(grid, i, 0, true);
    makeWall(grid, i, width - 1, true);
  }
  for (let j = 0; j < width; j++) {
    makeWall(grid, 0, j, true);
    makeWall(grid, height - 1, j, true);
  }

  let visited = [];
  let path = [{ row: sr, col: sc }];
  while (path.length > 0) {
    const index = randomSelect(path);
    if (index < 0) break;
    const node = path[index];
    path.splice(index, 1);
    visited = visited.concat([node]); // fixed: use node
    const { c: connected, u: unconnected } = getNeighbours(grid, visited, node); // fixed: use node
    if (connected.length > 0) {
      const rn = randomSelect(connected);
      if (rn >= 0) {
        connect(grid, node, connected[rn]);
        connected.splice(rn, 1); // remove only that element
      }
    }
    path = path.concat(unconnected);
  }
}

function getShortestPath(finish) {
  const path = [];
  let curr = finish;
  while (curr != null) {
    path.unshift(curr);
    curr = curr.previousNode || null;
  }
  return path;
}

export { dijkstra, BFS, DFS, Astar, getShortestPath, primMaze };
