import React from 'react'
import "./Visualizer.css";

function Visualizer({arr}) {
  return (
    <div className='array-container'>
        {arr.map((item,index)=>(
            <div className='bar' key={index} style={{height:`${item}px`}}>
                {item}
            </div>
        ))}
    </div>
  )
}

export default Visualizer;