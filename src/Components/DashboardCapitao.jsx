import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import Footer from "./Layout/Footer";
import HeaderAdmin from "./Layout/HeaderAdmin";
import {
  FaUsers,
  FaGamepad,
  FaClock,
  FaTrophy,
  FaChartLine,
  FaCalendarCheck,
  FaUserCheck,
  FaPercentage
} from "react-icons/fa";
import "../styles/DashboardCapitao.css";
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
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';

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

const DashboardCapitao = () => {
  const navigate = useNavigate();
  const { accounts } = useMsal();

  const [captainData, setCaptainData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamTrainings, setTeamTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalTeamMembers: 0,
    totalTeamTrainings: 0,
    totalTeamPaeHours: 0,
    averageTeamPaeHours: 0,
    averageAttendance: 0,
    upcomingTrainings: 0,
    completedTrainings: 0,
    attendanceRate: 0
  });

  // Buscar dados do capitão logado
  useEffect(() => {
    const fetchCaptainData = async () => {
      if (accounts && accounts.length > 0) {
        const userEmail = accounts[0].username;
        try {
          const response = await fetch(`http://localhost:5000/api/users/email/${userEmail}`);
          if (response.ok) {
            const userData = await response.json();
            setCaptainData(userData);
            console.log("Dados do capitão:", userData);
          } else {
            setError("Erro ao buscar dados do capitão");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do capitão:", error);
          setError("Erro ao carregar dados");
        }
      }
    };

    fetchCaptainData();
  }, [accounts]);

  useEffect(() => {
    const loadTeamData = async () => {
      if (!captainData || !captainData.modality) return;

      try {
        setLoading(true);

        const [membersData, trainingsData] = await Promise.all([
          fetchMembers(),
          fetchTrainings()
        ]);

        // Filtrar apenas membros da mesma modalidade
        const modalityMembers = membersData.filter(member =>
          member.modality === captainData.modality
        );

        // Filtrar apenas treinos da mesma modalidade
        const modalityTrainings = trainingsData.filter(training =>
          training.modalityName === captainData.modality
        );

        setTeamMembers(modalityMembers);
        setTeamTrainings(modalityTrainings);

        // Calcular estatísticas da equipe
        const totalTeamPaeHours = modalityMembers.reduce((sum, member) => sum + (member.paeHours || 0), 0);
        const averageTeamPaeHours = modalityMembers.length > 0 ? (totalTeamPaeHours / modalityMembers.length).toFixed(1) : 0;

        // Estatísticas dos treinos
        const now = Date.now();
        const upcomingTrainings = modalityTrainings.filter(t =>
          new Date(t.startTimestamp || t.StartTimestamp).getTime() > now
        ).length;

        const completedTrainings = modalityTrainings.filter(t =>
          t.status === 'COMPLETED' || t.Status === 'COMPLETED'
        ).length;

        // Calcular taxa de presença média
        const totalAttendees = modalityTrainings.reduce((sum, training) => {
          return sum + (training.AttendedPlayers?.length || training.attendedPlayers?.length || 0);
        }, 0);

        const averageAttendance = modalityTrainings.length > 0 ?
          (totalAttendees / modalityTrainings.length).toFixed(1) : 0;

        const attendanceRate = modalityMembers.length > 0 && modalityTrainings.length > 0 ?
          ((totalAttendees / (modalityMembers.length * modalityTrainings.length)) * 100).toFixed(1) : 0;

        setStats({
          totalTeamMembers: modalityMembers.length,
          totalTeamTrainings: modalityTrainings.length,
          totalTeamPaeHours,
          averageTeamPaeHours,
          averageAttendance,
          upcomingTrainings,
          completedTrainings,
          attendanceRate
        });

        setError(null);
      } catch (err) {
        console.error("Erro ao carregar dados da equipe:", err);
        setError("Não foi possível carregar os dados da equipe.");
      } finally {
        setLoading(false);
      }
    };

    loadTeamData();
  }, [captainData]);

  // Gráfico de distribuição de horas PAE da equipe
  const getPaeDistributionData = () => {
    const ranges = ['0-10h', '11-20h', '21-30h', '31-40h', '40h+'];
    const counts = [0, 0, 0, 0, 0];

    teamMembers.forEach(member => {
      const hours = member.paeHours || 0;
      if (hours <= 10) counts[0]++;
      else if (hours <= 20) counts[1]++;
      else if (hours <= 30) counts[2]++;
      else if (hours <= 40) counts[3]++;
      else counts[4]++;
    });

    return {
      labels: ranges,
      datasets: [{
        data: counts,
        backgroundColor: [
          '#FF6B6B',
          '#FFE66D',
          '#4ECDC4',
          '#45B7D1',
          '#96CEB4'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }]
    };
  };

  // Gráfico de presença em treinos por membro
  const getAttendanceByMemberData = () => {
    const memberAttendance = teamMembers.map(member => {
      const attendedCount = teamTrainings.filter(training =>
        training.AttendedPlayers?.includes(member._id) ||
        training.attendedPlayers?.some(p =>
          (typeof p === 'string' ? p : p._id) === member._id
        )
      ).length;

      return {
        name: member.name.split(' ')[0], // Primeiro nome
        attendance: attendedCount
      };
    }).sort((a, b) => b.attendance - a.attendance);

    return {
      labels: memberAttendance.map(m => m.name),
      datasets: [{
        label: 'Treinos Participados',
        data: memberAttendance.map(m => m.attendance),
        backgroundColor: 'rgba(1, 204, 254, 0.6)',
        borderColor: '#01CCFE',
        borderWidth: 2
      }]
    };
  };

  // Gráfico de evolução dos treinos (últimos 6 meses simulado)
  const getTrainingEvolutionData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    // Simular crescimento de treinos ao longo dos meses
    const trainingCounts = [0, 2, 3, 5, 7, stats.totalTeamTrainings];

    return {
      labels: months,
      datasets: [{
        label: 'Treinos Realizados',
        data: trainingCounts,
        borderColor: '#01CCFE',
        backgroundColor: 'rgba(1, 204, 254, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    };
  };

  // Gráfico de status dos treinos
  const getTrainingStatusData = () => {
    const statusCount = {
      SCHEDULED: 0,
      RUNNING: 0,
      COMPLETED: 0,
      CANCELED: 0
    };

    teamTrainings.forEach(training => {
      const status = training.status || training.Status || 'SCHEDULED';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    return {
      labels: ['Agendados', 'Em Andamento', 'Finalizados', 'Cancelados'],
      datasets: [{
        data: [
          statusCount.SCHEDULED,
          statusCount.RUNNING,
          statusCount.COMPLETED,
          statusCount.CANCELED
        ],
        backgroundColor: [
          '#cbbb4d',
          '#388bfd',
          '#2ea043',
          '#f85149'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }]
    };
  };

  // Top 5 membros da equipe com mais horas PAE
  const getTopTeamMembers = () => {
    return [...teamMembers]
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

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e6edf3'
        }
      }
    }
  };

  if (!captainData) {
    return (
      <div className="dashboard-capitao-page">
        <HeaderAdmin />
        <main className="dashboard-main">
          <div className="loading">Carregando dados do capitão...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-capitao-page">
        <HeaderAdmin />
        <main className="dashboard-main">
          <div className="loading">Carregando dashboard da equipe...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-capitao-page">
        <HeaderAdmin />
        <main className="dashboard-main">
          <div className="error-message">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="dashboard-capitao-page">
      <HeaderAdmin />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>DASHBOARD DA EQUIPE</h1>
          <p>Estatísticas da modalidade: <strong>{captainData.modality}</strong></p>
          <p className="captain-name">Capitão: {captainData.name}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-info">
              <h3>{stats.totalTeamMembers}</h3>
              <p>Membros da Equipe</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <h3>{stats.totalTeamTrainings}</h3>
              <p>Treinos da Modalidade</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-info">
              <h3>{stats.totalTeamPaeHours}</h3>
              <p>Total Horas PAE</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>{stats.averageTeamPaeHours}</h3>
              <p>Média Horas PAE</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaUserCheck />
            </div>
            <div className="stat-info">
              <h3>{stats.averageAttendance}</h3>
              <p>Presença Média</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaTrophy />
            </div>
            <div className="stat-info">
              <h3>{stats.completedTrainings}</h3>
              <p>Treinos Finalizados</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaGamepad />
            </div>
            <div className="stat-info">
              <h3>{stats.upcomingTrainings}</h3>
              <p>Próximos Treinos</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaPercentage />
            </div>
            <div className="stat-info">
              <h3>{stats.attendanceRate}%</h3>
              <p>Taxa de Presença</p>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3>Distribuição de Horas PAE</h3>
            <div className="chart-wrapper">
              <Doughnut data={getPaeDistributionData()} options={pieOptions} />
            </div>
          </div>

          <div className="chart-container">
            <h3>Participação em Treinos por Membro</h3>
            <div className="chart-wrapper">
              <Bar data={getAttendanceByMemberData()} options={chartOptions} />
            </div>
          </div>

          <div className="chart-container">
            <h3>Evolução dos Treinos</h3>
            <div className="chart-wrapper">
              <Line data={getTrainingEvolutionData()} options={chartOptions} />
            </div>
          </div>

          <div className="chart-container">
            <h3>Status dos Treinos</h3>
            <div className="chart-wrapper">
              <Pie data={getTrainingStatusData()} options={pieOptions} />
            </div>
          </div>
        </div>

        {/* Ranking de membros da equipe */}
        <div className="ranking-section">
          <h3>Top 5 - Membros da Equipe com Mais Horas PAE</h3>
          <div className="ranking-table-container">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>POSIÇÃO</th>
                  <th>NOME</th>
                  <th>EMAIL</th>
                  <th>HORAS PAE</th>
                  <th>FUNÇÃO</th>
                </tr>
              </thead>
              <tbody>
                {getTopTeamMembers().map((member, index) => (
                  <tr key={member._id}>
                    <td className="position">#{index + 1}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
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

export default DashboardCapitao;