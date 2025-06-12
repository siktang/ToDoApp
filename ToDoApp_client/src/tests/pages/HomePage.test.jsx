import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import HomePage from "../../pages/HomePage/HomePage";

vi.mock("axios");

describe("HomePage page", () => {
  it("should display both todo list items and new task section", async () => {
    // Mock axios response
    axios.get.mockResolvedValue({
      data: [
        { id: "1", text: "ongoing task", dueDate: "", completed: false },
        { id: "2", text: "done task", dueDate: "", completed: true },
        { id: "3", text: "past task", dueDate: "01/01/1990", completed: false },
        { id: "4", text: "future task", dueDate: "01/01/2999", completed: false },
      ]
    });

    render(<HomePage />);

    // display 4 todo list items - need to wait till the async call is complete
    await waitFor(() => {
      expect(screen.getAllByTestId("todo-item")).toHaveLength(4);
    });

    // display new task section
    expect(screen.getByTestId("new-item")).toBeInTheDocument();
  });
});