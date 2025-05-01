import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import '../../styles/Admin/Dashboard.css';
import ModalitiesList from './ModalitiesList';
import TrainingsList from '../Admin/TrainingList.jsx';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Você precisará implementar verificação real de autenticação
  const [activeTab, setActiveTab] = useState('modalities');
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-container">
      <Header />
      
      <div className="admin-content">
        <h1>Painel de Administração</h1>
        
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'modalities' ? 'active' : ''}`}
            onClick={() => setActiveTab('modalities')}
          >
            Modalidades
          </button>
          <button 
            className={`tab-button ${activeTab === 'trainings' ? 'active' : ''}`}
            onClick={() => setActiveTab('trainings')}
          >
            Treinos
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'modalities' && <ModalitiesList />}
          {activeTab === 'trainings' && <TrainingsList />}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;