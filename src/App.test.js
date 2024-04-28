import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getAllByTitle(/Search your todo items/i);
  expect(linkElement[0]).toBeInTheDocument();

  const allFilterElement = screen.getAllByTitle(/All ToDos/i);
  expect(allFilterElement[0]).toBeInTheDocument();

  const doneFilterElement = screen.getAllByTitle(/Completed ToDos/i);
  expect(doneFilterElement[0]).toBeInTheDocument();

  const pendingFilterElement = screen.getAllByTitle(/Pending ToDos/i);
  expect(pendingFilterElement[0]).toBeInTheDocument();
});
