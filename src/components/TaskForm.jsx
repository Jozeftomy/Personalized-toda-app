import React, { useState } from "react";

const TaskForm = ({ onAdd, taskToEdit, onUpdate }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : "");
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : "medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      priority,
      status: "pending",
    };

    if (taskToEdit) {
      onUpdate(taskToEdit.id, task); 
    } else {
      onAdd(task); 
    }

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full p-3 border rounded-lg"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full p-3 border rounded-lg"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div className="flex justify-between items-center">
        <label className="text-lg">Priority:</label>
        <select
          className="p-2 border rounded-lg"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {taskToEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
