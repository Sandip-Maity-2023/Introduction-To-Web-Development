import React from "react";

//binart tree node
export class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

//build a sample tree
export function buildSampleTree() {
  let root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  root.right.left = new TreeNode(6);
  root.right.right = new TreeNode(7);
  return root;
}

//traversal animations
export function inorderTraversal(root, animations = []) {
  if (!root) return animations;
  inorderTraversal(root.left, animations);
  animations.push(root.val);
  inorderTraversal(root.right, animations);
  return animations;
}

export function preorderTraversal(root, animations = []) {
  if (!root) return animations;
  preorderTraversal(root.left, animations);
  animations.push(root.val);
  preorderTraversal(root.right, animations);
  return animations;
}

export function postorderTraversal(root, animations = []) {
  if (!root) return animations;
  postorderTraversal(root.left, animations);
  animations.push(root.val);
  postorderTraversal(root.right, animations);
  return animations;
}

export function bfsTraversal(root) {
const animations=[];
if(!root) return animations;

let queue=[root];
while(queue.length>0){
    let node=queue.shift(); 
    animations.push(node.val);
    if(node.left) queue.push(node.left);
    if(node.right) queue.push(node.right);
}
return animations;
}
