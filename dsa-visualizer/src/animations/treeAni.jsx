// src/components/BinaryTreeVisualizer.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  treeConstructor,
  getRequiredHeightAndWidth,
  DEFAULT_CONFIG,
  drawNode,
  connectEdges,
} from "../algorithm/treeAlgo";

const BinaryTreeVisualizer = () => {
  const canvasRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [prevValue, setPrevValue] = useState("");

  const drawBinaryTree = (root, ctx, canvas) => {
    if (!root) return;

    const { requiredCanvasWidth, requiredCanvasHeight } =
      getRequiredHeightAndWidth(root);
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    canvas.width = maxWidth;
    canvas.height = maxHeight;

    const windowWidthCenter = maxWidth / 2;
    const requiredWidthCenter = requiredCanvasWidth / 2;

    const xStart = windowWidthCenter - requiredWidthCenter;
    const xEnd = windowWidthCenter + requiredWidthCenter;

    recursivelyDrawNodes(root, ctx, 0.5, { xStart, xEnd });
  };

  const recursivelyDrawNodes = (node, ctx, currentLine, { xStart, xEnd }) => {
    const xPos = (xStart + xEnd) / 2;
    const yPos = currentLine * DEFAULT_CONFIG.nodeHeightSpacing;

    drawNode(node.value, ctx, xPos, yPos);

    if (node.left) {
      recursivelyDrawNodes(node.left, ctx, currentLine + 1, {
        xStart,
        xEnd: xPos,
      });
      connectEdges(ctx, { xStart: xPos, xEnd: (xStart + xPos) / 2 }, {
        yStart: yPos + DEFAULT_CONFIG.radius,
        yEnd:
          (currentLine + 1) * DEFAULT_CONFIG.nodeHeightSpacing -
          DEFAULT_CONFIG.radius,
      });
    }

    if (node.right) {
      recursivelyDrawNodes(node.right, ctx, currentLine + 1, {
        xStart: xPos,
        xEnd,
      });
      connectEdges(ctx, { xStart: xPos, xEnd: (xPos + xEnd) / 2 }, {
        yStart: yPos + DEFAULT_CONFIG.radius,
        yEnd:
          (currentLine + 1) * DEFAULT_CONFIG.nodeHeightSpacing -
          DEFAULT_CONFIG.radius,
      });
    }
  };

  const clearCanvas = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleApply = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    clearCanvas(ctx, canvas);
    const root = treeConstructor(inputValue);
    setPrevValue(inputValue);
    drawBinaryTree(root, ctx, canvas);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    clearCanvas(ctx, canvas);
    setInputValue("");
  };

  useEffect(() => {
    const handleResize = () => {
      if (prevValue) handleApply();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [prevValue]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "8rem",
          left: "2.8rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "10rem",
          zIndex: 2,
        }}
      >
        <textarea
          rows="5"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ resize: "none", width: "100%", border:"solid" }}
          placeholder="Enter Array with comma(,) separated integers like:(1,6,null,8,9):"
        />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={handleApply} style={{boxShadow:"0 0 3px 0.2px"}}>Apply</button>
          <button onClick={handleClear} style={{boxShadow:"0 0 3px 0.2px"}}>Clear</button>
        </div>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default BinaryTreeVisualizer;
