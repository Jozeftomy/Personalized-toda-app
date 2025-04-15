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
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow flex flex-col gap-2"
        >
          {editingId === task._id ? (
            <>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <div className="flex gap-3">
                <button
                  className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleEditSubmit(task._id)}
                >
                  <FaCheck />
                </button>
                <button
                  className="flex-1 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => setEditingId(null)}
                >
                  <FaTimes />
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <h4
                  className={`text-lg font-semibold ${
                    task.status === "completed" ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </h4>
                <p className="text-sm text-gray-600">{task.description}</p>
                <span
                  className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(task._id);
                    setEditTitle(task.title);
                    setEditDesc(task.description);
                    setEditStatus(task.status);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="text-red-600 hover:text-red-800"
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
