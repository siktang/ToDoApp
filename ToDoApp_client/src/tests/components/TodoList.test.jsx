import { render, screen } from "@testing-library/react";
import TodoList from "../../components/TodoList/TodoList";
import { describe, it, expect } from "vitest";

describe("TodoList component", () => {
  it("should show list of todos", async () => {
    // Mock data
    const todos = [
      { id: "1", text: "ongoing task", dueDate: "", completed: false },
      { id: "2", text: "done task", dueDate: "", completed: true },
      { id: "3", text: "past task", dueDate: "01/01/1990", completed: false },
      { id: "4", text: "future task", dueDate: "01/01/2999", completed: false },
    ]

    render(<TodoList todos={todos} />);
    const items = screen.getAllByTestId("todo-item");
    expect(items).toHaveLength(4);
  });
});