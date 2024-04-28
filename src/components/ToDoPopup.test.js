import { render, screen, fireEvent } from "@testing-library/react";
import ToDoPopup from "./ToDoPopup";
import TodoItem from "./TodoItem";

test("renders learn react link", () => {
  const obj = {
    target: {
      title: { value: "Titel" },
      summary: { value: "Summary" },
      tags: { value: "tag,tags" },
      dueDate: { value: "2024-05-12" },
      progress: { value: 100 },
    },
    toDoItem: {
      isCompleted: true,
    },
  };
  const handleToUpdate = jest.fn();
  const setShowPopUp = jest.fn();
  render(
    <ToDoPopup
      toDoItem={{ isCompleted: true }}
      handleToUpdate={handleToUpdate}
      setShowPopUp={setShowPopUp}
    />
  );
  const titleElement = screen.getAllByPlaceholderText(/Title/i);
  expect(titleElement[0]).toBeInTheDocument();
  fireEvent.change(titleElement[0], "Title");

  const summaryElement = screen.getAllByPlaceholderText(/Summary/i);
  expect(summaryElement[0]).toBeInTheDocument();
  fireEvent.change(summaryElement[0], obj);

  const dueDateElement = screen.getByTitle(/Due Date/i);
  expect(dueDateElement).toBeInTheDocument();
  fireEvent.change(dueDateElement, "2024-05-12");

  const progressElement = screen.getByTitle(/Progress/i);
  expect(progressElement).toBeInTheDocument();
  fireEvent.change(progressElement, 100);
  const tagsElement = screen.getByTitle(/Assign some tags to the tasks/i);
  expect(tagsElement).toBeInTheDocument();
  fireEvent.change(tagsElement, "Teams,Planning");

  const subButton = screen.getByText(/Save/i);
  expect(subButton).toBeInTheDocument();
  fireEvent.submit(subButton, obj);
});
