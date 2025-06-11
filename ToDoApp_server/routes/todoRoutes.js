import express from "express";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// more ideally, to be saved in database
let todos = []; 

// Get all todos
router.get('/', (req, res) => {
    try {
        return res.status(200).json(todos);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Failed to retrieve todo list" });
    }
});

// Create a new todo
router.post('/', (req, res) => {
    const { text, dueDate } = req.body;

    // make sure none of those fields the user sent was empty
    if (!text.trim()) {
        return res.status(400).json({ message: "Task description is required" });
    }

    try {
        // object to be stored
        const newTodo = {
          id: uuidv4(),
          text: text.trim(),
          dueDate,
          completed: false,
        };

        todos.push(newTodo);
        return res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Failed to add task" });
    }

});

// Update a todo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  
  const { text, dueDate, completed } = req.body;
  if (!text.trim()) {
    return res.status(400).json({ message: "Task description is required" });
  }

  const todo = todos.find(t => t.id === id);
  if (!todo) 
    return res.status(404).json({ message: "Task not found" });

  try {
    todo.text = text.trim();
    todo.dueDate = dueDate;
    todo.completed = completed;

    return res.status(201).json(todo);
  } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Failed to update task" });
  }
});

// Delete a todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  const todo = todos.find(t => t.id === id);
  if (!todo) 
    return res.status(404).json({ message: "Task not found" });

  try {
    todos = todos.filter(t => t.id !== id);

    return res.status(204).send();
  } catch (error) {
      console.log(error);
      
      return res.status(500).json({ message: "Failed to delete task" });
  }
  
});


export default router;