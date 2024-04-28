import DeleteIcon from "../assets/icons/DeleteIcon";
import EditIcon from "../assets/icons/EditIcon";
import CheckIcon from "../assets/icons/CheckIcon";
import clsx from "clsx";

const TodoItem = ({
  searchTerm,
  item,
  index,
  toDos,
  setToDos,
  setSelectedToDo,
  setShowPopUp,
}) => {
  const handleRemoveTodoItem = () => {
    debugger;
    let listOfItems = [...toDos];
    listOfItems.splice(index, 1);
    setToDos(...listOfItems);
    localStorage.setItem("todos", JSON.stringify(listOfItems));
  };

  const handleMarkDone = () => {
    let listOfItems = [...toDos];
    listOfItems[index]["completed"] = !listOfItems[index]["completed"];
    setToDos(listOfItems);
    localStorage.setItem("listOfItems mark done", JSON.stringify(listOfItems));
  };

  return (
    <div
      key={index}
      className={clsx(
        "mt-2.5 flex w-full items-center justify-between bg-white p-4",
        "rounded-lg border border-gray-200 shadow"
      )}
    >
      <span
        className="text-gray-900 font-semibold"
        dangerouslySetInnerHTML={{
          __html:
            searchTerm !== ""
              ? item.title.replace(
                  searchTerm,
                  `<span class="bg-blue-100 font-bold">${searchTerm}</span>`
                )
              : item.title,
        }}
      ></span>
      <div className="flex gap-2">
        <button
          onClick={handleRemoveTodoItem}
          type="button"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700",
            "hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300"
          )}
        >
          <DeleteIcon />
        </button>

        <button
          onClick={() => {
            setSelectedToDo({ index: index, item: item });
            setShowPopUp(true);
          }}
          type="button"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700",
            "hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          )}
        >
          <EditIcon />
        </button>

        <button
          onClick={handleMarkDone}
          type="button"
          className={clsx(
            item.completed ? "bg-emerald-700" : "bg-gray-400",
            "flex h-10 w-10 items-center justify-center rounded-lg",
            "hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          )}
        >
          <CheckIcon />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
