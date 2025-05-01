import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../styles/Admin/ModalitiesList.css';

const ModalitiesList = () => {
  const [modalities, setModalities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getModalities = async () => {
      try {
        setLoading(true);
        // Dados mockados temporários
        const mockData = {
          "1": { Name: "Counter-Strike 2", Tag: "CS2", ScheduledTrainings: [1, 2, 3] },
          "2": { Name: "League of Legends", Tag: "LoL", ScheduledTrainings: [4, 5] },
          "3": { Name: "Valorant", Tag: "VAL", ScheduledTrainings: [6] }
        };
        
        setModalities(mockData);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar modalidades');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getModalities();
  }, []);

  if (loading) return <div className="loading">Carregando modalidades...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="modalities-container">
      <div className="modalities-header">
        <h2>Gerenciar Modalidades</h2>
        <button className="add-button">
          <FaPlus /> Nova Modalidade
        </button>
      </div>

      <table className="modalities-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tag</th>
            <th>Treinos Agendados</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(modalities).map(([id, modality]) => (
            <tr key={id}>
              <td>{modality.Name}</td>
              <td>{modality.Tag}</td>
              <td>{modality.ScheduledTrainings?.length || 0}</td>
              <td>
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

export default ModalitiesList;