import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
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
  const { accounts } = useMsal();
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
  useEffect(() => {
    const loadUserData = async () => {
      if (!accounts || accounts.length === 0) {
        setError("Usuário não autenticado");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Buscar dados do usuário logado
        const userEmail = accounts[0].username;
        console.log("Email do usuário logado:", userEmail);

        // Buscar dados do usuário no banco
        let currentUser = null;
        try {
          const response = await fetch(`http://localhost:5000/api/users/email/${userEmail}`);
          if (response.ok) {
            currentUser = await response.json();
            console.log("Dados do usuário encontrados:", currentUser);
          } else {
            console.log("Usuário não encontrado no banco de dados");
          }
        } catch (fetchError) {
          console.error("Erro ao buscar dados do usuário:", fetchError);
        }

        // Se não encontrou no banco, criar usuário com dados básicos do MSAL
        if (!currentUser) {
          currentUser = {
            _id: `temp-${userEmail}`,
            name: accounts[0].name || "Usuário",
            email: userEmail,
            modality: "Não definida",
            paeHours: 0,
            role: "member"
          };
        }

        setUsuario(currentUser);

        // Carregar dados adicionais
        const [trainingsData, modalitiesData] = await Promise.all([
          fetchTrainings(),
          fetchExternalModalities()
        ]);

        // Converter modalidades para array
        const modalitiesArray = Object.values(modalitiesData).map(mod => ({
          _id: mod._id,
          Name: mod.Name,
          Tag: mod.Tag,
        }));
        setModalities(modalitiesArray);        // Filtrar treinos do usuário pela modalidade
        let userTrainings = [];
        if (currentUser.modality && currentUser.modality !== "Não definida") {
          userTrainings = trainingsData.filter(training => {
            // Filtrar apenas treinos da modalidade exata do usuário
            return training.modalityName === currentUser.modality ||
                   training.ModalityName === currentUser.modality ||
                   (training.modalityId && currentUser.modalityId && training.modalityId === currentUser.modalityId);
          });
          
          console.log(`Treinos filtrados para modalidade "${currentUser.modality}":`, userTrainings);
        } else {
          console.log("Usuário não tem modalidade definida, não mostrando treinos");
        }

        setTrainings(userTrainings);

        // Calcular estatísticas baseadas apenas nos treinos da modalidade do usuário
        const now = Date.now();
        const proximosTreinos = userTrainings.filter(t => {
          const trainingDate = new Date(t.startTimestamp || t.StartTimestamp).getTime();
          return trainingDate > now;
        }).length;

        // Verificar participação do usuário nos treinos
        const treinosParticipados = userTrainings.filter(t => {
          if (t.AttendedPlayers && Array.isArray(t.AttendedPlayers)) {
            return t.AttendedPlayers.includes(currentUser._id);
          }
          if (t.attendedPlayers && Array.isArray(t.attendedPlayers)) {
            return t.attendedPlayers.some(p => 
              (typeof p === 'string' ? p : p._id) === currentUser._id
            );
          }
          return false;
        }).length;

        setStats({
          totalTreinos: userTrainings.length,
          treinosParticipados,
          proximosTreinos,
          horasPAE: currentUser.paeHours || 0
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
  }, [accounts]);

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

  if (!usuario) {
    return (
      <div className="user-panel-page">
        <header className="top-header">
          <div className="logo-section">
            <img src="/maua-branco.png" alt="Mauá E-SPORTS" className="logo" />
            <h1 className="title">Painel do Usuário</h1>
          </div>
        </header>
        <main className="user-main">
          <div className="loading">Carregando dados do usuário...</div>
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
        </div>        {/* Stats Cards */}
        <div className="user-stats-grid">
          <div className="user-stat-card">
            <div className="stat-icon">
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <h3>{stats.totalTreinos}</h3>
              <p>Treinos da Modalidade</p>
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
        </div>        {/* Training Schedule Section */}
        <div className="training-section">
          <h3>Treinos da Minha Modalidade</h3>
          {usuario.modality !== "Não definida" && (
            <p style={{ color: '#8b949e', marginBottom: '20px', textAlign: 'center' }}>
              Exibindo treinos da modalidade: <strong style={{ color: '#01CCFE' }}>{usuario.modality}</strong>
            </p>
          )}
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
                </thead>                <tbody>
                  {trainings.map((training) => {
                    // Buscar informações da modalidade
                    const modalityInfo = modalities.find(m => 
                      m._id === training.modalityId || 
                      m.Name === training.modalityName
                    );
                    
                    // Determinar status
                    const status = training.status || training.Status || "SCHEDULED";
                    const statusInfo = getStatusBadge(status);
                    
                    // Calcular duração
                    const startTime = new Date(training.StartTimestamp || training.startTimestamp);
                    const endTime = new Date(training.EndTimestamp || training.endTimestamp);
                    const durationMs = endTime.getTime() - startTime.getTime();
                    const duration = Math.round(durationMs / (1000 * 60 * 60) * 10) / 10; // hours with 1 decimal
                    
                    // Verificar se o usuário está participando deste treino
                    const isParticipating = training.AttendedPlayers?.includes(usuario._id) ||
                      training.attendedPlayers?.some(p => 
                        (typeof p === 'string' ? p : p._id) === usuario._id
                      );
                    
                    return (
                      <tr key={training._id} style={{ backgroundColor: isParticipating ? 'rgba(1, 204, 254, 0.1)' : 'transparent' }}>
                        <td>
                          <span className="modalidade-tag">
                            {modalityInfo?.Tag || training.modalityTag || 'MOD'}
                          </span>
                          {modalityInfo?.Name || training.modalityName || usuario.modality}
                          {isParticipating && (
                            <span style={{ 
                              marginLeft: '10px', 
                              backgroundColor: '#01CCFE', 
                              color: '#0B060F', 
                              padding: '2px 6px', 
                              borderRadius: '4px', 
                              fontSize: '0.7rem', 
                              fontWeight: '600' 
                            }}>
                              Participando
                            </span>
                          )}
                        </td>
                        <td>{formatarData(training.StartTimestamp || training.startTimestamp)}</td>
                        <td>
                          <span className={`status-badge ${statusInfo.class}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td>{duration > 0 ? `${duration}h` : '2h'}</td>
                        <td>
                          {training.AttendedPlayers?.length || 
                           training.attendedPlayers?.length || 
                           0} pessoas
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>          ) : (
            <div className="no-trainings">
              <FaCalendarAlt size={48} />
              <h4>Nenhum treino encontrado</h4>
              {usuario.modality === "Não definida" ? (
                <p>Você precisa ser adicionado a uma modalidade para ver treinos.</p>
              ) : (
                <p>Não há treinos programados para sua modalidade ({usuario.modality}).</p>
              )}
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
