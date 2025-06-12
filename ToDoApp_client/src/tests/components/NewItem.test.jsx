import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import NewItem from "../../components/NewItem/NewItem";

vi.mock("axios");

describe("NewItem component", () => {
    it("should disable Add button when input is empty or whitespace", () => {
        const setTodosMock = vi.fn();
        render(<NewItem setTodos={setTodosMock} />);
    
        const addButton = screen.getByText("Add");
        const newTaskTextInput = screen.getByTestId("new-item-text");
    
        // initially disabled when newTaskText is empty
        expect(addButton).toBeDisabled();
        
        // Click the Add button
        fireEvent.click(addButton);
        expect(axios.post).not.toHaveBeenCalled();
        expect(setTodosMock).not.toHaveBeenCalled();

        // stay disabled when newTaskText is whitespace
        fireEvent.change(newTaskTextInput, { target: { value: "   " } });
        expect(addButton).toBeDisabled();
    
        // Valid input
        fireEvent.change(newTaskTextInput, { target: { value: "new task text" } });
        expect(addButton).not.toBeDisabled();
    });

    it("should not call API if new task text is empty or whitespace", () => {
        const setTodosMock = vi.fn();
        render(<NewItem setTodos={setTodosMock} />);
    
        const addButton = screen.getByText("Add");
        const newTaskTextInput = screen.getByTestId("new-item-text");
    
        // Click the Add button
        fireEvent.click(addButton);
        expect(axios.post).not.toHaveBeenCalled();
        expect(setTodosMock).not.toHaveBeenCalled();

        // stay disabled when newTaskText is whitespace
        fireEvent.change(newTaskTextInput, { target: { value: "   " } });
        fireEvent.click(addButton);
        expect(axios.post).not.toHaveBeenCalled();
        expect(setTodosMock).not.toHaveBeenCalled();
    });

    it("should call API and update todos on add", async () => {
        // Mock axios response
        axios.post.mockResolvedValue({
            data: { 
                id: "5", text: "new task", dueDate: "01/01/2025", completed: false 
            }
        });

        const setTodosMock = vi.fn();
        render(<NewItem setTodos={setTodosMock} />);
    
        const addButton = screen.getByText("Add");
        const newTaskTextInput = screen.getByTestId("new-item-text");
        
        // Type in the input
        fireEvent.change(newTaskTextInput, { target: { value: "new task" }});
    
        // Click the Add button
        fireEvent.click(addButton);
    
        // Wait for async operation to finish
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledTimes(1);
    
          expect(setTodosMock).toHaveBeenCalledTimes(1);
          
          // ensure textbox is cleared
          expect(newTaskTextInput).toHaveValue("");
        });
    });
});