import React, { useState } from "react";

const TaskForm = ({ onAdd, taskToEdit, onUpdate }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : "");
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : "medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      priority,
      status: "pending",
    };

    try {
      if (taskToEdit) {
        await onUpdate(taskToEdit.id, task); 
      } else {
        await onAdd(task); 
      }

      if (!taskToEdit) {
        setTitle("");
        setDescription("");
        setPriority("medium");
      }
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }
  };

  return (
    <form className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Task Description
        </label>
        <textarea
          id="description"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
      >
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;