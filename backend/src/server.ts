import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [];

app.get("/api/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

app.post("/api/tasks", (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  const newTask: Task = {
    id: Date.now().toString(),
    title,
    completed: false
  };

  tasks.push(newTask);

  res.json(newTask);
});

app.put("/api/tasks/:id", (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = req.body.completed;

  res.json(task);
});

app.delete("/api/tasks/:id", (req: Request, res: Response) => {
  tasks = tasks.filter(t => t.id !== req.params.id);

  res.json({ message: "Task deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});