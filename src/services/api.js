import axios from "axios";

const API_BASE_URL = "https://personalized-todo-app-backend-2.onrender.com/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add detailed error handling for API calls
export const registerUser = async (userData) => {
    try {
        const response = await api.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error.response?.data || error.message);
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post("/auth/login", userData);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error.response?.data || error.message);
    }
};

export const fetchTasks = async (token) => {
    try {
        const response = await api.get("/tasks", { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
    }
};

export const addTask = async (token, task) => {
    try {
        console.log("Adding task:", task); // Debugging
        const response = await api.post("/tasks", task, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error.response?.data || error.message);
    }
};

export const updateTask = async (token, id, updatedTask) => {
    try {
        const response = await api.put(`/tasks/${id}`, updatedTask, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error.response?.data || error.message);
    }
};

export const deleteTask = async (token, id) => {
    try {
        const response = await api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error.response?.data || error.message);
    }
};

export default api;
