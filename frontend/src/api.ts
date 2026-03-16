import axios from "axios";
import { type Task } from "./types";

const API = "https://week4tasks.onrender.com/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API);
  return res.data;
};

export const addTask = async (title: string): Promise<Task> => {
  const res = await axios.post(API, { title });
  return res.data;
};

export const updateTask = async (id: string, completed: boolean) => {
  const res = await axios.put(`${API}/${id}`, { completed });
  return res.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API}/${id}`);
};