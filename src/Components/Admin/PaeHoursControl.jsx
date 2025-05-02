import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import '../../styles/Admin/PaeHoursControl.css';

const PaeHoursControl = () => {
  const [paeRecords, setPaeRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole') || '');
    
    const getPaeRecords = async () => {
      try {
        setLoading(true);
        // Dados mockados temporários
        const mockData = [
          { id: 1, ra: "24.00123-4", name: "João Silva", modality: "CS2", hours: 10, lastTraining: "2025-04-28" },
          { id: 2, ra: "23.01234-5", name: "Maria Costa", modality: "LOL", hours: 15, lastTraining: "2025-04-30" },
          { id: 3, ra: "22.02345-6", name: "Pedro Santos", modality: "VALORANT", hours: 8, lastTraining: "2025-04-29" }
        ];
        
        setPaeRecords(mockData);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar registros PAE');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPaeRecords();
  }, []);

  if (loading) return <div className="loading">Carregando registros PAE...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pae-container">
      <div className="pae-header">
        <h2>Controle de Horas PAE</h2>
        {userRole === 'admin' && (
          <button className="add-button">
            <FaPlus /> Adicionar Horas
          </button>
        )}
      </div>

      <table className="pae-table">
        <thead>
          <tr>
            <th>RA</th>
            <th>Nome</th>
            <th>Modalidade</th>
            <th>Horas</th>
            <th>Último Treino</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {paeRecords.map(record => (
            <tr key={record.id}>
              <td>{record.ra}</td>
              <td>{record.name}</td>
              <td>{record.modality}</td>
              <td>{record.hours}</td>
              <td>{record.lastTraining}</td>
              <td>
                <button className="edit-button" title="Editar">
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaeHoursControl;