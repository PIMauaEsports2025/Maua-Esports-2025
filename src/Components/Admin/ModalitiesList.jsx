import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../styles/Admin/ModalitiesList.css';
import { fetchModalities } from '../../Service/api';
import ScheduledTrainingsEditor from './ScheduledTrainingsEditor';

const ModalitiesList = () => {
  const [modalities, setModalities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingModality, setEditingModality] = useState(null);

  const loadModalities = async () => {
    try {
      setLoading(true);
      const data = await fetchModalities();
      setModalities(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar modalidades: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModalities();
  }, []);

  const handleEditClick = (modalityId) => {
    const modality = modalities[modalityId];
    setEditingModality({
      id: modalityId,
      name: modality.Name,
      trainings: modality.ScheduledTrainings || []
    });
  };

  const handleCloseEditor = () => {
    setEditingModality(null);
  };

  const handleEditorSuccess = () => {
    // Recarregar modalidades após atualização bem-sucedida
    loadModalities();
  };

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
                <button 
                  className="edit-button" 
                  title="Editar Treinos"
                  onClick={() => handleEditClick(id)}
                >
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
      
      {editingModality && (
        <ScheduledTrainingsEditor 
          modalityId={editingModality.id}
          modalityName={editingModality.name}
          initialTrainings={editingModality.trainings}
          onClose={handleCloseEditor}
          onSuccess={handleEditorSuccess}
        />
      )}
    </div>
  );
};

export default ModalitiesList;