/*yellow compare, blue reset, red swap green sorted

*/

import { useState, useEffect } from "react";
import Visualizer from "./control/Visualizer";
import Control from "./control/Control";
import { MergeSort } from "./algorithm/MergeSort";

function App() {
  const [arr, setArr] = useState([]);
  const [userInput, setuserInput] = useState("");
  const [speed, setSpeed] = useState(100);
  const [isSorting, setisSorting] = useState(false);
  const [selectedSorting, setselectedSorting] = useState("");

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
        animations = bubbleSort(arr);
        bubbleAnimation(animations);
        break;
      case "mergeSort":
        animations = MergeSort(arr);
        mergeAnimation(animations);
        break;
      default:
        break;
    }
  };

// i % 3 === 0: Start of comparison → color = yellow
// i % 3 === 1: End of comparison → color = blue
// i % 3 === 2: Actual value change → update height

  const mergeAnimation = (animations) => {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2; //color change
      if (isColorChange) {
        const [baroneIdx, bartwoIdx] = animations[i];
        const barone = bars[baroneIdx];
        const bartwo = bars[bartwoIdx];
        const color = i % 3 === 0 ? "yellow" : "blue";
        setTimeout(() => {
          barone.style.backgroundColor = color;
          bartwo.style.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [baroneIdx, newHeight] = animations[i];
          const barOne = bars[baroneIdx];
          barOne.style.height = `${newHeight}px`;
          barOne.innerHTML = newHeight;
        }, i * speed);
      }
    }

    //paint all bars green after sorting
    setTimeout(() => {
      for (let j = 0; j < bars.length; j++) {
        setTimeout(() => {
          bars[j].style.backgroundColor = "green";
        }, j * speed);
      }
      setisSorting(false);
    }, animations.length * speed);


  };
  return (
    <div>
      <h1>Data Structure & Algorithm Visualizer</h1>
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
  );
}

export default App;
