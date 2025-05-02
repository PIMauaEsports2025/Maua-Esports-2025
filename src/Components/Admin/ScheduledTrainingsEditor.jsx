import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { updateModalityScheduledTrainings } from '../../Service/api';
import '../../styles/Admin/ScheduledTrainingsEditor.css';

const ScheduledTrainingsEditor = ({ modalityId, modalityName, initialTrainings, onClose, onSuccess }) => {
  const [scheduledTrainings, setScheduledTrainings] = useState(initialTrainings || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Validação de expressão CRON (simples)
  const validateCronExpression = (expr) => {
    // A API espera formato: segundos minutos horas diaMês mês diaSemana
    const parts = expr.trim().split(' ');
    return parts.length === 6;
  };

  const handleAdd = () => {
    setScheduledTrainings([
      ...scheduledTrainings,
      { Start: '0 00 20 * * 1', End: '0 00 22 * * 1' } // Padrão: Segunda 20h-22h
    ]);
  };

  const handleRemove = (index) => {
    const updated = [...scheduledTrainings];
    updated.splice(index, 1);
    setScheduledTrainings(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...scheduledTrainings];
    updated[index][field] = value;
    setScheduledTrainings(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validar todas as expressões CRON
      for (const training of scheduledTrainings) {
        if (!validateCronExpression(training.Start) || !validateCronExpression(training.End)) {
          throw new Error('Formato CRON inválido. Use: segundos minutos horas diaMês mês diaSemana');
        }
      }
      
      await updateModalityScheduledTrainings(modalityId, scheduledTrainings);
      onSuccess && onSuccess();
      onClose && onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Treinos Agendados</h2>
          <h3>{modalityName}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="scheduled-trainings-list">
              {scheduledTrainings.map((training, index) => (
                <div key={index} className="training-item">
                  <div className="training-inputs">
                    <div className="input-group">
                      <label>Início (CRON):</label>
                      <input
                        type="text"
                        value={training.Start}
                        onChange={(e) => handleChange(index, 'Start', e.target.value)}
                        placeholder="0 00 20 * * 1"
                      />
                    </div>
                    <div className="input-group">
                      <label>Fim (CRON):</label>
                      <input
                        type="text"
                        value={training.End}
                        onChange={(e) => handleChange(index, 'End', e.target.value)}
                        placeholder="0 00 22 * * 1"
                      />
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="remove-button"
                    onClick={() => handleRemove(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="add-button"
                onClick={handleAdd}
              >
                <FaPlus /> Adicionar Horário
              </button>
              <button 
                type="submit" 
                className="save-button"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="modal-footer">
          <p className="helper-text">
            Formato CRON: segundos minutos horas diaDaMês mês diaDaSemana<br />
            Exemplo: "0 00 20 * * 1" = Segunda-feira às 20:00:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduledTrainingsEditor;