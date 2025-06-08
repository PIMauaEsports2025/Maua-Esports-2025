import React, { useState, useEffect } from "react";
import "../styles/PainelUsuario.css";
import Footer from "./Layout/Footer";
import { 
  FaUser, 
  FaEnvelope, 
  FaGamepad, 
  FaClock, 
  FaCalendarCheck,
  FaTrophy,
  FaChartLine,
  FaCalendarAlt
} from "react-icons/fa";
import { fetchMembers } from "../Service/memberApi.js";
import { fetchTrainings } from "../Service/trainingApi.js";
import { fetchExternalModalities } from "../Service/trainingApi.js";

const PainelUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalTreinos: 0,
    treinosParticipados: 0,
    proximosTreinos: 0,
    horasPAE: 0
  });

  // ID do usuário (em uma aplicação real, viria do contexto de autenticação)
  const USUARIO_ID = "Gustavo Seripierri da Conceição";

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        
        // Carregar dados em paralelo
        const [membersData, trainingsData, modalitiesData] = await Promise.all([
          fetchMembers(),
          fetchTrainings(),
          fetchExternalModalities()
        ]);

        // Encontrar o usuário específico
        const currentUser = membersData.find(member => 
          member.name === USUARIO_ID || member.name.includes("Gustavo")
        );

        if (!currentUser) {
          // Se não encontrar, criar usuário mockado
          const mockUser = {
            _id: "mock-gustavo",
            name: "Gustavo Seripierri da Conceição",
            email: "24.00630-0@maua.br",
            modality: "Counter-Strike: Global Offensive A",
            paeHours: 42,
            role: "member"
          };
          setUsuario(mockUser);
        } else {
          setUsuario(currentUser);
        }

        // Converter modalidades para array
        const modalitiesArray = Object.values(modalitiesData).map(mod => ({
          _id: mod._id,
          Name: mod.Name,
          Tag: mod.Tag,
        }));
        setModalities(modalitiesArray);

        // Filtrar treinos do usuário (simulando participação)
        const userTrainings = trainingsData.filter(training => {
          // Simular que o usuário participa de treinos de CS2
          return training.ModalityId === "641246ec14a24f13c339bb1f" || 
                 training.modalityName?.includes("Counter-Strike");
        });

        setTrainings(userTrainings);

        // Calcular estatísticas
        const now = Date.now();
        const proximosTreinos = userTrainings.filter(t => 
          new Date(t.startTimestamp || t.StartTimestamp).getTime() > now
        ).length;

        const treinosParticipados = userTrainings.filter(t => 
          t.AttendedPlayers?.includes(currentUser?._id) || 
          Math.random() > 0.3 // Simular participação
        ).length;

        setStats({
          totalTreinos: userTrainings.length,
          treinosParticipados,
          proximosTreinos,
          horasPAE: currentUser?.paeHours || 42
        });

        setError(null);
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
        setError("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const formatarData = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      SCHEDULED: { label: "Agendado", class: "scheduled" },
      RUNNING: { label: "Em Andamento", class: "running" },
      COMPLETED: { label: "Finalizado", class: "completed" },
      CANCELED: { label: "Cancelado", class: "canceled" }
    };
    return statusMap[status] || { label: status, class: "unknown" };
  };

  if (loading) {
    return (
      <div className="user-panel-page">
        <header className="top-header">
          <div className="logo-section">
            <img src="/maua-branco.png" alt="Mauá E-SPORTS" className="logo" />
            <h1 className="title">Painel do Usuário</h1>
          </div>
        </header>
        <main className="user-main">
          <div className="loading">Carregando seus dados...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-panel-page">
        <header className="top-header">
          <div className="logo-section">
            <img src="/maua-branco.png" alt="Mauá E-SPORTS" className="logo" />
            <h1 className="title">Painel do Usuário</h1>
          </div>
        </header>
        <main className="user-main">
          <div className="error-message">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="user-panel-page">
      <header className="top-header">
        <div className="logo-section">
          <img src="/maua-branco.png" alt="Mauá E-SPORTS" className="logo" />
          <h1 className="title">Painel do Usuário</h1>
        </div>
      </header>

      <main className="user-main">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="user-welcome">
            <div className="user-avatar">
              <FaUser size={40} />
            </div>
            <div className="user-info">
              <h2>Bem-vindo, {usuario.name}!</h2>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="user-stats-grid">
          <div className="user-stat-card">
            <div className="stat-icon">
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <h3>{stats.totalTreinos}</h3>
              <p>Treinos Disponíveis</p>
            </div>
          </div>
          
          <div className="user-stat-card">
            <div className="stat-icon">
              <FaTrophy />
            </div>
            <div className="stat-info">
              <h3>{stats.treinosParticipados}</h3>
              <p>Treinos Participados</p>
            </div>
          </div>
          
          <div className="user-stat-card">
            <div className="stat-icon">
              <FaCalendarAlt />
            </div>
            <div className="stat-info">
              <h3>{stats.proximosTreinos}</h3>
              <p>Próximos Treinos</p>
            </div>
          </div>
          
          <div className="user-stat-card">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-info">
              <h3>{stats.horasPAE}h</h3>
              <p>Horas PAE</p>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="user-info-section">
          <h3>Minhas Informações</h3>
          <div className="info-cards-grid">
            <div className="info-card">
              <div className="info-icon">
                <FaUser />
              </div>
              <div className="info-content">
                <label>Nome Completo</label>
                <p>{usuario.name}</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div className="info-content">
                <label>Email Institucional</label>
                <p>{usuario.email}</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaGamepad />
              </div>
              <div className="info-content">
                <label>Modalidade</label>
                <p>{usuario.modality}</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaClock />
              </div>
              <div className="info-content">
                <label>Horas PAE Acumuladas</label>
                <p>{usuario.paeHours || 0} horas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Training Schedule Section */}
        <div className="training-section">
          <h3>Meus Treinos</h3>
          {trainings.length > 0 ? (
            <div className="training-table-container">
              <table className="training-table">
                <thead>
                  <tr>
                    <th>MODALIDADE</th>
                    <th>DATA/HORA</th>
                    <th>STATUS</th>
                    <th>DURAÇÃO</th>
                    <th>PARTICIPANTES</th>
                  </tr>
                </thead>
                <tbody>
                  {trainings.map((training) => {
                    const modalityInfo = modalities.find(m => m._id === training.ModalityId);
                    const statusInfo = getStatusBadge(training.Status);
                    const startTime = new Date(training.StartTimestamp || training.startTimestamp);
                    const endTime = new Date(training.EndTimestamp || training.endTimestamp);
                    const duration = Math.round((endTime - startTime) / (1000 * 60 * 60 * 100)) / 10; // hours with 1 decimal
                    
                    return (
                      <tr key={training._id}>
                        <td>
                          <span className="modalidade-tag">
                            {modalityInfo?.Tag || 'CSA'}
                          </span>
                          {modalityInfo?.Name || 'Counter-Strike: Global Offensive A'}
                        </td>
                        <td>{formatarData(training.StartTimestamp || training.startTimestamp)}</td>
                        <td>
                          <span className={`status-badge ${statusInfo.class}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td>{duration}h</td>
                        <td>{training.AttendedPlayers?.length || 0} pessoas</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-trainings">
              <FaCalendarAlt size={48} />
              <h4>Nenhum treino encontrado</h4>
              <p>Você ainda não está inscrito em nenhum treino.</p>
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <h3>Seu Progresso</h3>
          <div className="progress-cards">
            <div className="progress-card">
              <div className="progress-header">
                <h4>Meta de Horas PAE</h4>
                <span className="progress-percentage">
                  {Math.min(100, Math.round((stats.horasPAE / 40) * 100))}%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${Math.min(100, (stats.horasPAE / 40) * 100)}%`}}
                ></div>
              </div>
              <p>{stats.horasPAE} de 40 horas completadas</p>
            </div>

            <div className="progress-card">
              <div className="progress-header">
                <h4>Participação em Treinos</h4>
                <span className="progress-percentage">
                  {stats.totalTreinos > 0 ? Math.round((stats.treinosParticipados / stats.totalTreinos) * 100) : 0}%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill participation" 
                  style={{width: `${stats.totalTreinos > 0 ? (stats.treinosParticipados / stats.totalTreinos) * 100 : 0}%`}}
                ></div>
              </div>
              <p>{stats.treinosParticipados} de {stats.totalTreinos} treinos participados</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PainelUsuario;
