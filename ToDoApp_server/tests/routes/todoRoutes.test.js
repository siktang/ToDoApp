import { describe, it, beforeAll, afterAll, expect } from "vitest";
import axios from "axios";
import app from "../../app.js";

const PORT = process.env.PORT || 8080;
const API_URL = `http://localhost:${PORT}`;

let server;

describe("Todo routes", () => {
  beforeAll((done) => {
    server = app.listen(PORT, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should return empty todo list", async () => {
    const response = await axios.get(`${API_URL}/todos`);
    expect(response.status).toBe(200);
    expect(response.data.length).toEqual(0);
  });

  it("should throw 400 error to add new todo with empty text", async () => {
    const newText = "";
    const newDueDate = "06/10/2025";
    const reqBody = { text: newText, dueDate: newDueDate, completed: false};

    try {
      await axios.post(`${API_URL}/todos`, reqBody);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toMatchObject({
        // the response data should contain a error message
        message: expect.any(String)
      });
    }
  });

  it("should add a new todo item", async () => {
    const newText = "New todo 1";
    const newDueDate = "06/10/2025";
    const reqBody = { text: newText, dueDate: newDueDate, completed: false};

    const response = await axios.post(`${API_URL}/todos`, reqBody);
    expect(response.status).toBe(201);
    expect(response.data).toMatchObject(reqBody);
  });

  it("should return a list of only one item", async () => {
    const response = await axios.get(`${API_URL}/todos`);
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(1);
  });

  it("should throw 404 error to update non-existent todo item", async () => {
    const nonExistentId = "12345";
    const updateText = "Edit todo 1";
    const updateDueDate = "07/12/2025";
    const updateCompleted = true;
    const reqBody = { text: updateText, dueDate: updateDueDate, completed: updateCompleted};

    try {
      await axios.put(`${API_URL}/todos/${nonExistentId}`, reqBody);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toMatchObject({
        // the response data should contain a error message
        message: expect.any(String)
      });
    }
  });

  it("should update todo item", async () => {
    const response = await axios.get(`${API_URL}/todos`);
    const existingTodo = response.data[0];
    
    const updateText = "Edit todo 1";
    const updateDueDate = "07/12/2025";
    const updateCompleted = true;
    const reqBody = { text: updateText, dueDate: updateDueDate, completed: updateCompleted};

    const responseUpdate = await axios.put(`${API_URL}/todos/${existingTodo.id}`, reqBody);
    expect(responseUpdate.status).toBe(201);
    expect(responseUpdate.data).toMatchObject(reqBody);
  });

  it("should throw 404 to delete non-existent todo item", async () => {
    const nonExistentId = "12345";
    
    try {
      await axios.delete(`${API_URL}/todos/${nonExistentId}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toMatchObject({
        // the response data should contain a error message
        message: expect.any(String)
      });
    }
  });

  it("should delete todo item", async () => {
    const response = await axios.get(`${API_URL}/todos`);
    const existingTodo = response.data[0];
    
    const responseUpdate = await axios.delete(`${API_URL}/todos/${existingTodo.id}`);
    expect(responseUpdate.status).toBe(204);
  });

  it("should return empty todo list", async () => {
    const response = await axios.get(`${API_URL}/todos`);
    expect(response.status).toBe(200);
    expect(response.data.length).toEqual(0);
  });
});