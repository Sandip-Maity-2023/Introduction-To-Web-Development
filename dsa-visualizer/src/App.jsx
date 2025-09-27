/*yellow compare, blue reset, red swap green sorted

*/
 import "./App.css"
import { useState, useEffect } from "react";
import Visualizer from "./control/Visualizer";
import Control from "./control/Control";

import { MergeSort } from "./algorithm/MergeSort";
import SelectionSort from "./algorithm/SelectionSort";
import BubbleSort from "./algorithm/BubbleSort";
import InsertionSort from "./algorithm/InsertionSort";
import BinarySearch from "./algorithm/BinarySearch";

import BubbleAnimation from "./animations/Bubble";
import MergeAnimation from "./animations/Merge";
import SelectionAnimation from "./animations/Selection";
import Insertion from "./animations/Insertion";
import QuickSort from "./algorithm/QuickSort";
import Quick from "./animations/Quick";
import Binary from "./animations/Binary";

import Navbar from "./control/Navbar";

function App() {
  const [arr, setArr] = useState([]);
  const [userInput, setuserInput] = useState("");
  const [speed, setSpeed] = useState(100);
  const [isSorting, setisSorting] = useState(false);
  const [selectedSorting, setselectedSorting] = useState("");
  const [selectedTab, setselectedTab] = useState("");

  useEffect(() => {
    const userIn = userInput.split(",");
    const filteredInput = userIn
      .filter((item) => !isNaN(item) && Number.isInteger(parseFloat(item)))
      .map((item) => Number(item) <= 500 && Number(item));
    setArr([...filteredInput]);
  }, [userInput]);

  const handleArr = () => {
    const newArray = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 500)
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
      case "binarySearch":
        const target = parseInt(prompt("Enter number to search: "));
        animations = BinarySearch(arr, target);
        Binary(animations, speed, setisSorting);
        break;
      default:
        break;
    }
  };

  // i % 3 === 0: Start of comparison → color = yellow
  // i % 3 === 1: End of comparison → color = blue
  // i % 3 === 2: Actual value change → update height

  return (
    <div>
<Navbar selectedTab={selectedTab} setselectedTab={setselectedTab}/>
{selectedTab==='sorting' && (
      <>
        <h1>DSA</h1>
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

{selectedTab==='searching' && (
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

{selectedTab==='tree' && (
  <div>
    <h2>Tree Traversal</h2>
    </div>
)}
    </div>
  );
}

export default App;
