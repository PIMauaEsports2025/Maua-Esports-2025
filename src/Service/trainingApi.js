// src/Service/trainingApi.js
const API_BASE_URL = "http://localhost:5000/api"; // Your backend API
const MAUA_ESPORTS_API_URL = "http://localhost:5001"; // Mauá Esports API for modalities
const MAUA_ESPORTS_API_TOKEN = "frontendmauaesports";


const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `Erro ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`API call error to ${endpoint}:`, error);
    throw error;
  }
};

const mauaEsportsRequest = async (endpoint, params = {}) => {
    try {
      const url = new URL(`${MAUA_ESPORTS_API_URL}${endpoint}`);
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${MAUA_ESPORTS_API_TOKEN}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Erro ${response.status}: ${response.statusText}\nResposta: ${errorText}`
        );
      }
      return response.json();
    } catch (error) {
      console.error("Erro na requisição à API Mauá Esports:", error);
      throw error;
    }
};

// Training service to fetch training data
export const fetchTrainings = async () => {
  try {
    // Simulando dados de treinos baseados no defaultTrains.json
    const mockTrainings = [
      {
        "_id": "636842a7ff1a390e69e601e6",
        "StartTimestamp": 1667777191411,
        "ScheduledStart": "0 00 20 * * 0",
        "EndTimestamp": 1667779201608,
        "AttendedPlayers": [
          {
            "PlayerId": "000000000000000001",
            "EntranceTimestamp": 1667777196398,
            "ExitTimestamp": 1667779201608
          },
          {
            "PlayerId": "000000000000000002",
            "EntranceTimestamp": 1667777196398,
            "ExitTimestamp": 1667779201608
          },
          {
            "PlayerId": "000000000000000003",
            "EntranceTimestamp": 1667777196398,
            "ExitTimestamp": 1667779201608
          },
          {
            "PlayerId": "000000000000000004",
            "EntranceTimestamp": 1667777196398,
            "ExitTimestamp": 1667778436529
          }
        ],
        "ModalityId": "641246ec14a24f13c339bb1f",
        "Status": "ENDED"
      },
      {
        "_id": "63685189ff1a390e69e601e7",
        "StartTimestamp": 1667781001728,
        "ScheduledStart": "0 30 21 * * 0",
        "EndTimestamp": 1667784601728,
        "AttendedPlayers": [],
        "ModalityId": "6360944b04a823de3a359357",
        "Status": "ENDED"
      },
      {
        "_id": "63697fe4ff1a390e69e601e8",
        "StartTimestamp": 1667858404151,
        "ScheduledStart": "0 00 19 * * 1",
        "EndTimestamp": 1667865604687,
        "AttendedPlayers": [
          {
            "PlayerId": "000000000000000001",
            "EntranceTimestamp": 1667858409215,
            "ExitTimestamp": 1667865604687
          },
          {
            "PlayerId": "000000000000000002",
            "EntranceTimestamp": 1667858409215,
            "ExitTimestamp": 1667865604687
          },
          {
            "PlayerId": "000000000000000003",
            "EntranceTimestamp": 1667860439307,
            "ExitTimestamp": 1667864008567
          }
        ],
        "ModalityId": "63641abd9328c1ab1e364c86",
        "Status": "ENDED"
      }
    ];

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockTrainings;
  } catch (error) {
    console.error('Erro ao buscar treinos:', error);
    throw error;
  }
};

export const getTrainingById = (id) => request(`/trainings/${id}`);
export const createTraining = (trainingData) => request('/trainings', { method: 'POST', body: JSON.stringify(trainingData) });
export const updateTraining = (id, trainingData) => request(`/trainings/${id}`, { method: 'PUT', body: JSON.stringify(trainingData) });
export const deleteTraining = (id) => request(`/trainings/${id}`, { method: 'DELETE' });

// Fetch modalities from Mauá Esports API
export const fetchExternalModalities = () => mauaEsportsRequest("/modality/all");

// Fetch users (members) from your own API
export const fetchUsers = () => request('/users'); // Assuming you have this from GerenciarMembros