import React, { useState, useEffect } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import '../../styles/Admin/Dashboard.css';
import ModalitiesList from './ModalitiesList';
import TrainingsList from './TrainingList';
import UserManagement from './UserManagement'; // Novo componente
import PaeHoursControl from './PaeHoursControl'; // Novo componente
import PaeHoursView from './PaeHoursView'; // Novo componente
import TeamManagement from './TeamManagement'; // Novo componente

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const [activeTab, setActiveTab] = useState('');
  
  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (token) {
      setUserRole(role || '');
      
      // Definir aba inicial com base na hierarquia
      if (role === 'admin') setActiveTab('modalities');
      else if (role === 'captain') setActiveTab('teams');
      else setActiveTab('paeHours');
    }
  }, []);

  return (
    <div className="admin-container">
      <Header />
      
      <div className="admin-content">
        <h1>Painel de {userRole === 'admin' ? 'Administração' : 
                      userRole === 'captain' ? 'Capitão' : 'Membro'}</h1>
        
        <div className="admin-tabs">
          {/* Abas para Administradores */}
          {userRole === 'admin' && (
            <>
              <button 
                className={`tab-button ${activeTab === 'modalities' ? 'active' : ''}`}
                onClick={() => setActiveTab('modalities')}
              >
                Modalidades
              </button>
              <button 
                className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                Usuários
              </button>
              <button 
                className={`tab-button ${activeTab === 'trainings' ? 'active' : ''}`}
                onClick={() => setActiveTab('trainings')}
              >
                Treinos
              </button>
              <button 
                className={`tab-button ${activeTab === 'paeControl' ? 'active' : ''}`}
                onClick={() => setActiveTab('paeControl')}
              >
                Controle PAE
              </button>
            </>
          )}
          
          {/* Abas para Capitães */}
          {userRole === 'captain' && (
            <>
              <button 
                className={`tab-button ${activeTab === 'teams' ? 'active' : ''}`}
                onClick={() => setActiveTab('teams')}
              >
                Times
              </button>
              <button 
                className={`tab-button ${activeTab === 'trainings' ? 'active' : ''}`}
                onClick={() => setActiveTab('trainings')}
              >
                Treinos
              </button>
              <button 
                className={`tab-button ${activeTab === 'paeControl' ? 'active' : ''}`}
                onClick={() => setActiveTab('paeControl')}
              >
                Controle PAE
              </button>
            </>
          )}
          
          {/* Abas para Membros */}
          {userRole === 'member' && (
            <button 
              className={`tab-button active`}
              onClick={() => setActiveTab('paeHours')}
            >
              Minhas Horas PAE
            </button>
          )}
        </div>
        
        <div className="tab-content">
          {/* Conteúdo das abas */}
          {activeTab === 'modalities' && <ModalitiesList />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'trainings' && <TrainingsList />}
          {activeTab === 'teams' && <TeamManagement />}
          {activeTab === 'paeControl' && <PaeHoursControl />}
          {activeTab === 'paeHours' && <PaeHoursView />}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;