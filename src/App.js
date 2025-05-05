import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Times from './Components/Times';
import LoginRegister from './Components/LoginRegister';
import AdminInterface from './Components/AdminInterface';
import Sobre from './Components/Sobre';
import Contato from './Components/Contact';
import DashBoard from './Components/Admin/DashBoard';
import NotificationManager from './Components/UI/NotificationManager';
import Contact from './Components/Contact';

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
        <Route path="/times" element={<Times />} />
        <Route path="/admin" element={<AdminInterface />} />
        <Route path="/contato" element={<Contact />} />
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