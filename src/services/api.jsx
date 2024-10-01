import axios from 'axios';

const API_URL = 'http://localhost:5000';

// User API Calls
export const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

export const registerUser = async (userData) => {
    try {
        await axios.post(`${API_URL}/users`, userData);
        return { success: true };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, error: error.message };
    }
};

export const loginUser = async (credentials) => {
    try {
        const { data } = await axios.get(`${API_URL}/users`);
        const user = data.find(
            (user) =>
                user.username === credentials.username && user.password === credentials.password
        );
        return user ? { success: true, user } : { success: false, error: 'Invalid credentials' };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, error: error.message };
    }
};

// Recipe API Calls
export const getRecipes = async () => {
    try {
        const response = await axios.get(`${API_URL}/recipes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
};

export const addRecipe = async (recipeData) => {
    try {
        await axios.post(`${API_URL}/recipes`, recipeData);
    } catch (error) {
        console.error('Error adding recipe:', error);
    }
};

export const updateRecipe = async (id, recipeData) => {
    try {
        await axios.put(`${API_URL}/recipes/${id}`, recipeData);
    } catch (error) {
        console.error('Error updating recipe:', error);
    }
};

export const deleteRecipe = async (id) => {
    try {
        await axios.delete(`${API_URL}/recipes/${id}`);
    } catch (error) {
        console.error('Error deleting recipe:', error);
    }
};
