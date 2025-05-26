import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // Load tasks from localStorage on first render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = {
      id: Date.now(),
      name: task.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const getFilteredTasks = () => {
    if (filter === "Completed") return tasks.filter((t) => t.completed);
    if (filter === "Pending") return tasks.filter((t) => !t.completed);
    return tasks;
  };

  return (
    <div className="app">
      <h1>Todo App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask} disabled={!task.trim()}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
      </div>

      <ul className="task-list">
        {getFilteredTasks().map((t) => (
          <li key={t.id} className={t.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(t.id)}
            />
            <span>{t.name}</span>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
