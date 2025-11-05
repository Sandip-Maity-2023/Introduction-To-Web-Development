// src/utils/treeAlgorithms.js
export class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  setLeft(node) {
    this.left = node;
  }

  setRight(node) {
    this.right = node;
  }

  getHeight() {
    const leftHeight = this.left?.getHeight() || 0;
    const rightHeight = this.right?.getHeight() || 0;
    return Math.max(leftHeight, rightHeight) + 1;
  }
}

export const DEFAULT_CONFIG = {
  radius: 20,
  nodeWidthSpacing: 25,
  nodeHeightSpacing: 100,
  fontSize: 10,
};

export function getRequiredHeightAndWidth(root) {
  const heightOfTree = root.getHeight();
  const maxLeafNodes = Math.pow(2, heightOfTree);
  const requiredCanvasHeight = heightOfTree * DEFAULT_CONFIG.nodeHeightSpacing;
  const requiredCanvasWidth = maxLeafNodes * DEFAULT_CONFIG.nodeWidthSpacing;
  return { requiredCanvasWidth, requiredCanvasHeight };
}

export function drawNode(value, ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "lightsalmon";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
  ctx.strokeStyle = "brown";
  ctx.stroke();
  ctx.font = `${DEFAULT_CONFIG.fontSize}pt serif`;
  ctx.fillStyle = "brown";
  ctx.textAlign = "center";
  ctx.fillText(value, x, y + DEFAULT_CONFIG.fontSize / 2);
}

export function connectEdges(ctx, xCoordinates, yCoordinates) {
  const { xStart, xEnd } = xCoordinates;
  const { yStart, yEnd } = yCoordinates;
  const xHalf = (xStart + xEnd) / 2;
  const yHalf = (yStart + yEnd) / 2;
  ctx.beginPath();
  ctx.strokeStyle = "brown";
  ctx.moveTo(xStart, yStart);
  ctx.bezierCurveTo(xHalf, yHalf, xHalf, yHalf, xEnd, yEnd);
  ctx.stroke();
}

export function treeConstructor(inputStr) {
  const input = parseInput(inputStr);
  if (input.length === 0) return null;

  const root = new BinaryTreeNode(input[0]);
  const queue = [root];
  let idx = 1;

  while (queue.length > 0 && idx < input.length) {
    const node = queue.shift();

    if (idx < input.length && input[idx] !== null) {
      const leftNode = new BinaryTreeNode(input[idx]);
      node.setLeft(leftNode);
      queue.push(leftNode);
    }
    idx++;

    if (idx < input.length && input[idx] !== null) {
      const rightNode = new BinaryTreeNode(input[idx]);
      node.setRight(rightNode);
      queue.push(rightNode);
    }
    idx++;
  }

  return root;
}

function parseInput(str) {
  return str
    .split(",")
    .map((v) => v.trim())
    .map((v) => (v === "null" || v === "" ? null : v));
}
