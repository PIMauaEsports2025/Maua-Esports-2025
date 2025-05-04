import React, { useState, useRef, useEffect } from "react";
import '../styles/AdminInterface.css';
import Footer from './Layout/Footer.jsx';

const AdminInterface = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleEditProfile = () => {
    alert("Editar perfil clicado");
  };

  const handleLogout = () => {
    alert("Sair da conta clicado");
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="admin-container">
      <header className="top-header">
        <div className="logo-section">
          <img src="/logo-maua.png" alt="Mauá E-SPORTS" className="logo" />
          <h1 className="title">E-SPORTS</h1>
        </div>

        {/* Wrapper com clique e ref para detectar clique fora */}
        <div
          className="user-dropdown-wrapper"
          ref={dropdownRef}
        >
          <div className="user-section" onClick={() => setIsDropdownOpen((prev) => !prev)}>
            <span>Bem vindo, Mateus Martins</span>
            <span className="dropdown">▼</span>
          </div>

          {isDropdownOpen && (
            <div
              className="dropdown-menu hover-buffer"
              onMouseLeave={() => {
                setTimeout(() => setIsDropdownOpen(false), 300);
              }}
            >
              <button onClick={handleEditProfile}>Editar Perfil</button>
              <button onClick={handleLogout}>Sair da Conta</button>
            </div>
          )}
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
