import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "/src/styles/Todo.css";

export default function Todo() {
  const [updater, setUpdater] = useState([]);
  const [newtask, setNewTask] = useState('');
  const [deletTasks, setDeletedTasks] = useState([]);
  const [completedTask, setCompletedTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const storedCompletedTasks = localStorage.getItem('completedTasks');
    const storedDeletedTasks = localStorage.getItem('deletedTasks');

    if (storedTasks) setUpdater(JSON.parse(storedTasks));
    if (storedCompletedTasks) setCompletedTasks(JSON.parse(storedCompletedTasks));
    if (storedDeletedTasks) setDeletedTasks(JSON.parse(storedDeletedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(updater));
    localStorage.setItem('completedTasks', JSON.stringify(completedTask));
    localStorage.setItem('deletedTasks', JSON.stringify(deletTasks));
  }, [updater, completedTask, deletTasks]);

  const handleChange = (e) => {
    setNewTask(e.target.value);
  }

  const Updater = () => {
    if (newtask.trim()) {
      setUpdater([...updater, newtask]);
      setNewTask('');
    }
  }

  const handleCompletedTasks = (index) => {
    const completeTask = updater[index];
    setCompletedTasks([...completedTask, completeTask]);
    const upgradedTasks = [...updater];
    upgradedTasks.splice(index, 1);
    setUpdater(upgradedTasks);
  }

  const moveToTrash = (index) => {
    const deletedItem = updater[index];
    setDeletedTasks([...deletTasks, deletedItem]);
    const updatedTasks = [...updater];
    updatedTasks.splice(index, 1);
    setUpdater(updatedTasks);
  }

  const undoCompletedTask = (index) => {
    const taskToUndo = completedTask[index];
    setUpdater([...updater, taskToUndo]);
    const updatedCompletedTasks = [...completedTask];
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
  }

  const permanentDeleteCompletedTask = (index) => {
    const updatedCompletedTasks = [...completedTask];
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
  }

  const permanentDeletTasks = (index) => {
    const updatedDeletedTasks = [...deletTasks];
    updatedDeletedTasks.splice(index, 1);
    setDeletedTasks(updatedDeletedTasks);
  }

  const handleUndoDelet = (index) => {
    const taskToRestore = deletTasks[index];
    setUpdater([...updater, taskToRestore]);
    const updatedDeletedTasks = [...deletTasks];
    updatedDeletedTasks.splice(index, 1);
    setDeletedTasks(updatedDeletedTasks);
  }

  const handleClearAll = () => {
    setDeletedTasks([...deletTasks, ...updater]);
    setUpdater([]);
  }

  return (
    <Router>
      <div className="todo-app">
        <div>
          <h1>To-do List</h1>
          <div className="input-section">
            <input value={newtask} onChange={handleChange} type="text" placeholder="Enter Your Task..." className="inpt"/>
            <button id="add-btn" onClick={Updater}>Add</button>
          </div>

          <div className="tasks-buttons">
            <Link to="/" className="btn">All</Link>
            <Link to="/completed" className="btn">Completed</Link>
            <Link to="/trash" className="btn">Trash</Link>
          </div>

          <Routes>
            <Route path="/" element={
                <div className="task-item">
                  {updater.map((task, index) => (
                    <TaskAdd key={index} text={task} index={index} onComplete={handleCompletedTasks} onDelete={moveToTrash} />
                  ))}
                </div>
              } 
            />
            <Route 
              path="/completed" 
              element={
                <div className="task-item">
                  {completedTask.map((task, index) => (
                    <CompletedTaskView key={index} text={task} index={index} onUndo={undoCompletedTask} onDelete={permanentDeleteCompletedTask} />
                  ))}
                </div>
              } 
            />
            <Route path="/trash" element={
                <div className="task-item">
                  {deletTasks.map((task, index) => (
                    <TrashTaskView key={index} text={task} index={index} onPermanentDelete={permanentDeletTasks} onRestore={handleUndoDelet}/>
                  ))}
                </div>
              } 
            />
          </Routes>

          <button id="clearbtn" onClick={handleClearAll}disabled={updater.length === 0}>CLEAR ALL</button>
        </div>
      </div>
    </Router>
  );
}

function TaskAdd({ text, index, onComplete, onDelete }) {
  return (
    <div className="task-content">
      <div className="task-input">
        <input type="checkbox" id={`task-${index}`} onClick={() => onComplete(index)} />
        <p>{text}</p>
      </div>
      <DeleteOutlineIcon className="delete-btn" onClick={() => onDelete(index)} />
    </div>
  );
}

function CompletedTaskView({ text, index, onUndo, onDelete }) {
  return (
    <div className="task-content completed">
      <p>{text}</p>
      <div className="btnsContainer">
        <button className="btns" onClick={() => onUndo(index)}>Undo</button>
        <button className="btns" onClick={() => onDelete(index)}>Delete</button>
      </div>
    </div>
  );
}

function TrashTaskView({ text, index, onPermanentDelete, onRestore }) {
  return (
    <div className="task-content trash">
      <p>{text}</p>
      <div className="btnsContainer">
        <button className="btns" onClick={() => onPermanentDelete(index)}>Delete</button>
        <button className="btns" onClick={() => onRestore(index)}>Restore</button>
      </div>
    </div>
  );
}