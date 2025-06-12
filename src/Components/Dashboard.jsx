import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Layout/Footer";
import HeaderAdmin from "./Layout/HeaderAdmin";
import {
  FaUsers,
  FaGamepad,
  FaClock,
  FaTrophy,
  FaChartLine,
  FaCalendarCheck,
  FaUserTie
} from "react-icons/fa";
import "../styles/Dashboard.css";
import { fetchMembers } from "../Service/memberApi.js";
import { fetchExternalModalities } from "../Service/trainingApi.js";
import { fetchTrainings } from "../Service/trainingApi.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const navigate = useNavigate(); const [members, setMembers] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalModalities: 0,
    totalPaeHours: 0,
    averagePaeHours: 0,
    adminsCount: 0,
    captainsCount: 0,
    membersCount: 0,
    totalTrainings: 0,
    averageAttendance: 0
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true); const [membersData, modalitiesData, trainingsData] = await Promise.all([
          fetchMembers(),
          fetchExternalModalities(),
          fetchTrainings()
        ]);

        setMembers(membersData);
        const modalitiesArray = Object.values(modalitiesData).map(mod => ({
          _id: mod._id,
          Name: mod.Name,
          Tag: mod.Tag,
        }));
        setModalities(modalitiesArray);
        setTrainings(trainingsData);

        const totalPaeHours = membersData.reduce((sum, member) => sum + (member.paeHours || 0), 0);
        const captainsCount = membersData.filter(member => member.role === 'captain').length;
        const adminsCount = membersData.filter(member => member.role === 'admin').length;
        const membersCount = membersData.filter(member => member.role === 'member').length;
        // Calcular estatísticas de treinos
        const totalAttendees = trainingsData.reduce((sum, training) => {
          const attendeesCount = training.AttendedPlayers ? training.AttendedPlayers.length : 0;
          console.log(`Treino ${training._id}: ${attendeesCount} participantes`);
          return sum + attendeesCount;
        }, 0);

        const averageAttendance = trainingsData.length > 0 ?
          (totalAttendees / trainingsData.length).toFixed(1) : 0;

        setStats({
          totalMembers: membersData.length,
          totalModalities: Object.keys(modalitiesData).length,
          totalPaeHours,
          averagePaeHours: membersData.length > 0 ? (totalPaeHours / membersData.length).toFixed(1) : 0,
          captainsCount,
          adminsCount,
          membersCount,
          totalTrainings: trainingsData.length,
          averageAttendance
        });

        setError(null);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Não foi possível carregar os dados do dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Dados para gráfico de distribuição por modalidade
  const getModalityDistributionData = () => {
    const modalityCount = {};
    members.forEach(member => {
      if (member.modality) {
        modalityCount[member.modality] = (modalityCount[member.modality] || 0) + 1;
      }
    });

    return {
      labels: Object.keys(modalityCount),
      datasets: [{
        data: Object.values(modalityCount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF',
          '#4BC0C0',
          '#FF6384'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }]
    };
  };
  // Dados para ranking de horas PAE por modalidade
  const getPaeHoursByModalityData = () => {
    const modalityHours = {};
    members.forEach(member => {
      if (member.modality) {
        if (!modalityHours[member.modality]) {
          modalityHours[member.modality] = [];
        }
        modalityHours[member.modality].push(member.paeHours || 0);
      }
    });

    const modalityAverages = {};
    const modalityTags = {};
    Object.keys(modalityHours).forEach(modality => {
      const hours = modalityHours[modality];
      modalityAverages[modality] = hours.reduce((sum, h) => sum + h, 0) / hours.length;

      // Buscar a tag correspondente da modalidade
      const modalityData = modalities.find(mod => mod.Name === modality);
      modalityTags[modality] = modalityData ? modalityData.Tag : modality;
    });

    return {
      labels: Object.keys(modalityAverages).map(modality => modalityTags[modality]),
      datasets: [{
        label: 'Média de Horas PAE',
        data: Object.values(modalityAverages),
        backgroundColor: 'rgba(1, 204, 254, 0.6)',
        borderColor: '#01CCFE',
        borderWidth: 2
      }]
    };
  };

  const getEvolutionData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    const memberGrowth = [0, 4, 7, 7, 10, stats.totalMembers];

    return {
      labels: months,
      datasets: [{
        label: 'Crescimento de Membros',
        data: memberGrowth,
        borderColor: '#01CCFE',
        backgroundColor: 'rgba(1, 204, 254, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    };
  };

  // Dados para gráfico de dispersão
  const getScatterData = () => {
    const scatterData = members.map((member, index) => ({
      x: member.paeHours || 0,
      y: index + 1
    }));

    return {
      datasets: [{
        label: 'Horas PAE vs Membro',
        data: scatterData,
        backgroundColor: 'rgba(1, 204, 254, 0.6)',
        borderColor: '#01CCFE',
        borderWidth: 1
      }]
    };
  };

  // Top 5 membros com mais horas PAE
  const getTopMembers = () => {
    return [...members]
      .sort((a, b) => (b.paeHours || 0) - (a.paeHours || 0))
      .slice(0, 5);
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e6edf3'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#8b949e'
        },
        grid: {
          color: '#30363d'
        }
      },
      y: {
        ticks: {
          color: '#8b949e'
        },
        grid: {
          color: '#30363d'
        }
      }
    }
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e6edf3'
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Horas PAE',
          color: '#e6edf3',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#8b949e'
        },
        grid: {
          color: '#30363d'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Número do Membro',
          color: '#e6edf3',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: '#8b949e'
        },
        grid: {
          color: '#30363d'
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <HeaderAdmin />
        <main className="dashboard-main">
          <div className="loading">Carregando dashboard...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <HeaderAdmin />
        <main className="dashboard-main">
          <div className="error-message">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <HeaderAdmin />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>DASHBOARD</h1>
          <p>Estatísticas e análises da Mauá E-Sports</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-info">
              <h3>{stats.totalMembers}</h3>
              <p>Total de Membros</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaGamepad />
            </div>
            <div className="stat-info">
              <h3>{stats.totalModalities}</h3>
              <p>Modalidades Ativas</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-info">
              <h3>{stats.totalPaeHours}</h3>
              <p>Total Horas PAE</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>{stats.averagePaeHours}</h3>
              <p>Média Horas PAE</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaTrophy />
            </div>
            <div className="stat-info">
              <h3>{stats.captainsCount}</h3>
              <p>Capitães</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaUserTie />
            </div>
            <div className="stat-info">
              <h3>{stats.adminsCount}</h3>
              <p>Administradores</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <h3>{stats.totalTrainings}</h3>
              <p>Treinos Realizados</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-info">
              <h3>{stats.averageAttendance}</h3>
              <p>Média de Presença</p>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3>Distribuição por Modalidade</h3>
            <div className="chart-wrapper">
              <Pie data={getModalityDistributionData()} options={chartOptions} />
            </div>
          </div>

          <div className="chart-container">
            <h3>Média de Horas PAE por Modalidade</h3>
            <div className="chart-wrapper">
              <Bar data={getPaeHoursByModalityData()} options={chartOptions} />
            </div>
          </div>

          <div className="chart-container">
            <h3>Evolução de Membros</h3>
            <div className="chart-wrapper">
              <Line data={getEvolutionData()} options={chartOptions} />
            </div>
          </div>
          <div className="chart-container">
            <h3>Dispersão de Horas PAE</h3>
            <div className="chart-wrapper">
              <Scatter data={getScatterData()} options={scatterOptions} />
            </div>
          </div>
        </div>

        {/* Ranking de membros */}
        <div className="ranking-section">
          <h3>Top 5 - Membros com Mais Horas PAE</h3>
          <div className="ranking-table-container">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>POSIÇÃO</th>
                  <th>NOME</th>
                  <th>MODALIDADE</th>
                  <th>HORAS PAE</th>
                  <th>FUNÇÃO</th>
                </tr>
              </thead>
              <tbody>
                {getTopMembers().map((member, index) => (
                  <tr key={member._id}>
                    <td className="position">#{index + 1}</td>
                    <td>{member.name}</td>
                    <td>{member.modality || '-'}</td>
                    <td className="hours">{member.paeHours || 0}h</td>
                    <td>
                      <span className={`role-badge ${member.role}`}>
                        {member.role === 'captain' ? 'Capitão' :
                          member.role === 'admin' ? 'Admin' : 'Membro'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;