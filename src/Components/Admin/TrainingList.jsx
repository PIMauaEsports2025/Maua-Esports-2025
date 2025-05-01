import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaUserCheck } from 'react-icons/fa';
import '../../styles/Admin/TrainingsList.css';

const TrainingsList = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrainings = async () => {
      try {
        setLoading(true);
        // Temporariamente usando dados mockados até a API estar pronta
        const mockData = [
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
        
        setTrainings(mockData);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar treinos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTrainings();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString('pt-BR');
  };

  if (loading) return <div className="loading">Carregando treinos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="trainings-container">
      <div className="trainings-header">
        <h2>Gerenciar Treinos</h2>
        <button className="add-button">
          <FaPlus /> Novo Treino
        </button>
      </div>

      <table className="trainings-table">
        <thead>
          <tr>
            <th>Modalidade</th>
            <th>Início</th>
            <th>Término</th>
            <th>Participantes</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((training) => (
            <tr key={training._id}>
              <td>{training.ModalityId}</td>
              <td>{formatDate(training.StartTimestamp)}</td>
              <td>{formatDate(training.EndTimestamp)}</td>
              <td>{training.AttendedPlayers?.length || 0}</td>
              <td>
                <span className={`status-badge ${training.Status.toLowerCase()}`}>
                  {training.Status}
                </span>
              </td>
              <td>
                <button className="attendance-button" title="Ver presença">
                  <FaUserCheck />
                </button>
                <button className="edit-button" title="Editar">
                  <FaEdit />
                </button>
                <button className="delete-button" title="Excluir">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingsList;