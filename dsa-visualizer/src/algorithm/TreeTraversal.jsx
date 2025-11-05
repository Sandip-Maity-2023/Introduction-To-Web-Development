// TreeAlgo.jsx
export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export function generateRandomTree(size = 7) {
  const values = Array.from({ length: size }, () =>
    Math.floor(Math.random() * 100)
  );
  const root = buildTree(values);
  return { root, values };
}

function buildTree(values) {
  if (!values.length) return null;
  const nodes = values.map((v) => new Node(v));
  for (let i = 0; i < nodes.length; i++) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    if (leftIdx < nodes.length) nodes[i].left = nodes[leftIdx];
    if (rightIdx < nodes.length) nodes[i].right = nodes[rightIdx];
  }
  return nodes[0];
}

// Traversal animations
export function preorder(root, animations = []) {
  if (!root) return;
  animations.push(root.value);
  preorder(root.left, animations);
  preorder(root.right, animations);
  return animations;
}

export function inorder(root, animations = []) {
  if (!root) return;
  inorder(root.left, animations);
  animations.push(root.value);
  inorder(root.right, animations);
  return animations;
}

export function postorder(root, animations = []) {
  if (!root) return;
  postorder(root.left, animations);
  postorder(root.right, animations);
  animations.push(root.value);
  return animations;
}

export function levelOrder(root) {
  const animations = [];
  if (!root) return animations;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    animations.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return animations;
}
