import React, { useState, useEffect, useRef } from "react";
import Visualizer2 from "./control/Visu.jsx";
import { Visualizer, Navbar, Control } from "./control/Vi.jsx";
import PathFindingVisualizer from "./animations/PathFinderVisualizer.jsx";
import TreeVisualizer from "./control/TreeVisualizer.jsx";
import BinaryTreeVisualizer from "./animations/treeAni.jsx";
// 🔹 Sorting & Searching Algorithms
import {
  MergeSort,
  SelectionSort,
  BubbleSort,
  InsertionSort,
  QuickSort,
  BinarySearch,
  LinearSearch,
} from "./algorithm/All.jsx";

// 🔹 Sorting & Searching Animations
import {
  BubbleAnimation,
  MergeAnimation,
  SelectionAnimation,
  InsertionAnimation,
  QuickAnimation,
  BinaryAnimation,
  LinearAnimation,
} from "./animations/Ani.jsx";

// 🔹 Tree Traversal Algorithms
import {
  preorder,
  inorder,
  postorder,
  levelOrder,
  generateRandomTree,
} from "./algorithm/TreeTraversal.jsx";

import { TreeAnimation } from "./animations/Tree.jsx";
import MSTVisualizer from "./control/mst.jsx";

function App() {
  const [arr, setArr] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [speed, setSpeed] = useState(100);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState("");
  const [selectedTab, setSelectedTab] = useState("sorting");
  const [treeRoot, setTreeRoot] = useState(null);

  // ✅ Pathfinding Visualizer refs
  const visualizePathRef = useRef(null);
  const clearVisualizerRef = useRef(null);
  const setAlgorithmRef = useRef(null);
  const algorithmsRef = useRef([]);

  const [visualizerRendering, setVisualizerRendering] = useState(false);

  // 🔹 Connect PathfindingVisualizer functions
  const getVisualizerFunctions = (
    visualizePathfinding,
    clearVisualizer,
    setAlgorithm,
    algorithms
  ) => {
    visualizePathRef.current = visualizePathfinding;
    clearVisualizerRef.current = clearVisualizer;
    setAlgorithmRef.current = setAlgorithm;
    algorithmsRef.current = algorithms;
  };

  // ------------------- Handle Tree Traversal ------------------- //
  const handleTree = (type) => {
    const { root } = generateRandomTree(7);
    setTreeRoot(root);
    setIsSorting(true);

    let animations = [];
    switch (type) {
      case "preorder":
        animations = preorder(root);
        break;
      case "inorder":
        animations = inorder(root);
        break;
      case "postorder":
        animations = postorder(root);
        break;
      case "levelorder":
        animations = levelOrder(root);
        break;
      default:
        setIsSorting(false);
        return;
    }

    TreeAnimation(animations, speed, setIsSorting);
  };

  // ------------------- Handle User Input ------------------- //
  useEffect(() => {
    if (!userInput.trim()) return;
    const filtered = userInput
      .split(",")
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num) && num >= 0 && num <= 300);
    setArr(filtered);
  }, [userInput]);

  // ------------------- Generate Array ------------------- //
  const handleArray = () => {
    if (userInput.trim()) {
      const filtered = userInput
        .split(",")
        .map((num) => Number(num.trim()))
        .filter((num) => !isNaN(num) && num >= 0 && num <= 300);
      setArr(filtered);
    } else {
      const newArray = Array.from({ length: 18 }, () =>
        Math.floor(Math.random() * 300)
      );
      setArr(newArray);
    }
  };

  const resetArray = () => {
    setArr([]);
    setUserInput("");
    setSelectedSorting("");
    setIsSorting(false);
  };

  // ------------------- Sorting Handler ------------------- //
  const handleSorting = (e) => {
    const method = e.target.value;
    if (!arr.length) {
      alert("Please generate or enter an array first!");
      return;
    }
    setSelectedSorting(method);
    setIsSorting(true);

    let animations = [];

    switch (method) {
      case "bubbleSort":
        animations = BubbleSort(arr);
        BubbleAnimation(animations, speed, setIsSorting);
        break;

      case "mergeSort":
        animations = MergeSort(arr);
        MergeAnimation(animations, speed, setIsSorting);
        break;

      case "selectionSort":
        animations = SelectionSort(arr);
        SelectionAnimation(animations, speed, setIsSorting);
        break;

      case "insertionSort":
        animations = InsertionSort(arr);
        InsertionAnimation(animations, speed, setIsSorting);
        break;

      case "quickSort":
        animations = QuickSort(arr);
        QuickAnimation(animations, speed, setIsSorting);
        break;

      default:
        setIsSorting(false);
        break;
    }
  };

  // ------------------- Searching Handler ------------------- //
  const handleSearching = (e) => {
    const method = e.target.value;
    if (!arr.length) {
      alert("Please generate or enter an array first!");
      return;
    }

    setSelectedSorting(method);
    setIsSorting(true);

    const target = parseInt(prompt("Enter number to search: "));
    if (isNaN(target)) {
      alert("Please enter a valid number!");
      setIsSorting(false);
      return;
    }

    let animations = [];
    switch (method) {
      case "linearSearch":
        animations = LinearSearch(arr, target);
        LinearAnimation(animations, speed, setIsSorting);
        break;

      case "binarySearch":
        const sortedArr = [...arr].sort((a, b) => a - b);
        setArr(sortedArr);
        animations = BinarySearch(sortedArr, target);
        BinaryAnimation(animations, speed, setIsSorting);
        break;

      default:
        alert("Select a valid searching algorithm!");
        setIsSorting(false);
        break;
    }
  };

  // ------------------- Render Tabs ------------------- //
  return (
    <div className="app-container">
      <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Sorting + Searching */}
      {(selectedTab === "sorting" || selectedTab === "searching") && (
        <>
          <Control
            handleArray={handleArray}
            handleSorting={
              selectedTab === "sorting" ? handleSorting : handleSearching
            }
            resetArray={resetArray}
            setSpeed={setSpeed}
            isSorting={isSorting}
            userInput={userInput}
            setUserInput={setUserInput}
            selectedSorting={selectedSorting}
            selectedTab={selectedTab}
          />
          <Visualizer arr={arr} />
        </>
      )}

      {/* Tree Traversal */}
      {selectedTab === "tree" && (
        <>
        <BinaryTreeVisualizer />
          <div className="control-container">
            <button
              className="button"
              onClick={() => handleTree("preorder")}
              disabled={isSorting}
            >
              Preorder
            </button>
            <button
              className="button"
              onClick={() => handleTree("inorder")}
              disabled={isSorting}
            >
              Inorder
            </button>
            <button
              className="button"
              onClick={() => handleTree("postorder")}
              disabled={isSorting}
            >
              Postorder
            </button>
            <button
              className="button"
              onClick={() => handleTree("levelorder")}
              disabled={isSorting}
            >
              Level Order
            </button>
          </div>
          <TreeVisualizer root={treeRoot} />
        </>
      )}

      {/* ✅ Pathfinding Visualizer Integration */}
      {/* {selectedTab === "pathfinding" && (
        <div className="pathfinding-container">
          <PathFindingVisualizer
            getFunctions={getVisualizerFunctions}
            setVisualizerRendering={setVisualizerRendering}
          />
        </div>
      )} */}
      {selectedTab === "pathfinding" && (
        <>
          <div className="">PathFinding</div>
          <Visualizer arr={arr} selectedTab={selectedTab} />
        </>
      )}

      {/* Placeholder for Graph & AI Visualizers */}
      {selectedTab === "graph" && (
  
        <>    
        <MSTVisualizer/>
        </>
      )}

      {selectedTab === "ai" && (
        <div className="ai-container">
          <h2>AI Visualizer (Coming Soon)</h2>
          <p>Deep Learning & Neural Network simulations will be added soon.</p>
        </div>
      )}
    </div>
  );
}

export default App;
