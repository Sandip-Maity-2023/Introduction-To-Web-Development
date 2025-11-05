// src/control/Vi.jsx
import React from "react";
import "./Vi.css";
import PathFindingVisualizer from "../animations/PathFinderVisualizer";

/* ========================================================
   NAVBAR COMPONENT
======================================================== */
export function Navbar({ selectedTab, setSelectedTab }) {
  return (
    <nav className="navbar">
      <h2 className="logo">Algorithm Visualizer</h2>
      <ul className="nav-links">
        {["sorting", "searching", "tree", "graph"].map((tab) => (
          <li
            key={tab}
            className={selectedTab === tab ? "active" : ""}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ========================================================
   CONTROL PANEL COMPONENT
======================================================== */
/* ========================================================
   CONTROL PANEL COMPONENT
======================================================== */
export function Control({
  handleArray,
  handleSorting,
  resetArray,
  setSpeed,
  isSorting,
  userInput,
  setUserInput,
  selectedSorting,
  selectedTab, // 👈 receive current tab
}) {
  // Dynamic dropdown options based on selected tab
  const getOptions = () => {
    if (selectedTab === "sorting") {
      return (
        <>
          <option value="">Select Sorting Method</option>
          <option value="bubbleSort">Bubble Sort</option>
          <option value="mergeSort">Merge Sort</option>
          <option value="selectionSort">Selection Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="quickSort">Quick Sort</option>
        </>
      );
    } else if (selectedTab === "searching") {
      return (
        <>
          <option value="">Select Searching Method</option>
          <option value="linearSearch">Linear Search</option>
          <option value="binarySearch">Binary Search</option>
        </>
      );
    } else if(selectedTab==="PathFinder"){
<>
<option value="">Select Path Finding Method</option>
<PathFindingVisualizer/>
</>
    }
    else {
      return <option value="">(No options available)</option>;
    }
  };

  return (
    <div className="control-container">
      <div className="input-wrapper">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="neumorphic-input"
          placeholder="Enter numbers (comma separated)"
          disabled={isSorting}
        />
        <div className="info-icon-wrapper">
          <span className="info-icon">ℹ️</span>
          <span className="tooltip-text">
            Enter comma-separated numbers between 0–300
          </span>
        </div>
      </div>

      <button className="button" onClick={handleArray} disabled={isSorting}>
        Generate Array
      </button>

      <button className="button" onClick={resetArray} disabled={isSorting}>
        Reset
      </button>

      <select
        id="dropdown"
        value={selectedSorting}
        onChange={handleSorting}
        disabled={isSorting}
      >
        {getOptions()}
      </select>

      <label className="speed-label">
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


/* ========================================================
   VISUALIZER COMPONENT
======================================================== */
export function Visualizer({ arr }) {
  return (
    <div className="array-container">
      {arr.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No array generated</p>
      ) : (
        arr.map((item, index) => (
          <div key={index} className="bar" style={{ height: `${item}px` }}>
            {item}
          </div>
        ))
      )}
    </div>
  );
}
