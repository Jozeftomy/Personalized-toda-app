import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaFlag } from "react-icons/fa";

const TaskList = ({ tasks, onDelete, onUpdate, isLoading }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPriority, setEditPriority] = useState("medium");

  const handleEditSubmit = (id) => {
    onUpdate(id, {
      title: editTitle,
      description: editDesc,
      priority: editPriority,
    });
    setEditingId(null);
  };

  const priorityStyles = {
    high: {
      bg: "bg-red-50",
      text: "text-red-700",
      icon: "text-red-500",
      border: "border-red-200"
    },
    medium: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      icon: "text-yellow-500",
      border: "border-yellow-200"
    },
    low: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: "text-green-500",
      border: "border-green-200"
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No tasks found</div>
        <div className="text-sm text-gray-500 mt-2">
          Add a new task to get started
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`p-5 rounded-lg shadow-xs transition-all duration-200 border-l-4 ${
            priorityStyles[task.priority].border
          } ${priorityStyles[task.priority].bg}`}
        >
          {editingId === task._id ? (
            <div className="space-y-3">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                autoFocus
              />
              <textarea
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 min-h-[80px]"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Task description"
              />
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <div className="flex gap-2 pt-1">
                <button
                  className="flex-1 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
                  onClick={() => handleEditSubmit(task._id)}
                >
                  <FaCheck /> Save Changes
                </button>
                <button
                  className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                  onClick={() => setEditingId(null)}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <FaFlag className={`${priorityStyles[task.priority].icon} text-sm`} />
                  <h4 className={`text-md font-medium ${priorityStyles[task.priority].text}`}>
                    {task.title}
                  </h4>
                </div>
                {task.description && (
                  <p className="text-sm text-gray-600 leading-snug pl-5">
                    {task.description}
                  </p>
                )}
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    setEditingId(task._id);
                    setEditTitle(task.title);
                    setEditDesc(task.description);
                    setEditPriority(task.priority);
                  }}
                  className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                  aria-label="Edit task"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  aria-label="Delete task"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;