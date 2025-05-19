// API client for members management
import axios from 'axios';

// API Base URL (servidor backend)
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all members
export const fetchMembers = async () => {
  try {
    // Chamada real para a API
    const response = await axios.get(`${API_BASE_URL}/users`);
    console.log("Dados recuperados do MongoDB:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    
    if (typeof window.showNotification === 'function') {
      window.showNotification('error', 'Failed to load members. Using local data.', 5000);
    }
    
  }
};

// Update a member
export const updateMember = async (id, memberData) => {
  try {
    // Chamada real para a API
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, memberData);
    console.log("Atualizado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

// Delete a member
export const deleteMember = async (id) => {
  try {
    // Chamada real para a API
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    console.log("Excluído com sucesso:", response.data);
    return { success: true };
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};

// Create a new member
export const createMember = async (memberData) => {
  try {
    // Chamada real para a API
    const response = await axios.post(`${API_BASE_URL}/users`, memberData);
    console.log("Criado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};