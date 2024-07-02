import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { addTask } from "../api/api";


function AddTask() {

  const [newTodo, setNewTodo] = useState("");

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("In handleSubmit");
  //   handleAddTodo();
  // };

  const handleAddTodo =  () => {
    console.log("handleAddTodo");
    if (!newTodo.trim()) return;
  
      const addedTask =  addTask({name : newTodo})
      setNewTodo("");
    navigate("/")
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="bg-slate-800 h-10"></div>
      <div className="w-full mx-auto max-w-lg">
        {/* Input Section */}
        <div className="flex items-center gap-3 mb-5 w-full mt-10">
          <input
            className="p-3 text-black w-full rounded-sm outline-none "
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter your task...."
          />
          <button
            onClick={handleAddTodo}
            className="py-3 px-5 cursor-pointer rounded-sm  bg-blue-500 text-white"
          >
            Add
          </button>
        </div>
        </div>
        </div>
  )
}

export default AddTask
