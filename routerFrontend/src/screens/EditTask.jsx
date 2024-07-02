import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { editTask, getTasks } from '../api/api';

function EditTask() {

  const [newTodo, setNewTodo] = useState("");
  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getTasks(id);
    console.log(response.data)
    setNewTodo(response.data.name);
  };

  const editTaskDetails = async () => {
    const response = await editTask(id, {name : newTodo});
    navigate("/");
  };



  return (
    <div className="bg-slate-800 min-h-screen">
    <div className="bg-slate-800 h-10 "></div>
      {/* Input Section */}
      <div className="flex items-center gap-3 mb-5 mt-10 w-full mx-auto max-w-lg">
        <input
          className="p-3 text-black w-full rounded-sm outline-none "
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter your task...."
        />
        <button
          onClick={editTaskDetails}
          className="py-3 px-5 cursor-pointer rounded-sm  bg-blue-500 text-white"
        >
          Edit
        </button>
      </div>
      </div>
  )
}

export default EditTask
