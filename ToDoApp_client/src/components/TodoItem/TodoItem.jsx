import "./TodoItem.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'; 

export default function TodoItem({ todo, isEditing, editTask, setEditTask, editDueDate, setEditDueDate, onDelete, onEdit, onSave, onCancel, onToggleComplete }) {

    return(
        <li className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
            />

            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editTask}
                        onChange={e => setEditTask(e.target.value)}
                    />
                    <input
                        type="date"
                        value={editDueDate}
                        onChange={e => setEditDueDate(e.target.value)}
                    />
                    <button onClick={() => onSave(todo.id)}>Save</button>
                    <button onClick={() => onCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <span
                        className={`task-text ${todo.completed ? 'done' : ''}`}
                    >
                        {todo.text} (Due: {todo.dueDate || 'N/A'})
                    </span>
                    <button onClick={() => onEdit(todo)}>Edit</button>
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                </>
            )}

        </li>
    )
}