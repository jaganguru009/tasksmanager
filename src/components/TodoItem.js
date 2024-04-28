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
  handleStatusFilter,
  activeFilter,
}) => {
  const handleRemoveTodoItem = () => {
    let listOfItems = [...toDos];
    listOfItems.splice(index, 1);
    setToDos(listOfItems);
    localStorage.setItem("todos", JSON.stringify(listOfItems));
    handleStatusFilter(activeFilter, listOfItems);
  };

  const handleMarkDone = () => {
    let listOfItems = [...toDos];
    listOfItems[index].isCompleted = !listOfItems[index].isCompleted;
    setToDos(listOfItems);
    localStorage.setItem("todos", JSON.stringify(listOfItems));
    handleStatusFilter(activeFilter, listOfItems);
  };

  return (
    <div
      key={index}
      className={clsx(
        "mt-2.5 flex w-full items-center justify-between bg-white p-4",
        "rounded-lg border border-gray-200 shadow"
      )}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {" "}
          <span
            className="text-gray-900 font-semibold"
            dangerouslySetInnerHTML={{
              __html:
                searchTerm !== ""
                  ? item.title.replace(
                      searchTerm,
                      `<span class="bg-amber-400 font-bold">${searchTerm}</span>`
                    )
                  : item.title,
            }}
          ></span>
        </div>
        <p className="text-gray-700 text-base">
          <span
            className="text-gray-400 font-semibold text-sm italic"
            dangerouslySetInnerHTML={{
              __html:
                searchTerm !== ""
                  ? item.summary.replace(
                      searchTerm,
                      `<span class="bg-amber-400 font-bold italic">${searchTerm}</span>`
                    )
                  : item.summary,
            }}
          ></span>
        </p>
        <div>
          <p className="mt-2.5">Due Date: {item.dueDate}</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {item.tags &&
          item.tags.split(",").map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              <span
                className="text-gray-400 font-semibold text-sm italic"
                dangerouslySetInnerHTML={{
                  __html:
                    searchTerm !== ""
                      ? tag.replace(
                          searchTerm,
                          `<span class="bg-amber-400 font-bold italic">${searchTerm}</span>`
                        )
                      : `#${tag}`,
                }}
              ></span>
            </span>
          ))}
        {item.progress && (
          <div className="mt-2.5 max-w-40">
            <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500">
              Progress
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
              <div
                className={`${
                  item.progress > 0 && item.progress <= 50
                    ? "bg-red-500"
                    : item.progress > 50 && item.progress < 100
                    ? "bg-yellow-500"
                    : "bg-green-600"
                } h-2.5 rounded-full`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

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
            item.isCompleted ? "bg-emerald-700" : "bg-gray-400",
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
