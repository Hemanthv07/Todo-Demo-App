import { useEffect, useReducer, useState } from "react";
//import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getTasks, deleteTask,addTask, editTask } from "./api/api";



function App() {
 const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
  
    const res = getAllTasks()
    
  },[isEdit, isloading]);

  const getAllTasks = async () => {
    let response = await getTasks();
    //setUsers(response.data);
    console.log(response.data)
    //dispatch({type : "ADDALL", payload : response.data})
    setTodos(response.data)
}

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("In handleSubmit");
  //   handleAddTodo();
  // };

  const handleAddTodo =  async() => {
    console.log("handleAddTodo");
    if (!newTodo.trim()) return;
  
      const addedTask =  await addTask({name : newTodo})
     // dispatch({ type: "ADD", payload: addedTask });
      setNewTodo("");
    //getAllTasks()
    setNewTodo("");
    setisloading(!isloading)
  };

  const handleEditTodo =  async () => {
    console.log("handleEditTodo");
    if (!newTodo.trim()) return;
    
      const editedTask =  await editTask(isEdit._id, {name : newTodo})
    // dispatch({ type: "EDIT", payload: { _id: isEdit._id, name: isEdit.name } });
     
    //getAllTasks()
    setNewTodo("");
    setIsEdit(null);
    setisloading(!isloading)
    
  };

  const handleToggle = async (id, item) => {
    const editedTask =  await editTask(id, {completed : !item.completed})
   // dispatch({ type: "TOGGLE", payload: id });
   // getAllTasks()
    setisloading(!isloading)
  };

  const handleDelete =  async (id) => {
    await deleteTask(id)
   // dispatch({ type: "DELETE", payload: id });
  // getAllTasks()
   setisloading(!isloading)
  };

  const handleEdit = (item) => {
    setNewTodo(item.name);
    setIsEdit(item);
   
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="bg-slate-800 h-10"></div>
      <div  className="w-full mx-auto max-w-lg">
        {/* Input Section */}
        <div className="flex items-center gap-3 mb-5 w-full mt-10">
          <input
            className="p-3 text-black w-full rounded-sm outline-none "
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter your task...."
          />
          {/* <button
            onClick={handleAddTodo}
            className="py-3 px-5 cursor-pointer rounded-sm  bg-blue-500 text-white"
          >
            {isEdit ? "Save" : "Add"}
          </button> */}
          {isEdit ? (<button
            onClick={handleEditTodo}
            className="py-3 px-5 cursor-pointer rounded-sm  bg-blue-500 text-white"
          >
             Save 
          </button>):(<button
            onClick={handleAddTodo}
            className="py-3 px-5 cursor-pointer rounded-sm  bg-blue-500 text-white"
          >
            Add
          </button>)}
        </div>


        
        {/* Display Section */}
        <ul className="flex flex-col gap-3">
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
                  onClick={() => handleEdit(item)}
                  className="cursor-pointer w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-500"
                >
                  <AiFillEdit size={20}></AiFillEdit>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
