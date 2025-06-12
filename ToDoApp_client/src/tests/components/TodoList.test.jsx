import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodoList from "../../components/TodoList/TodoList";


describe("TodoList component", () => {
  it("should display todo list items", () => {
    // Mock data
    const todosMock = [
      { id: "1", text: "ongoing task", dueDate: "", completed: false },
      { id: "2", text: "done task", dueDate: "", completed: true },
      { id: "3", text: "past task", dueDate: "01/01/1990", completed: false },
      { id: "4", text: "future task", dueDate: "01/01/2999", completed: false },
    ]
    const setTodosMock = vi.fn();

    render(<TodoList todos={todosMock} setTodos={setTodosMock} />);

    // display 4 todo items
    const items = screen.getAllByTestId("todo-item");
    expect(items).toHaveLength(4);
  });
});