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

    console.log("Submitting task:", task); // Debugging

    try {
      if (taskToEdit) {
        await onUpdate(taskToEdit.id, task); 
      } else {
        await onAdd(task); 
      }

      setTitle("");
      setDescription("");
      setPriority("medium");
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
