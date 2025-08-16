import React,{useState} from 'react'
import {FaArrowUp,FaArrowDown} from "react-icons/fa"
import './ToDoListCSS.css'


function ToDoList() {
const [newTask,setnewTask]=useState('');
const [task,setTask]=useState([]); //tasks

function handleInputChange(e){
  setnewTask(e.target.value);
}


  function addTask(){
    if(newTask.trim() !==""){
      setTask([...task,newTask]);
      setnewTask('');
    }
    }

  function deleteTask(index){
      const update=task.filter((_,i)=>i !==index);
      setTask(update);
    }
function moveTaskUp(index){
    if(index>0){
        const update=[...task];
        [update[index],update[index-1]]=[update[index-1],update[index]];
        setTask(update);
    }
}
function moveTaskDown(index){
if(index<task.length-1){
        const update=[...task];
        [update[index],update[index+1]]=[update[index+1],update[index]];
        setTask(update);
}
}
  return (
    <div className='container'>
      <div className='app'>
        <h1>TODO LIST</h1>
        <input type='text' 
        placeholder='Enter new task' 
        value={newTask} 
        onChange={handleInputChange}/>

        <button className='add-button' onClick={addTask}>Add</button>
      </div>

      <ol>
        {task.map((task,index)=><li key={index}>
          <span className="text">{task}</span>
          <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>

          <button className='move-button'
          onClick={()=>moveTaskUp(index)}>
            <FaArrowUp/>
          </button>

          <button className='move-button'
          onClick={()=>moveTaskDown(index)}>
            <FaArrowDown/>
          </button>

        </li>)}
      </ol>
    </div>
  );
}

export default ToDoList