import NewItem from "../../components/NewItem/NewItem";
import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "../../components/TodoList/TodoList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"; 

export default function HomePage() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        try {
            let res = await axios.get(`${API_URL}/todos`);
            setTodos(res.data);
        } 
        catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <NewItem
                setTodos={setTodos}
            />
            
            <TodoList 
                todos={todos}
                setTodos={setTodos}
            />
        </main>
    )
}