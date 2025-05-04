"use client";

import React from "react";
import '../styles/AdminInterface.css';
import Footer from './Layout/Footer.jsx';

const AdminInterface = () => {
    return (
      <div className="admin-container">
        <header className="top-header">
          <div className="logo-section">
            <img src="/logo-maua.png" alt="Mauá E-SPORTS" className="logo" />
            <h1 className="title">E-SPORTS</h1>
          </div>
          <div className="user-section">
            <span>Bem vindo, Mateus Martins</span>
            <span className="dropdown">▼</span>
          </div>
        </header>
  
        <main className="main-panel">
          <div className="button-panel">
            <button className="main-button">GERENCIAR MEMBROS</button>
            <button className="main-button">GERENCIAR ADMINS</button>
            <button className="main-button">CONSULTAR HORAS PAE</button>
            <button className="main-button">GERENCIAR MODALIDADES</button>
            <button className="main-button">GERENCIAR TIMES</button>
          </div>
        </main>
        <Footer />
      </div>
    );
  };
  
  export default AdminInterface;
  
