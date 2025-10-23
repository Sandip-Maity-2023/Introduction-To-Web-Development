/*yellow compare, blue reset, red swap green sorted

*/
/*yellow compare, blue reset, red swap green sorted */

import { useState, useEffect, useMemo } from "react";
import Visualizer from "./control/Visualizer";
import Control from "./control/Control";

import { MergeSort } from "./algorithm/MergeSort";
import SelectionSort from "./algorithm/SelectionSort";
import BubbleSort from "./algorithm/BubbleSort";
import InsertionSort from "./algorithm/InsertionSort";
import BinarySearch from "./algorithm/BinarySearch";
import { buildSampleTree, inorderTraversal } from "./algorithm/TreeTraversal";

import BubbleAnimation from "./animations/Bubble";
import MergeAnimation from "./animations/Merge";
import SelectionAnimation from "./animations/Selection";
import Insertion from "./animations/Insertion";
import QuickSort from "./algorithm/QuickSort";
import Quick from "./animations/Quick";
import Binary from "./animations/Binary";
import Tree from "./animations/Tree";

import TreeVisualizer from "./control/TreeVisualizer";
import Navbar from "./control/Navbar";

function App() {
  const [arr, setArr] = useState([]);
  const [userInput, setuserInput] = useState("");
  const [speed, setSpeed] = useState(100);
  const [isSorting, setisSorting] = useState(false);
  const [selectedSorting, setselectedSorting] = useState("");
  const [selectedTab, setselectedTab] = useState("");

  //-- Parse and validate user input to array whenever it changes --//
  useEffect(() => {
    if (!userInput) return;

    const filtered = userInput
      .split(",")

      .filter((item) => !isNaN(item) && item>=0 && item<=300)
      .map((item) => Number(item.trim()))
    setArr([filtered]);
  }, [userInput]);

  
  const handleArr = () => {
    const newArray = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 300)
    );
    setArr(newArray);
  };

  const reSet = () => {
    setArr([]);
    setselectedSorting("");
  };

  const handleSorting = (e) => {
    const sortingMethod = e.target.value;
    setselectedSorting(sortingMethod);
    setisSorting(true);

    let animations = [];

    switch (sortingMethod) {
      case "bubbleSort":
        animations = BubbleSort(arr);
        BubbleAnimation(animations, speed, setisSorting);
        break;
      case "mergeSort":
        animations = MergeSort(arr);
        MergeAnimation(animations, speed, setisSorting);
        break;
      case "selectionSort":
        animations = SelectionSort(arr);
        SelectionAnimation(animations, speed, setisSorting);
        break;
      case "insertionSort":
        animations = InsertionSort(arr);
        Insertion(animations, speed, setisSorting);
        break;
      case "quickSort":
        animations = QuickSort(arr);
        Quick(animations, speed, setisSorting);
        break;
      case "Search":
        const target = parseInt(prompt("Enter number to search: "));
        animations = BinarySearch(arr, target);
        Binary(animations, speed, setisSorting);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Navbar selectedTab={selectedTab} setselectedTab={setselectedTab} />

      {selectedTab === "sorting" && (
        <>
          <h2>Sorting Animation</h2>
          <Control
            handleArr={handleArr}
            handleSorting={handleSorting}
            userInput={userInput}
            setuserInput={setuserInput}
            setSpeed={setSpeed}
            reSet={reSet}
            isSorting={isSorting}
            speed={speed}
            selectedSorting={selectedSorting}
          />
          <Visualizer arr={arr} />
        </>
      )}

      {selectedTab === "searching" && (
        <div>
          <h2>Searching Algorithm</h2>
          <Control
            handleArr={handleArr}
            handleSorting={handleSorting}
            userInput={userInput}
            setuserInput={setuserInput}
            setSpeed={setSpeed}
            reSet={reSet}
            isSorting={isSorting}
            speed={speed}
            selectedSorting={selectedSorting}
          />
          <Visualizer arr={arr} />
        </div>
      )}

      {selectedTab === "tree" && (
        <TreeTab speed={speed} setisSorting={setisSorting} />
      )}

      {selectedTab === "graph" && (
        <div>
          <h2>Graph Traversals</h2>
        </div>
      )}
    </div>
  );
}

export default App;

function TreeTab({ speed, setisSorting }) {
  const troot = useMemo(() => buildSampleTree(), []);
  const animations = useMemo(() => inorderTraversal(troot), [troot]);

  useEffect(() => {
    Tree(animations, speed, setisSorting);
  }, [animations, speed, setisSorting]);

  return (
    <div>
      <h2>Tree Traversals</h2>
      <TreeVisualizer root={troot} />
    </div>
  );
}
