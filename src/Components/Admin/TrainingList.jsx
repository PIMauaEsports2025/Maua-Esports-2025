import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaUserCheck } from 'react-icons/fa';
import '../../styles/Admin/TrainingsList.css';
import { fetchTrainings, fetchModalities } from '../../Service/api';

const TrainingsList = () => {
  const [trainings, setTrainings] = useState([]);
  const [modalities, setModalities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    startDate: null,
    endDate: null
  });

  // Buscar modalidades para poder exibir os nomes
  useEffect(() => {
    const loadModalities = async () => {
      try {
        const modalitiesData = await fetchModalities();
        setModalities(modalitiesData);
      } catch (err) {
        console.error('Erro ao carregar modalidades:', err);
        // Não definimos o erro aqui para não interferir com o carregamento dos treinos
      }
    };

    loadModalities();
  }, []);

  useEffect(() => {
    const getTrainings = async () => {
      try {
        setLoading(true);
        
        // Converter datas para timestamps se necessário
        const apiFilters = {};
        if (filters.status) apiFilters.status = filters.status;
        if (filters.startDate) {
          apiFilters.startTimestampGt = new Date(filters.startDate).getTime();
        }
        if (filters.endDate) {
          apiFilters.startTimestampLt = new Date(filters.endDate).getTime();
        }
        
        const data = await fetchTrainings(apiFilters);
        setTrainings(data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar treinos: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTrainings();
  }, [filters]);

  // Função para obter o nome da modalidade a partir do ID
  const getModalityName = (modalityId) => {
    if (!modalities || !modalities[modalityId]) {
      return modalityId; // Fallback para o ID caso não encontre a modalidade
    }
    return modalities[modalityId].Name; // Retorna o nome completo da modalidade
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString('pt-BR');
  };

  // Handler para mudança de filtros
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="loading">Carregando treinos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="trainings-container">
      <div className="trainings-header">
        <h2>Gerenciar Treinos</h2>
        
        <div className="filters-section">
          <h3 className="filters-title">Filtros</h3>
          
          <div className="filter-controls">
            <div className="filter-item">
              <label htmlFor="status-filter">Status:</label>
              <select 
                id="status-filter"
                value={filters.status} 
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">Todos os Status</option>
                <option value="SCHEDULED">Agendado</option>
                <option value="RUNNING">Em Andamento</option>
                <option value="ENDED">Finalizado</option>
                <option value="CANCELLED">Cancelado</option>
              </select>
            </div>
            
            <div className="filter-item">
              <label htmlFor="start-date-filter">Data Inicial:</label>
              <input
                id="start-date-filter"
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>
            
            <div className="filter-item">
              <label htmlFor="end-date-filter">Data Final:</label>
              <input
                id="end-date-filter"
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
            
            <button 
              className="filter-clear-button"
              onClick={() => setFilters({status: '', startDate: null, endDate: null})}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
        
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
              <td>{getModalityName(training.ModalityId)}</td>
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