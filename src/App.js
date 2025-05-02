import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import LoginRegister from './Components/LoginRegister';
import Sobre from './Components/Sobre';
import DashBoard from './Components/Admin/DashBoard';
import NotificationManager from './Components/UI/NotificationManager';

// Função para verificar se usuário está autenticado
const isAuthenticated = () => {
  // Implemente sua verificação real de autenticação aqui
  return localStorage.getItem('token') !== null;
};

// Componente para proteger rotas
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <NotificationManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;