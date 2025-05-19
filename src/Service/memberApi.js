// API client for members management
import { API_URL, getHeaders } from './api';

// Mock member data structure based on the User model in models.js
const MOCK_MEMBERS = [
  {
    _id: '1',
    discordId: "000000000000000001",
    email: "24.01193-2@maua.br",
    name: "Lucas Silva",
    role: "captain",
    password: "hashed_password",
    modality: "Counter-Strike: Global Offensive A",
    paeHours: 15
  },
  {
    _id: '6',
    discordId: "000000000000000006",
    email: "24.01529-3@maua.br",
    name: "Carlos Santos",
    role: "member",
    password: "hashed_password",
    modality: "Counter-Strike: Global Offensive A",
    paeHours: 22
  },
  {
    _id: '7',
    discordId: "000000000000000007",
    email: "24.01234-5@maua.br",
    name: "Felipe Andrade",
    role: "member",
    password: "hashed_password",
    modality: "Counter-Strike: Global Offensive A",
    paeHours: 18
  },
  {
    _id: '8',
    discordId: "000000000000000008",
    email: "24.01456-7@maua.br",
    name: "Gabriela Souza",
    role: "member",
    password: "hashed_password",
    modality: "Counter-Strike: Global Offensive A",
    paeHours: 20
  },
  {
    _id: '9',
    discordId: "000000000000000009",
    email: "24.01678-9@maua.br",
    name: "Henrique Lima",
    role: "member",
    password: "hashed_password",
    modality: "Counter-Strike: Global Offensive A",
    paeHours: 25
  },
  {
    _id: '2',
    discordId: "000000000000000002",
    email: "24.00981-4@maua.br",
    name: "Maria Oliveira",
    role: "member",
    password: "hashed_password",
    modality: "League of Legends A",
    paeHours: 8
  },
  {
    _id: '3',
    discordId: "000000000000000003",
    email: "24.01567-9@maua.br",
    name: "João Pereira",
    role: "member",
    password: "hashed_password",
    modality: "Valorant Feminino",
    paeHours: 12
  },
  {
    _id: '4',
    discordId: "000000000000000003",
    email: "24.00345-1@maua.br",
    name: "Ana Costa",
    role: "captain",
    password: "hashed_password",
    modality: "Teamfight Tactics B",
    paeHours: 20
  },
  {
    _id: '5',
    discordId: "000000000000000004",
    email: "24.00759-7@maua.br",
    name: "Pedro Rocha",
    role: "captain",
    password: "hashed_password",
    modality: "Rainbow Six",
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