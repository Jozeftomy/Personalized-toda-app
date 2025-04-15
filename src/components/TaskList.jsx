import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const TaskList = ({ tasks, onDelete, onUpdate }) => {
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

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="p-5 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          {editingId === task._id ? (
            <div className="space-y-4">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <div className="flex gap-4">
                <button
                  className="flex-1 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                  onClick={() => handleEditSubmit(task._id)}
                >
                  <FaCheck className="mx-auto" />
                </button>
                <button
                  className="flex-1 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
                  onClick={() => setEditingId(null)}
                >
                  <FaTimes className="mx-auto" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h4
                  className={`text-xl font-semibold ${
                    task.status === "completed" ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h4>
                <p className="text-sm text-gray-600">{task.description}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="flex gap-3 text-xl">
                <button
                  onClick={() => {
                    setEditingId(task._id);
                    setEditTitle(task.title);
                    setEditDesc(task.description);
                    setEditStatus(task.status);
                  }}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="text-red-600 hover:text-red-800 transition"
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
