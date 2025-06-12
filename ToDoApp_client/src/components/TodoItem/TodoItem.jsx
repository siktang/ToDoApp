import "./TodoItem.scss";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"; 

export default function TodoItem({ todo, setTodos }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState("");
    const [editDueDate, setEditDueDate] = useState("");

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/todos/${todo.id}`);
            setTodos((prev) => prev.filter(t => t.id !== todo.id));
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleEdit = () => {
        setIsEditing(true);
        setEditText(todo.text);
        setEditDueDate(todo.dueDate || "");
    };
    
    const handleSave = async () => {
        try {
            let res = await axios.put(`${API_URL}/todos/${todo.id}`, { ...todo, text: editText.trim(), dueDate: editDueDate }); 
            setTodos((prev) => prev.map(t => t.id === todo.id ? res.data : t));

            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const toggleComplete = async (completed) => {
        try {
            let res = await axios.put(`${API_URL}/todos/${todo.id}`, { ...todo, completed: completed });
            setTodos((prev) => prev.map(t => t.id === todo.id ? res.data : t));

        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className="todo-item" data-testid="todo-item">
            <input
                type="checkbox"
                data-testid="todo-item-checkbox"
                checked={todo.completed}
                onChange={e => toggleComplete(e.target.checked)}
            />

            {isEditing ? (
                <>
                    <input
                        type="text"
                        data-testid="todo-item-editText"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        className="todo-item__text"
                    />
                    <input
                        type="date"
                        data-testid="todo-item-editDueDate"
                        value={editDueDate}
                        onChange={e => setEditDueDate(e.target.value)}
                    />
                    <button onClick={handleSave} className="button button__save" disabled={!editText.trim()}>
                        <FontAwesomeIcon icon={faFloppyDisk} className="button__icon" />
                        Save
                    </button>
                    <button onClick={handleCancel} className="button button__cancel">
                        <FontAwesomeIcon icon={faXmark} className="button__icon" />
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <span
                        className={`todo-item__text ${todo.completed ? "todo-item__done" : ""}`}
                    >
                        {todo.text} (Due: {todo.dueDate || "N/A"})
                    </span>
                    <button onClick={handleEdit} className="button button__edit">
                        <FontAwesomeIcon icon={faPen} className="button__icon" />
                        Edit
                    </button>
                    <button onClick={handleDelete} className="button button__delete">
                        <FontAwesomeIcon icon={faTrash} className="button__icon" />
                        Delete
                    </button>
                </>
            )}

        </div>
    )
}