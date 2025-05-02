import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus, FaUserPlus } from 'react-icons/fa';
import '../../styles/Admin/TeamManagement.css';

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTeams = async () => {
      try {
        setLoading(true);
        // Dados mockados temporários
        const mockData = [
          { 
            id: 1, 
            name: "MAUÁ CS2 A", 
            modality: "CS2",
            members: [
              { ra: "24.00123-4", name: "João Silva", role: "Capitão" },
              { ra: "23.01234-5", name: "Ana Paula", role: "Awper" },
              { ra: "22.02345-6", name: "Carlos Eduardo", role: "Rifler" },
              { ra: "21.03456-7", name: "Rafaela Santos", role: "Entry" },
              { ra: "20.04567-8", name: "Marcos Lima", role: "Support" }
            ]
          },
          { 
            id: 2, 
            name: "MAUÁ LOL BLUE", 
            modality: "LOL",
            members: [
              { ra: "23.01234-5", name: "Maria Costa", role: "Capitã" },
              { ra: "22.12345-6", name: "Felipe Torres", role: "Top" },
              { ra: "21.23456-7", name: "Bruno Oliveira", role: "Jungle" },
              { ra: "20.34567-8", name: "Juliana Pereira", role: "Mid" },
              { ra: "19.45678-9", name: "Leonardo Gomes", role: "ADC" }
            ]
          }
        ];
        
        setTeams(mockData);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar times');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTeams();
  }, []);

  if (loading) return <div className="loading">Carregando times...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="teams-container">
      <div className="teams-header">
        <h2>Gerenciar Times</h2>
        <button className="add-button">
          <FaPlus /> Novo Time
        </button>
      </div>

      {teams.map(team => (
        <div key={team.id} className="team-card">
          <div className="team-header">
            <h3>{team.name}</h3>
            <span className="modality-badge">{team.modality}</span>
            <div className="team-actions">
              <button className="edit-button" title="Editar Time">
                <FaEdit />
              </button>
              <button className="add-member-button" title="Adicionar Membro">
                <FaUserPlus />
              </button>
            </div>
          </div>
          
          <div className="team-members">
            <table className="members-table">
              <thead>
                <tr>
                  <th>RA</th>
                  <th>Nome</th>
                  <th>Função</th>
                </tr>
              </thead>
              <tbody>
                {team.members.map((member, index) => (
                  <tr key={index}>
                    <td>{member.ra}</td>
                    <td>{member.name}</td>
                    <td>{member.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamManagement;