// API client for members management
import { API_URL, getHeaders } from './api';

// Mock member data structure based on the User model in models.js
const MOCK_MEMBERS = [
  {
    _id: '1',
    discordId: "lucas.silva#1234",
    email: "24.01193-2@maua.br",
    name: "Lucas Silva",
    role: "admin",
    password: "hashed_password",
    modality: "CS2",
    teams: ["CS A"],
    paeHours: 15
  },
  {
    _id: '2',
    discordId: "maria.oliveira#5678",
    email: "24.00981-4@maua.br",
    name: "Maria Oliveira",
    role: "member",
    password: "hashed_password",
    modality: "LoL",
    teams: ["LoL B"],
    paeHours: 8
  },
  {
    _id: '3',
    discordId: "joao.pereira#9012",
    email: "24.01567-9@maua.br",
    name: "João Pereira",
    role: "member",
    password: "hashed_password",
    modality: "Valorant",
    teams: ["VAL A"],
    paeHours: 12
  },
  {
    _id: '4',
    discordId: "ana.costa#3456",
    email: "24.00345-1@maua.br",
    name: "Ana Costa",
    role: "captain",
    password: "hashed_password",
    modality: "TFT",
    teams: ["TFT A"],
    paeHours: 20
  },
  {
    _id: '5',
    discordId: "pedro.rocha#7890",
    email: "24.00759-7@maua.br",
    name: "Pedro Rocha",
    role: "captain",
    password: "hashed_password",
    modality: "CS2",
    teams: ["CS B"],
    paeHours: 18
  }
];

// Fetch all members
export const fetchMembers = async () => {
  try {
    // In a real application, you'd make an API call here
    // const response = await fetch(`${API_URL}/members`, {
    //   headers: getHeaders(),
    //   mode: 'cors',
    //   cache: 'no-cache'
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }
    
    // return await response.json();

    // For now, return the mock data
    console.log("Using mock data for members");
    return MOCK_MEMBERS;
  } catch (error) {
    console.error('Error fetching members:', error);
    
    if (typeof window.showNotification === 'function') {
      window.showNotification('error', 'Failed to load members. Using local data.', 5000);
    }
    
    return MOCK_MEMBERS;
  }
};

// Update a member
export const updateMember = async (id, memberData) => {
  try {
    // In a real application, you'd make an API call here
    // const response = await fetch(`${API_URL}/members/${id}`, {
    //   method: 'PUT',
    //   headers: getHeaders(),
    //   body: JSON.stringify(memberData)
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }
    
    // return await response.json();

    // Mock update response
    console.log("Mock updating member:", id, memberData);
    return memberData;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

// Delete a member
export const deleteMember = async (id) => {
  try {
    // In a real application, you'd make an API call here
    // const response = await fetch(`${API_URL}/members/${id}`, {
    //   method: 'DELETE',
    //   headers: getHeaders()
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }
    
    // return await response.json();

    // Mock delete response
    console.log("Mock deleting member:", id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};

// Create a new member
export const createMember = async (memberData) => {
  try {
    // In a real application, you'd make an API call here
    // const response = await fetch(`${API_URL}/members`, {
    //   method: 'POST',
    //   headers: getHeaders(),
    //   body: JSON.stringify(memberData)
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }
    
    // return await response.json();

    // Mock create response
    console.log("Mock creating member:", memberData);
    return {
      ...memberData,
      _id: Date.now().toString() // Generate a mock ID
    };
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};