import React from 'react'
//import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
import "./Visualizer.css"

function Control({handleArr,setSpeed,isSorting,handleSorting,userInput,setuserInput,reSet,selectedSorting}) {
  return (
    <div className='control-container'>
        <div className='input-wrapper'>
            <input type="text" value={userInput} onChange={(e)=>setuserInput(e.target.value)} className='neumorphic-input' placeholder='Enter your Array between 1-500'/>
            <div className='info-icon-wrapper'>
              <i className='info-icon'>i</i>
              <span className='tooltip-text'>Provide your array by comma separated integer</span>
            </div>
        </div>
        <button className='neu-button' onClick={handleArr}>Generate New Array</button>
        <button className='neu-button' onClick={reSet}>Reset</button>
        <select name='neumorphism-dropdown' value={selectedSorting} id="hello" onChange={handleSorting}>
          <option value="">Select value</option>
          <option value="bubbleSort">Bubble Sorting</option>
          <option value="mergeSort">Merge Sorting</option>
        </select>
        <label>
          Speed:<input type='range' min="10" max="200" className='speedcontrol' onChange={(e)=>setSpeed(200-e.target.value)} disabled={isSorting}/>
        </label>
    </div>
  )
}

export default Control;