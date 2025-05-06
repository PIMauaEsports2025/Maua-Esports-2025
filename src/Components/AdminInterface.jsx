import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/AdminInterface.css';

const AdminInterface = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    alert("Editar perfil clicado");
  };

  const handleLogout = () => {
    alert("Sair da conta clicado");
  };

  // Handles navigation to different sections
  const handleNavigation = (route) => {
    navigate(route);
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
          <img src="/maua-branco.png" alt="Mauá E-SPORTS" className="logo" />
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
          <button className="main-button" onClick={() => handleNavigation('/admin/membros')}>GERENCIAR MEMBROS</button>
          <button className="main-button" onClick={() => handleNavigation('/admin/admins')}>GERENCIAR ADMINS</button>
          <button className="main-button" onClick={() => handleNavigation('/admin/horas-pae')}>CONSULTAR HORAS PAE</button>
          <button className="main-button" onClick={() => handleNavigation('/gerenciar-modalidades')}>GERENCIAR MODALIDADES</button>
          <button className="main-button" onClick={() => handleNavigation('/admin/times')}>GERENCIAR TIMES</button>
        </div>
      </main>
    </div>
  );
};

export default AdminInterface;
