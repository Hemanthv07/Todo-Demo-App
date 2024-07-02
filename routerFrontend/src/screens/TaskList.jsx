import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getTasks, deleteTask, editTask } from "../api/api";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AddTask from "./AddTask";

function TaskList() {
  const [todos, setTodos] = useState([]);

  //const navigate = useNavigate();

  useEffect(() => {
    const res = getAllTasks();
  }, []);

  const getAllTasks = async () => {
    let response = await getTasks();
    //setUsers(response.data);
    console.log(response.data);
    setTodos(response.data);
  };

  const handleToggle = async (id, item) => {
    const editedTask = await editTask(id, { completed: !item.completed });
    getAllTasks();
  };

  const handleDelete =async (id) => {
    await deleteTask(id);
    getAllTasks();

  };


  return (
    <div className=" w-full mx-auto max-w-lg">
      <Link to="/add-task">
        <button className="py-3 px-5 cursor-pointer rounded-sm  bg-blue-500 text-white">
          Add Task
        </button>
      </Link>
      <ul className="flex flex-col gap-3 mt-20">
        {todos.length <= 0 && (
          <div className="text-red-200 uppercase text-center text-xl">
            There is No todo task here...
          </div>
        )}

        {todos.map((item) => (
          <li
            key={item._id}
            className="flex justify-between p-3 items-center rounded-md hover:bg-black hover:bg-opacity-40 transition-all"
          >
            <div className="flex justify-between gap-3 items-center flex-auto">
              <input
                checked={item.completed}
                onChange={() => handleToggle(item._id, item)}
                className="w-6 h-6"
                type="checkbox"
              />
              <span
                className={`text-white ${
                  item.completed ? "line-through" : ""
                } flex-auto`}
              >
                {item.name}
              </span>
            </div>

            <div className=" flex items-center gap-3">
              <span
                onClick={() => handleDelete(item._id)}
                className="cursor-pointer w-8 h-8 flex items-center justify-center bg-red-100 rounded-full text-red-500"
              >
                <AiFillDelete size={20}></AiFillDelete>
              </span>

              <span
                className="cursor-pointer w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-500"
              > <Link to={`/edit-task/${item._id}`}>
                <AiFillEdit size={20}></AiFillEdit>
                </Link>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
