import React from "react";
import "./Tree.css";

export default function TreeVisualizer({ root }) {
  if (!root) return <p className="tree-empty">No tree generated</p>;

  const renderNode = (node) => {
    if (!node) return null;
    return (
      <div className="tree-node-container">
        <div className="tree-node">{node.value}</div>
        <div className="tree-children">
          {renderNode(node.left)}
          {renderNode(node.right)}
        </div>
      </div>
    );
  };

  return <div className="tree">{renderNode(root)}</div>;
}
