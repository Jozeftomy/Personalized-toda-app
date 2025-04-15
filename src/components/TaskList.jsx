import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const TaskList = ({ tasks, onDelete, onUpdate, isLoading }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const handleEditSubmit = (id) => {
    onUpdate(id, {
      title: editTitle,
      description: editDesc,
      status: editStatus,
    });
    setEditingId(null);
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
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
        >
          {editingId === task._id ? (
            <div className="space-y-4">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                autoFocus
              />
              <textarea
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-[100px]"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Task description"
              />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div className="flex gap-3">
                <button
                  className="flex-1 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleEditSubmit(task._id)}
                >
                  <FaCheck /> Save
                </button>
                <button
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                  onClick={() => setEditingId(null)}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2 flex-1">
                <h4
                  className={`text-lg font-medium ${
                    task.status === "completed"
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h4>
                {task.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {task.description}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "inprogress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(task.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(task._id);
                    setEditTitle(task.title);
                    setEditDesc(task.description);
                    setEditStatus(task.status);
                  }}
                  className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                  aria-label="Edit task"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  aria-label="Delete task"
                >
                  <FaTrash />
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