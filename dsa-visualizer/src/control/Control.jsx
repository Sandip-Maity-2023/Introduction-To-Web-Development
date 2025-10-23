import React from "react";
//import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
import "./Visualizer.css";
import "../App.css";

function Control({
  handleArr,
  setSpeed,
  isSorting,
  handleSorting,
  userInput,
  setuserInput,
  reSet,
  selectedSorting,
  selectedTab,
  setselectedtab
}) {
  return (
    <div className="control-container">
      <div className="input-wrapper">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setuserInput(e.target.value)}
          className="neumorphic-input"
          placeholder="Enter your Array between 0-300"
        />
        <div className="info-icon-wrapper">
          <i className="info-icon" style={{marginLeft:'10px'}}>info </i>
          <span className="tooltip-text">
            Provide your array by comma separated integer
          </span>
        </div>
      </div>
      <button className="button" onClick={handleArr}>
        Generate New Array
      </button>
      <button className="button" onClick={reSet}>
        Reset
      </button>
      <select
        name="dropdown"
        value={selectedSorting}
        id="dropdown"
        onChange={handleSorting}
      >
        <option value="">Select Method</option>
        <option value="bubbleSort">Bubble Sort</option>
        <option value="mergeSort">Merge Sort</option>
        <option value="selectionSort">Selection Sort</option>
        <option value="insertionSort">Insertion Sort</option>
        <option value="quickSort">Quick Sort</option>
        <option value='binarySearch'>Binary Search</option>
      </select>
      <label>
        Speed:
        <input
          type="range"
          min="10"
          max="300"
          className="speedcontrol"
          onChange={(e) => setSpeed(300 - e.target.value)}
          disabled={isSorting}
        />
      </label>
    </div>
  );
}

export default Control;
