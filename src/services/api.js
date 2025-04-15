import axios from "axios";

const API_BASE_URL = "https://personalized-todo-app-backend-2.onrender.com/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        } else if (error.request) {
            return Promise.reject({ message: "No response received from server" });
        } else {
            return Promise.reject({ message: error.message });
        }
    }
);

export const registerUser = async (userData) => {
    try {
        const response = await api.post("/auth/register", userData);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message || "Registration failed" };
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post("/auth/login", userData);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message || "Login failed" };
    }
};

export const fetchTasks = async (token) => {
    try {
        const response = await api.get("/tasks", { headers: { Authorization: `Bearer ${token}` } });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message || "Failed to fetch tasks" };
    }
};

export const addTask = async (token, task) => {
    try {
        const response = await api.post("/tasks", task, { headers: { Authorization: `Bearer ${token}` } });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message || "Failed to add task" };
    }
};

export const updateTask = async (token, id, updatedTask) => {
    try {
        const response = await api.put(`/tasks/${id}`, updatedTask, { headers: { Authorization: `Bearer ${token}` } });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message || "Failed to update task" };
    }
};

export const deleteTask = async (token, id) => {
    try {
        const response = await api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message || "Failed to delete task" };
    }
};

export default api;