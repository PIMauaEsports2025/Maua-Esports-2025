// Serviço para comunicação com a API Stage-API-Maua-Esports

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Função para buscar modalidades
export const fetchModalities = async () => {
  try {
    const token = localStorage.getItem('token');
    
    // Se não tiver token, retorne dados mockados por enquanto
    if (!token) {
      return {
        "1": { Name: "Counter-Strike 2", Tag: "CS2", ScheduledTrainings: [1, 2, 3] },
        "2": { Name: "League of Legends", Tag: "LoL", ScheduledTrainings: [4, 5] },
        "3": { Name: "Valorant", Tag: "VAL", ScheduledTrainings: [6] }
      };
    }
    
    const response = await fetch(`${API_URL}/modalities`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar modalidades:', error);
    throw error;
  }
};

// Função para buscar treinos
export const fetchTrainings = async () => {
  try {
    const token = localStorage.getItem('token');
    
    // Se não tiver token, retorne dados mockados por enquanto
    if (!token) {
      return [
        {
          _id: '1',
          ModalityId: 'Counter-Strike 2',
          StartTimestamp: Date.now(),
          EndTimestamp: Date.now() + 3600000,
          AttendedPlayers: ['Player1', 'Player2'],
          Status: 'Scheduled'
        },
        {
          _id: '2',
          ModalityId: 'League of Legends',
          StartTimestamp: Date.now() + 86400000,
          EndTimestamp: Date.now() + 90000000,
          AttendedPlayers: ['Player3', 'Player4', 'Player5'],
          Status: 'Completed'
        }
      ];
    }
    
    const response = await fetch(`${API_URL}/trainings`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar treinos:', error);
    throw error;
  }
};

// Outras funções de API conforme necessário...
export const createModality = async (modalityData) => {
  // implementação
};

export const updateModality = async (id, modalityData) => {
  // implementação  
};

export const deleteModality = async (id) => {
  // implementação
};

export const createTraining = async (trainingData) => {
  // implementação
};

export const updateTraining = async (id, trainingData) => {
  // implementação
};

export const deleteTraining = async (id) => {
  // implementação
};