import axios from "axios";

const API_BASE_URL = "https://personalized-todo-app-backend-2.onrender.com/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);
export const fetchTasks = (token) =>
    api.get("/tasks", { headers: { Authorization: `Bearer ${token}` } });

export const addTask = (token, task) => 
    api.post("/tasks", task, { headers: { Authorization: `Bearer ${token}` } });

export const updateTask = (token, id, updatedTask) =>
    api.put(`/tasks/${id}`, updatedTask, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTask = (token, id) =>
    api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export default api;
