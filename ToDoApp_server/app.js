import cors from "cors";
import "dotenv/config";
import express from "express";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/todos", todoRoutes);

app.get("/", (_req, res) => {
    res.send("Welcome to Todo App");
});

export default app;