import "./TodoList.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "../ToDoItem/ToDoItem";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/"; 

export default function TodoList() {
    
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState('');
    const [editTask, setEditTask] = useState('');
    const [editDueDate, setEditDueDate] = useState('');

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

    const handleEdit = (todo) => {
        setEditId(todo.id);
        setEditTask(todo.text);
        setEditDueDate(todo.dueDate || '');
    };

    const handleCancel = () => {
        setEditId('');
        setEditTask('');
        setEditDueDate('');
    };

    const handleSave = async (id) => {
        if (!editTask.trim()) 
            return;

        const selectedTodo = todos.find(todo => todo.id === id);

        try {
            let res = await axios.put(`${API_URL}/todos/${id}`, { ...selectedTodo, text: editTask.trim(), dueDate: editDueDate });
            setTodos(todos.map(t => t.id === id ? res.data : t));         
            handleCancel();  
        } catch (error) {
            console.error(error);
        }
    };

    const toggleComplete = async (id) => {
        const selectedTodo = todos.find(todo => todo.id === id);

        try {
            let res = await axios.put(`${API_URL}/todos/${id}`, { ...selectedTodo, completed: !selectedTodo.completed });
            setTodos(todos.map(todo => todo.id === id ? res.data : todo));   
        } catch (error) {
            console.error(error);
        }
    };


    return(
        <div className="to-do-list">
            <ul>
                {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    isEditing={editId === todo.id}
                    editTask={editTask}
                    setEditTask={setEditTask}
                    editDueDate={editDueDate}
                    setEditDueDate={setEditDueDate}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onToggleComplete={toggleComplete}
                />
                ))}
            </ul>
        </div>
    )
}