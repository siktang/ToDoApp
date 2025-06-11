import "./TodoList.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "../ToDoItem/ToDoItem";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/"; 

export default function TodoList() {
    
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, [todos]);

    const getTodos = async () => {
        try {
            let res = await axios.get(`${API_URL}/todos`);
            setTodos(res.data);
        } 
        catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));           
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <section className="to-do-list">
                {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={handleDelete}
                />
                ))}
        </section>
    )
}