import "./NewItem.scss";
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/"; 

export default function NewItem() {

    const [newTask, setNewTask] = useState("");
    const [newDueDate, setNewDueDate] = useState('');
    const [todos, setTodos] = useState([]);

    const handleAdd = async () => {
        if (!newTask.trim()) 
            return;

        try {
            let res = await axios.post(`${API_URL}/todos`, { text: newTask.trim(), dueDate: newDueDate });
            setTodos([...todos, res.data]);
            setNewTask("");
            setNewDueDate("");           
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="new-item-section">
            <label htmlFor="new-item"> New Task: </label>
            <input 
                id="new-item" 
                type="text" 
                placeholder="Add a new task here" 
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAdd()}
            />
            <input
                type="date"
                value={newDueDate}
                onChange={e => setNewDueDate(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    )
}
    