import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaEdit } from "react-icons/fa";
import "./ToDoList.css";

function ToDoList() {
  const [newTask, setNewTask] = useState("");
  const [task, setTask] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTask([...task, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const update = task.filter((_, i) => i !== index);
    setTask(update);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const update = [...task];
      [update[index], update[index - 1]] = [update[index - 1], update[index]];
      setTask(update);
    }
  }

  function moveTaskDown(index) {
    if (index < task.length - 1) {
      const update = [...task];
      [update[index], update[index + 1]] = [update[index + 1], update[index]];
      setTask(update);
    }
  }

  function edit(index) {
    setEditIndex(index);
    setEditText(task[index]);
  }

  function handleEdit(e) {
    setEditText(e.target.value);
  }

  function saveEdit(index) {
    const update = [...task];
    update[index] = editText.trim() || task[index];
    setTask(update);
    setEditIndex(-1);
    setEditText("");
  }

  return (
    <div className="container">
      <div className="app">
        <h1>TODO LIST</h1>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {task.map((t, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={handleEdit}
                  className="edit-input"
                />
                <button
                  className="save-button"
                  onClick={() => saveEdit(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="text">{t}</span>
                <button
                  className="edit-button"
                  onClick={() => edit(index)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskUp(index)}
                >
                  <FaArrowUp />
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskDown(index)}
                >
                  <FaArrowDown />
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
