import "./TodoItem.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'; 

export default function TodoItem({ todo, onToggleDone, onDelete, onEdit }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);


    const saveEdit = () => {
        onEdit(todo.id, editText.trim());
        setIsEditing(false);
    };

    return(
        <li className="todo-item">
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggleDone(todo.id)}
            />

            {isEditing ? (
                <input
                    className="edit-input"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && saveEdit()}
                />
            ) : (
                <span
                    className={`task-text ${todo.done ? 'done' : ''}`}
                    onDoubleClick={() => setIsEditing(true)}
                >
                    {todo.text}
                </span>
            )}

            <div className="actions">
                {isEditing ? (
                <button onClick={saveEdit}>Save</button>
                ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
        </li>
    )
}