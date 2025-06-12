import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import TodoItem from "../../components/TodoItem/TodoItem";

vi.mock("axios");

describe("TodoItem component", () => {
    it("should display complete todo item in readonly mode", () => {
        // Mock data
        const todoMock = { id: "1", text: "past task", dueDate: "01/31/2000", completed: true };
        const setTodosMock = vi.fn();
    
        render(<TodoItem todo={todoMock} setTodos={setTodosMock} />);
    
        const todoCheckbox = screen.getByTestId("todo-item-checkbox");
        const todoDisplayText = screen.getByText("past task (Due: 01/31/2000)");
    
        expect(todoCheckbox).toBeInTheDocument();
        expect(todoCheckbox).toBeChecked();
        expect(todoDisplayText).toBeInTheDocument();
    });

    it("should display incomplete todo item in readonly mode", () => {
        // Mock data
        const todoMock = { id: "1", text: "future task", dueDate: "01/31/2999", completed: false };
        const setTodosMock = vi.fn();
    
        render(<TodoItem todo={todoMock} setTodos={setTodosMock} />);
    
        const todoCheckbox = screen.getByTestId("todo-item-checkbox");
        const todoDisplayText = screen.getByText("future task (Due: 01/31/2999)");
    
        expect(todoCheckbox).toBeInTheDocument();
        expect(todoCheckbox).not.toBeChecked();
        expect(todoDisplayText).toBeInTheDocument();
    });

    it("should display todo item without due date in readonly mode", () => {
        // Mock data
        const todoMock = { id: "1", text: "ongoing task", dueDate: "", completed: false };
        const setTodosMock = vi.fn();
    
        render(<TodoItem todo={todoMock} setTodos={setTodosMock} />);
    
        const todoCheckbox = screen.getByTestId("todo-item-checkbox");
        const todoDisplayText = screen.getByText("ongoing task (Due: N/A)");
    
        expect(todoCheckbox).toBeInTheDocument();
        expect(todoCheckbox).not.toBeChecked();
        expect(todoDisplayText).toBeInTheDocument();
    });

    it("should display correct buttons in readonly mode", () => {
        // Mock data
        const todoMock = { id: "1", text: "future task", dueDate: "01/31/2999", completed: false };
        const setTodosMock = vi.fn();
    
        render(<TodoItem todo={todoMock} setTodos={setTodosMock} />);
    
        // we don't expect Save and Cancel button to be shown. 
        // getByText throws an error if it doesn't find the element, so we need queryByText to return null for negation assertion later
        const todoEditButton = screen.getByText("Edit");
        const todoDeleteButton = screen.getByText("Delete");
        const todoSaveButton = screen.queryByText("Save");
        const todoCancelButton = screen.queryByText("Cancel");
    
        expect(todoEditButton).toBeInTheDocument();
        expect(todoDeleteButton).toBeInTheDocument();
        expect(todoSaveButton).not.toBeInTheDocument();
        expect(todoCancelButton).not.toBeInTheDocument();
    });

    it("should display correct buttons in edit mode", () => {
        // Mock data
        const todoMock = { id: "1", text: "future task", dueDate: "01/31/2999", completed: false };
        const setTodosMock = vi.fn();
    
        render(<TodoItem todo={todoMock} setTodos={setTodosMock} />);
    
        // Click the Edit button to enter edit mode
        fireEvent.click(screen.getByText("Edit"));

        // In edit mode, we don't expect Edit and Delete button to be shown.
        const todoEditButton = screen.queryByText("Edit");
        const todoDeleteButton = screen.queryByText("Delete");
        const todoSaveButton = screen.getByText("Save");
        const todoCancelButton = screen.getByText("Cancel");
    
        expect(todoEditButton).not.toBeInTheDocument();
        expect(todoDeleteButton).not.toBeInTheDocument();
        expect(todoSaveButton).toBeInTheDocument();
        expect(todoCancelButton).toBeInTheDocument();
    });

    it("should display input fields and hide labels in edit mode", () => {
        // Mock data
        const todoMock = { id: "1", text: "future task", dueDate: "01/31/2999", completed: false };
        const setTodosMock = vi.fn();
    
        render(<TodoItem todo={todoMock} setTodos={setTodosMock} />);
    
        // Click the Edit button to enter edit mode
        fireEvent.click(screen.getByText("Edit"));

        const todoEditTextInput = screen.getByTestId("todo-item-editText");
        const todoEditDueDateInput = screen.getByTestId("todo-item-editDueDate");
        const todoDisplayText = screen.queryByText("future task (Due: 01/31/2999)");
        
        expect(todoEditTextInput).toBeInTheDocument();
        expect(todoEditTextInput.value).toBe("future task");
        expect(todoEditDueDateInput).toBeInTheDocument();
        expect(todoDisplayText).not.toBeInTheDocument();
    });

    it("should not call API if user tries to save updates with empty text or whitespace", () => {
        // Mock data
        const todoMock = { id: "1", text: "future task", dueDate: "01/31/2999", completed: false };
        const setTodosMock = vi.fn();
    
        render(<TodoItem todo={todoMock} setTodos={setTodosMock} />);
    
        // Click the Edit button to enter edit mode
        fireEvent.click(screen.getByText("Edit"));

        const todoEditTextInput = screen.getByTestId("todo-item-editText");
        const todoSaveButton = screen.getByText("Save");

        // empty input
        fireEvent.change(todoEditTextInput, { target: { value: "" } });
        expect(todoSaveButton).toBeDisabled();

        fireEvent.click(todoSaveButton);
        expect(axios.put).not.toHaveBeenCalled();
        expect(setTodosMock).not.toHaveBeenCalled();

        // whitespace
        fireEvent.change(todoEditTextInput, { target: { value: "      " } });
        expect(todoSaveButton).toBeDisabled();

        fireEvent.click(todoSaveButton);
        expect(axios.put).not.toHaveBeenCalled();
        expect(setTodosMock).not.toHaveBeenCalled();
    });

    it("should not call API if user cancels updates", () => {
        // Mock data
        const todoMock = { id: "1", text: "future task", dueDate: "01/31/2999", completed: false };
        const setTodosMock = vi.fn();
    
        render(<TodoItem todo={todoMock} setTodos={setTodosMock} />);
    
        // Click the Edit button to enter edit mode
        fireEvent.click(screen.getByText("Edit"));

        const todoCancelButton = screen.getByText("Cancel");

        // click the Cancel button
        fireEvent.click(todoCancelButton);
        expect(axios.put).not.toHaveBeenCalled();
        expect(setTodosMock).not.toHaveBeenCalled();
    });

    it("should call API if user saves with valid updates", async () => {
        // Mock axios response
        axios.put.mockResolvedValue({
            data: { 
                id: "1", text: "future task updated", dueDate: "01/31/2999", completed: false 
            }
        });
        
        // Mock data
        const todoMock = { id: "1", text: "future task", dueDate: "01/31/2999", completed: false };
        const setTodosMock = vi.fn();
    
        render(<TodoItem todo={todoMock} setTodos={setTodosMock} />);
    
        // Click the Edit button to enter edit mode
        fireEvent.click(screen.getByText("Edit"));

        const todoEditTextInput = screen.getByTestId("todo-item-editText");
        const todoSaveButton = screen.getByText("Save");

        // valid input
        fireEvent.change(todoEditTextInput, { target: { value: "future task updated" } });
        expect(todoSaveButton).not.toBeDisabled();
        
        fireEvent.click(todoSaveButton);

        // Wait for async operation to finish
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledTimes(1);
      
            expect(setTodosMock).toHaveBeenCalledTimes(1);
        });
    });

    it("should call API if user delete todo item", async () => {
        // Mock axios response
        axios.delete.mockResolvedValue();
        
        // Mock data
        const todoMock = { id: "1", text: "future task", dueDate: "01/31/2999", completed: false };
        const setTodosMock = vi.fn();
    
        render(<TodoItem todo={todoMock} setTodos={setTodosMock} />);

        const todoDeleteButton = screen.getByText("Delete");

        fireEvent.click(todoDeleteButton);

        // Wait for async operation to finish
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledTimes(1);
      
            expect(setTodosMock).toHaveBeenCalledTimes(1);
        });
    });
});