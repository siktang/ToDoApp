import "./TodoItem.scss";
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'; 

export default function TodoItem({ todo, onDelete}) {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState('');
    const [editDueDate, setEditDueDate] = useState('');
    const [editComplete, setEditComplete] = useState(todo.completed);
    
    const handleEdit = () => {
        setIsEditing(true);
        setEditText(todo.text);
        setEditDueDate(todo.dueDate || '');
    };
    
    const handleSave = async () => {
        const editTextTrimmed = editText.trim();

        if (!editTextTrimmed) 
            return;

        try {
            let res = await axios.put(`${API_URL}/todos/${todo.id}`, { ...todo, text: editTextTrimmed, dueDate: editDueDate });
            
            resetStates();  
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        resetStates();
    };

    const resetStates = () => {
        setIsEditing(false);
        setEditText('');
        setEditDueDate('');
        setEditComplete(todo.completed);
    };

    const toggleComplete = async (completed) => {
        try {
            let res = await axios.put(`${API_URL}/todos/${todo.id}`, { ...todo, completed: completed });

            setEditComplete(completed);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="todo-item">
            <input
                type="checkbox"
                checked={editComplete}
                onChange={e => toggleComplete(e.target.checked)}
            />

            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                    />
                    <input
                        type="date"
                        value={editDueDate}
                        onChange={e => setEditDueDate(e.target.value)}
                    />
                    <button onClick={handleSave} className="button button__save">Save</button>
                    <button onClick={handleCancel} className="button button__cancel">Cancel</button>
                </>
            ) : (
                <>
                    <span
                        className={`task-text ${todo.completed ? 'done' : ''}`}
                    >
                        {todo.text} (Due: {todo.dueDate || 'N/A'})
                    </span>
                    <button onClick={handleEdit} className="button button__edit">Edit</button>
                    <button onClick={() => onDelete(todo.id)} className="button button__delete">Delete</button>
                </>
            )}

        </div>
    )
}