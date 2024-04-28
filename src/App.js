import "./App.css";
import Heading from "./components/Heading";
import clsx from "clsx";
import SearchIcon from "./assets/icons/SearchIcon";
import AddIcon from "./assets/icons/AddIcon";
import TodoPopup from "./components/ToDoPopup";
import { useState } from "react";

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

  const handleToUpdate = (toDoData) => {
    console.log(`todo data`, toDoData);
    setToDos(toDoData);
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

            <button
              type="button"
              onClick={() => {
                setShowPopUp(true);
              }}
              title="Add New Item"
              className={clsx(
                "rounded-lg bg-emerald-700 px-4 py-2.5",
                "font-medium text-white",
                "hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              )}
            >
              <AddIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
