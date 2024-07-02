import { useEffect, useReducer, useState } from "react";
//import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getTasks, deleteTask,addTask, editTask } from "./api/api";
import TaskList from "./screens/TaskList";
import AddTask from "./screens/AddTask";
import EditTask from "./screens/EditTask";
import { Route, Routes } from "react-router-dom";


function App() {


  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="bg-slate-800 h-10"></div>
      <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
    </div>
  );
}

export default App;
