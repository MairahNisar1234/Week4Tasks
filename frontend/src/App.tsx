import { useEffect, useState } from "react";
import { type Task } from "./types";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import Navbar from "./Navbar";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAdd = async () => {
    if (!title.trim()) {
      alert("Task title required");
      return;
    }
    const newTask = await addTask(title);
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const toggleTask = async (task: Task) => {
    const updated = await updateTask(task.id, !task.completed);
    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };
const today = new Date().toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});


  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  

 return (
  <>
 <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <Navbar />
    
    {/* Minimal Card Container */}
   <div className="mt-8 bg-white p-10 rounded-[2rem] shadow-sm w-full max-w-md border border-gray-100">
      
      {/* Header */}
      <div className="mb-8">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">{today}</p>
        <h1 className="text-3xl font-semibold text-gray-800">To-do List</h1>
      </div>

      {/* Input */}
      <div className="flex gap-3 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-50 px-5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 border border-gray-200"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-6 rounded-2xl font-medium hover:bg-blue-700 transition">
          Add
        </button>
      </div>
      {/* Stats Section */}
<div className="mb-8">
  <div className="flex justify-between text-sm text-gray-500 mb-2">
    <span>Progress</span>
    <span>{tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0}%</span>
    <div>
  Completed: {completed} | Pending: {pending}
</div>
  </div>
  {/* Progress Bar Background */}
  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
    {/* Progress Bar Fill */}
    <div 
      className="bg-blue-600 h-full transition-all duration-500 ease-out"
      style={{ width: `${tasks.length > 0 ? (completed / tasks.length) * 100 : 0}%` }}
    />
  </div>

  <p className="text-xs text-gray-400 mt-2 text-right">
    {completed} of {tasks.length} tasks completed
  </p>
</div>

      {/* List */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-4 group">
            {/* Custom Checkbox Circle */}
            <button 
              onClick={() => toggleTask(task)}
              className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                task.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-blue-400"
              }`}
            >
              {task.completed && <div className="w-2 h-2 bg-white rounded-full" />}
            </button>

            <span className={`flex-1 transition-all ${task.completed ? "text-gray-400 line-through" : "text-gray-700"}`}>
              {task.title}
            </span>

            <button onClick={() => removeTask(task.id)} className="text-gray-300 hover:text-red-400 font-bold opacity-0 group-hover:opacity-100 transition">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  </>
);
}
export default App;