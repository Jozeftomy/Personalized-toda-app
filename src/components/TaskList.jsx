import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaCircle } from "react-icons/fa";

const TaskList = ({ tasks, onDelete, onUpdate, isLoading }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPriority, setEditPriority] = useState("medium");
  const [editStatus, setEditStatus] = useState("pending");

  const handleEditSubmit = (id) => {
    onUpdate(id, {
      title: editTitle,
      description: editDesc,
      priority: editPriority,
      status: editStatus,
    });
    setEditingId(null);
  };

  const statusStyles = {
    pending: "text-gray-500",
    inprogress: "text-blue-500",
    completed: "text-green-500"
  };

  const priorityStyles = {
    high: "text-red-500",
    medium: "text-gray-500", 
    low: "text-green-500"
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
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
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
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                >
                  <option value="pending">Pending</option>
                  <option value="inprogress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm"
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
                <h4 className="text-md font-medium text-gray-800">
                  {task.title}
                </h4>
                {task.description && (
                  <p className="text-sm text-gray-600 leading-snug">
                    {task.description}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <FaCircle className={`text-xs ${priorityStyles[task.priority]}`} />
                    <span className="text-xs text-gray-500">
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCircle className={`text-xs ${statusStyles[task.status]}`} />
                    <span className="text-xs text-gray-500">
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    setEditingId(task._id);
                    setEditTitle(task.title);
                    setEditDesc(task.description);
                    setEditPriority(task.priority);
                    setEditStatus(task.status);
                  }}
                  className="p-1.5 text-green-500 hover:text-green-700 hover:bg-blue-50 rounded-md transition-colors"
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