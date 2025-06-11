import "./NewItem.scss";
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/"; 

export default function NewItem({ todos, setTodos }) {

    const [newText, setNewText] = useState("");
    const [newDueDate, setNewDueDate] = useState('');

    const handleAdd = async () => {
        if (!newText.trim()) 
            return;

        try {
            let res = await axios.post(`${API_URL}/todos`, { text: newText.trim(), dueDate: newDueDate });            
            setTodos([...todos, res.data]);
            
            setNewText("");
            setNewDueDate("");           
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="new-item">
            <label htmlFor="new-item"> New Task: </label>
            <input 
                id="new-item" 
                type="text" 
                placeholder="Add a new task here" 
                value={newText}
                onChange={e => setNewText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAdd()}
            />
            <input
                type="date"
                value={newDueDate}
                onChange={e => setNewDueDate(e.target.value)}
            />
            <button onClick={handleAdd} className="button button__add">Add</button>
        </section>
    )
}
    