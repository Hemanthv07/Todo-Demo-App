import { useEffect, useReducer, useState } from "react";
//import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getTasks, deleteTask,addTask, editTask } from "./api/api";

function todoRducer(todos, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...todos,
        {_id:action.payload._id, name: action.payload.name, completed: false },
      ];

    case "ADDALL":
      return action.payload

    case "TOGGLE":
      return todos.map((item) =>
        item._id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      );
    case "DELETE":
      return todos.filter((item) => item._id !== action.payload);
    case "EDIT":
      return todos.map((item) =>
        item.id === action.payload.id
          ? { ...item, name: action.payload.name }
          : item
      );
    default:
      break;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoRducer, []);
  const [newTodo, setNewTodo] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
   // localStorage.setItem("TODOS", JSON.stringify(todos));
    const res = getAllTasks()
    
  },[isEdit, isloading]);

  const getAllTasks = async () => {
    let response = await getTasks();
    //setUsers(response.data);
    console.log(response.data)
    dispatch({type : "ADDALL", payload : response.data})
}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("In handleSubmit");
    handleAddTodo();
  };

  const handleAddTodo =  () => {
    console.log("handleAddTodo");
    if (!newTodo.trim()) return;
    if (isEdit) {
      const editedTask =  editTask(isEdit._id, {name : newTodo})
    // dispatch({ type: "EDIT", payload: { _id: isEdit._id, name: isEdit.name } });
      setIsEdit(null);
    } else {
      const addedTask =  addTask({name : newTodo})
     // dispatch({ type: "ADD", payload: addedTask });
      setNewTodo("");
    }
    getAllTasks()
    setNewTodo("");
    setisloading(!isloading)
  };

  const handleToggle =  (id, item) => {
    const editedTask =  editTask(id, {completed : !item.completed})
    dispatch({ type: "TOGGLE", payload: id });
    getAllTasks()
  };

  const handleDelete =  (id) => {
    deleteTask(id)
    dispatch({ type: "DELETE", payload: id });
  };

  const handleEdit = (item) => {
    setNewTodo(item.name);
    setIsEdit(item);
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="bg-slate-800 h-10"></div>
      <form onSubmit={handleSubmit} className="w-full mx-auto max-w-lg">
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
            {isEdit ? "Save" : "Add"}
          </button>
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
      </form>
    </div>
  );
}

export default App;
