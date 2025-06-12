# Project Title

To-Do App

## Overview

To-Do App allows users to manage simple tasks/todo items by adding, editing, deleting, and marking the task items as done or undone.

### User Profile

General public hoping to manage simple todo items. 

### Features

- As a general user, I will be able to 
    - Add a new todo item with/without due date
    - Edit an existing todo item (content and/or due date)
    - Delete an existing todo item so it no longer appears on my task list
    - Mark an existing todo item as done or undone
    - See a list of todo items (if any) 

## Implementation

### Tech Stack

- React
- Express
- Client libraries: 
    - react
    - react-router-dom
    - axios
    - sass
    - Font Awesome

- Server libraries:
    - express
    - axios
    - cors
    - dotenv
    - uuid



### Endpoints


**GET /todos**

- Get a list of todo items 

Response:
- Response returns 200 if successful

```
[
{
"id": "68e0005b-a1be-4bfa-bc76-bbbc735536ca",
"text": "Clean up kitchen",
"dueDate": "2025-06-18",
"completed": true
},
{
"id": "c37bddd7-370c-4613-aa48-628ff0cfc32c",
"text": "Vacuum and sweep",
"dueDate": "2025-06-26",
"completed": false
},
…
]
```


**POST /todos**

- Adding a new todo item 

Parameters:

- text: content of the new todo
- dueDate: due date of the todo as set by user

Response:
- Response returns 400 if text is missing
- Response returns 201 if successful
```
{
  "id": "98cbf82d-f88d-4ae9-90e3-5bede902334d",
  "text": "buy mat”,
  "dueDate": "2025-09-28",
  "completed": false
}
```

**PUT /todos/:id**

- Updating/Editing a todo

Parameters:
- id: todo id
- text: new content of the target todo
- dueDate: new due date of the target todo
- completed: true for when target todo is done, and false to undone the same item

Response:
- Response returns 400 if text is missing

- Response returns 404 if todo is not found

- Response returns 201 if successful
```
{
  "id": "3c2f7e37-22c7-4ac8-868a-3a4d5d775db4",
  "text": "Respond to emails",
  "dueDate": "2025-09-28",
  "completed": true
}
```

**DELETE /todos/:id**

- Delete the target todo

Parameters:
- id: todo id

Response:

- Response returns 404 if todo is not found

- Response returns 204 with no content if successful




## Local Setup Steps

Before starting the client and the server, please cd in to ToDoApp_client and ToDoApp_server, and run "npm i" or "npm install" to install all necessary dependencies in both directories.
- In ToDoApp_client:
   - Run "npm run dev" to start the frontend application

- In ToDoApp_server:
   - Run "npm start" to start the backend server

## Unit testing

- In ToDoApp_client:
    - Run "npm test” to execute client side test cases

- In ToDoApp_server:
    - Run "npm test” to execute server side test cases

