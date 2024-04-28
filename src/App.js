import "./App.css";
import Heading from "./components/Heading";
import clsx from "clsx";
import SearchIcon from "./assets/icons/SearchIcon";
import AddIcon from "./assets/icons/AddIcon";
import TodoPopup from "./components/ToDoPopup";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";

let basicToDoItem = {
  index: null,
  item: {
    title: "",
    summary: "",
  },
};
function App() {
  const [selectedToDo, setSelectedToDo] = useState(basicToDoItem);
  const [showPopup, setShowPopUp] = useState(false);
  const [todos, setToDos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    let list = localStorage.getItem("todos");
    if (list && typeof list === "string") {
      list = JSON.parse(list);
    }
    console.log(`list `, JSON.stringify(list));
    if (list && list.length > 0) {
      setToDos(list);
      handleStatusFilter("All", list);
    }
  }, []);

  const handleStatusFilter = (status, list) => {
    let filteredToDos = list ? list : [...todos];
    if (status !== "All") {
      filteredToDos = filteredToDos.filter(
        (toDoItem) => toDoItem.isCompleted == status
      );
    }
    console.log(`filteredToDos`, JSON.stringify(filteredToDos));
    setFilteredTodos(filteredToDos);
    setActiveFilter(status);
  };
  const handleToUpdate = (toDoData) => {
    setToDos(toDoData);
    localStorage.setItem("todos", JSON.stringify(toDoData));
    handleStatusFilter(activeFilter);
  };
  const getTodoItem = (index, item) => {
    if (searchTerm) {
      let found = Object.keys(item).find((key) =>
        item[key].toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (!found) {
        return null;
      }
    }

    return (
      <TodoItem
        searchTerm={searchTerm}
        item={item}
        index={index}
        toDos={filteredTodos}
        setToDos={setToDos}
        setSelectedToDo={setSelectedToDo}
        setShowPopUp={setShowPopUp}
      />
    );
  };
  return (
    <div className="flex min-h-screen items-center bg-gray-50">
      {showPopup && (
        <TodoPopup
          setShowPopUp={setShowPopUp}
          index={selectedToDo.index}
          toDoItem={selectedToDo.item}
          handleToUpdate={(data) => handleToUpdate(data)}
          todos={todos}
        />
      )}
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <Heading />
        <div className="pt-5">
          <div className="flex items-center gap-3">
            <div className="relative w-full">
              <input
                type="search"
                className={clsx(
                  "w-full bg-gray-50 p-4",
                  "rounded-lg border border-gray-300",
                  "text-gray-900",
                  "focus:border-blue-500 focus:ring-blue-500"
                )}
                placeholder="Search Todos"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button
                type="button"
                title="Search your todo items"
                className={clsx(
                  "absolute bottom-2 right-2 top-2",
                  "rounded-lg bg-blue-700 px-4",
                  "hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                )}
              >
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mt-4">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <a
                onClick={() => {
                  handleStatusFilter("All");
                }}
                className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
              >
                <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                  <p>All</p>
                </div>
              </a>
              <a
                onClick={() => {
                  handleStatusFilter(true);
                }}
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Done</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                onClick={() => {
                  handleStatusFilter(false);
                }}
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Pending</p>
                </div>
              </a>
            </div>
            <button
              onClick={() => {
                setShowPopUp(true);
                setSelectedToDo(basicToDoItem);
              }}
              title="Add New Item"
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
            >
              <p className="text-sm font-medium leading-none text-white">
                Add Task
              </p>
            </button>
          </div>
          <div className="py-3">
            {filteredTodos &&
              filteredTodos.length > 0 &&
              filteredTodos.map((item, index) => getTodoItem(index, item))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
