import clsx from "clsx";
import { useState } from "react";

const TodoPopup = ({
  setShowPopUp,
  index,
  toDoItem,
  todos,
  handleToUpdate,
}) => {
  const [listOfItems, setlistOfItemss] = useState(todos ? todos : []);
  const handleEditTodoItem = (event) => {
    console.log(`event  summary`, event);
    event.preventDefault();
    let newToDo = {
      title: event.target.title.value ? event.target.title.value : "",
      summary: event.target.summary.value ? event.target.summary.value : "",
      tags: event.target.tags.value ? event.target.tags.value : "",
      dueDate: event.target.dueDate.value ? event.target.dueDate.value : null,
      progress: event.target.progress.value ? event.target.progress.value : 0,
      isCompleted: toDoItem.isCompleted ? toDoItem.isCompleted : false,
    };
    if (index === null) {
      listOfItems.push(newToDo);
    } else {
      listOfItems[index] = newToDo;
    }
    handleToUpdate(listOfItems);
    setShowPopUp(false);
  };

  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0 top-0 z-50",
        "flex items-center justify-center bg-gray-700/60 p-4"
      )}
    >
      <div className="w-full max-w-md">
        <form
          onSubmit={handleEditTodoItem}
          className="rounded-lg bg-white shadow"
        >
          <div className="p-3">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title *
            </label>
            <input
              required
              type="text"
              className={clsx(
                "w-full bg-gray-50 p-3",
                "rounded-lg border border-gray-300",
                "text-gray-900",
                "focus:border-blue-500 focus:ring-blue-500"
              )}
              placeholder="Title"
              name="title"
              defaultValue={toDoItem && toDoItem.title}
            />
          </div>

          <div className="p-3">
            <label
              htmlFor="summary"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Summary *
            </label>
            <input
              required
              type="text"
              className={clsx(
                "w-full bg-gray-50 p-3",
                "rounded-lg border border-gray-300",
                "text-gray-900",
                "focus:border-blue-500 focus:ring-blue-500"
              )}
              placeholder="Summary"
              name="summary"
              defaultValue={toDoItem && toDoItem.summary}
            />
          </div>
          <div className="p-3">
            <label
              htmlFor="dueDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Due Date *
            </label>
            <input
              required
              type="date"
              className={clsx(
                "w-full bg-gray-50 p-3",
                "rounded-lg border border-gray-300",
                "text-gray-900",
                "focus:border-blue-500 focus:ring-blue-500"
              )}
              name="dueDate"
              title="Due Date"
              defaultValue={toDoItem && toDoItem.dueDate}
            />
          </div>
          <div className="p-3">
            <label
              htmlFor="progress"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Completion Percentage *
            </label>
            <input
              required
              type="number"
              min="0"
              max="100"
              title="Progress"
              className={clsx(
                "w-full bg-gray-50 p-3",
                "rounded-lg border border-gray-300",
                "text-gray-900",
                "focus:border-blue-500 focus:ring-blue-500"
              )}
              name="progress"
              defaultValue={toDoItem && toDoItem.progress}
            />
          </div>
          <div className="p-3">
            <label
              htmlFor="tags"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tags
            </label>
            <input
              type="text"
              title="Assign some tags to the tasks"
              className={clsx(
                "w-full bg-gray-50 p-3",
                "rounded-lg border border-gray-300",
                "text-gray-900",
                "focus:border-blue-500 focus:ring-blue-500"
              )}
              name="tags"
              defaultValue={toDoItem && toDoItem.tags}
            />
          </div>

          <div
            className={clsx(
              "flex items-center justify-center space-x-8 p-4",
              "rounded-b border-t border-gray-200"
            )}
          >
            <button
              type="submit"
              className={clsx(
                "rounded-lg bg-emerald-700 px-5 py-2.5",
                "text-center font-medium text-white",
                "hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
              )}
            >
              Save
            </button>
            <button
              onClick={() => setShowPopUp(false)}
              type="button"
              className={clsx(
                "bg-white px-5 py-2.5",
                "rounded-lg border border-gray-200",
                "font-medium text-gray-500",
                "hover:bg-gray-100 hover:text-gray-900",
                "focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
              )}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoPopup;
