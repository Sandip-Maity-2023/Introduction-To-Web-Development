import React from "react";

export default function TreeVisualizer({ root }) {
  if (!root) return null;

  return (
    <div className="tree">
      <TreeNodeComponent node={root} />
    </div>
  );
}

function TreeNodeComponent({ node }) {
  if (!node) return null;

  return (
    <div className="tree-level">
      <div className="tree-node">{node.val}</div>
      <div className="tree-children">
        {node.left && <TreeNodeComponent node={node.left} />}
        {node.right && <TreeNodeComponent node={node.right} />}
      </div>
    </div>
  );
}
