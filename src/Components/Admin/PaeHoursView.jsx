import React, { useState, useEffect } from 'react';
import { FaHistory } from 'react-icons/fa';
import '../../styles/Admin/PaeHoursView.css';

const PaeHoursView = () => {
  const [paeData, setPaeData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPaeData = async () => {
      try {
        setLoading(true);
        // Dados mockados temporários
        const mockUserData = {
          ra: "22.02345-6",
          name: "Pedro Santos",
          modality: "VALORANT",
          hours: 8,
          totalTrainings: 12
        };
        
        const mockHistory = [
          { date: "2025-04-29", hours: 2, description: "Treino tático" },
          { date: "2025-04-22", hours: 2, description: "Treino de mecânicas" },
          { date: "2025-04-15", hours: 2, description: "Treino com time" },
          { date: "2025-04-08", hours: 2, description: "Análise de partidas" }
        ];
        
        setPaeData(mockUserData);
        setHistory(mockHistory);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar dados PAE');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPaeData();
  }, []);

  if (loading) return <div className="loading">Carregando suas horas PAE...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!paeData) return <div className="error">Nenhum dado encontrado</div>;

  return (
    <div className="pae-view-container">
      <div className="pae-summary">
        <div className="pae-user-info">
          <h2>{paeData.name}</h2>
          <p>RA: {paeData.ra}</p>
          <p>Modalidade: {paeData.modality}</p>
        </div>
        
        <div className="pae-stats">
          <div className="pae-stat-item">
            <span className="stat-value">{paeData.hours}</span>
            <span className="stat-label">Horas PAE</span>
          </div>
          <div className="pae-stat-item">
            <span className="stat-value">{paeData.totalTrainings}</span>
            <span className="stat-label">Treinos</span>
          </div>
        </div>
      </div>
      
      <div className="pae-history">
        <h3>Histórico de Horas</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Horas</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.hours}</td>
                <td>{entry.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaeHoursView;