// src/App.jsx
import React, { useState, useEffect } from "react";
import { Navbar, Control, Visualizer } from "./control/Vi.jsx";

// Algorithms
import {
  MergeSort,
  SelectionSort,
  BubbleSort,
  InsertionSort,
  QuickSort,
  BinarySearch,LinearSearch
} from "./algorithm/All.jsx";

// Animations
import {
  BubbleAnimation,
  MergeAnimation,
  SelectionAnimation,
  InsertionAnimation,
  QuickAnimation,
  BinaryAnimation,LinearAnimation
} from "./animations/Ani.jsx";


// imports
import {
  preorder,
  inorder,
  postorder,
  levelOrder,
  generateRandomTree,
} from "./algorithm/TreeTraversal.jsx";
import { TreeAnimation } from "./animations/Tree.jsx";
import TreeVisualizer from "./control/TreeVisualizer.jsx";







function App() {

  const [treeRoot, setTreeRoot] = useState(null);

  const [arr, setArr] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [speed, setSpeed] = useState(100);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState("");
  const [selectedTab, setSelectedTab] = useState("sorting");

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

  // ------------------- HANDLE USER INPUT ------------------- //
  useEffect(() => {
    if (!userInput.trim()) return;
    const filtered = userInput
      .split(",")
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num) && num >= 0 && num <= 300);
    setArr(filtered);
  }, [userInput]);

  // ------------------- ARRAY GENERATION ------------------- //
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

  // ------------------- SORT / SEARCH HANDLER ------------------- //
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

      case "binarySearch":
        const target = parseInt(prompt("Enter number to search: "));
        if (isNaN(target)) {
          alert("Please enter a valid number!");
          setIsSorting(false);
          return;
        }
        animations = BinarySearch(arr, target);
        BinaryAnimation(animations, speed, setIsSorting);
        break;

      default:
        setIsSorting(false);
        break;
    }
  };

  const handleSearching = (e) => {
  const method = e.target.value;
  if (!arr.length) {
    alert("Please generate or enter an array first!");
    return;
  }

  setSelectedSorting(method);
  setIsSorting(true);

  let animations = [];
  const target = parseInt(prompt("Enter number to search: "));
  if (isNaN(target)) {
    alert("Please enter a valid number!");
    setIsSorting(false);
    return;
  }

  switch (method) {
    case "linearSearch":
      animations = LinearSearch(arr, target);
      LinearAnimation(animations, speed, setIsSorting);
      break;

    case "binarySearch":
      const sortedArr = [...arr].sort((a, b) => a - b);
      setArr(sortedArr); // show sorted array visually
      animations = BinarySearch(sortedArr, target);
      BinaryAnimation(animations, speed, setIsSorting);
      break;

    default:
      alert("Select a valid searching algorithm!");
      setIsSorting(false);
      break;
  }
};


  return (
  <div className="app-container">
    <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

    {(selectedTab === "sorting" || selectedTab === "searching") && (
      <>
        <Control
          handleArray={handleArray}
          handleSorting={selectedTab === "sorting" ? handleSorting : handleSearching}
          resetArray={resetArray}
          setSpeed={setSpeed}
          isSorting={isSorting}
          userInput={userInput}
          setUserInput={setUserInput}
          selectedSorting={selectedSorting}
          selectedTab={selectedTab} // 👈 important
        />
        <Visualizer arr={arr} />
      </>
    )}

      {selectedTab === "tree" && (
  <>
    <div className="control-container">
      <button className="button" onClick={() => handleTree("preorder")} disabled={isSorting}>
        Preorder
      </button>
      <button className="button" onClick={() => handleTree("inorder")} disabled={isSorting}>
        Inorder
      </button>
      <button className="button" onClick={() => handleTree("postorder")} disabled={isSorting}>
        Postorder
      </button>
      <button className="button" onClick={() => handleTree("levelorder")} disabled={isSorting}>
        Level Order
      </button>
    </div>
    <TreeVisualizer root={treeRoot} />
  </>
      )}

      {selectedTab === "graph" && (
        <h2 className="tab-title">Graph Visualizer (Coming Soon)</h2>
      )}
    </div>
  );
}

export default App;
