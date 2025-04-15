import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { fetchTasks, addTask, updateTask, deleteTask } from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks(token);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleAddTask = async (task) => {
    await addTask(token, task);
    loadTasks();
  };

  const handleUpdateTask = async (id, updatedTask) => {
    await updateTask(token, id, updatedTask);
    loadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(token, id);
    loadTasks();
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100 py-12 px-6 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-2xl space-y-8">
        <h1 className="text-4xl font-semibold text-center text-green-700">
          Task Manager
        </h1>

        {/* Filters */}
        <div className="flex justify-center gap-4">
          {["all", "pending", "completed"].map((status) => (
            <button
              key={status}
              className={`px-6 py-3 text-lg rounded-xl transition-colors duration-300 ${
                filter === status
                  ? "bg-green-600 text-white"
                  : "bg-white border-2 border-green-500 text-green-600 hover:bg-green-100"
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <TaskForm onAdd={handleAddTask} />
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;
