import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CaptainInterface.css";
import {
  FaUserCog,
  FaSignOutAlt,
  FaClock,
  FaCalendarAlt,
  FaChevronRight,
} from "react-icons/fa";
import Footer from "./Layout/Footer";

const CaptainInterface = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  // Simulação de dados do usuário capitão (em uma aplicação real, viria do contexto de autenticação)
  const userInfo = {
    name: "Capitão LEOZIN",
    modality: "Counter-Strike 2"
  };

  const handleEditProfile = () => {
    alert("Editar perfil clicado");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
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
    <div className="captain-container">
      <header className="top-header">
        <div className="logo-section" onClick={() => navigate("/captain")}>
          <img src="/maua-branco.png" alt="Mauá E-SPORTS" className="logo" />
          <h1 className="title">E-SPORTS</h1>
        </div>

        {/* Wrapper com clique e ref para detectar clique fora */}
        <div className="user-dropdown-wrapper" ref={dropdownRef}>
          <div
            className="user-section"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span>Bem vindo, {userInfo.name}</span>
            <span className="dropdown">▼</span>
          </div>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleEditProfile}>
                <FaUserCog /> Editar Perfil
              </button>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Sair da Conta
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="main-panel">
        <div className="button-panel">
          <div className="captain-greeting">
            <h2>Painel do Capitão</h2>
            <p>Gerenciando a equipe de {userInfo.modality}</p>
          </div>

          <button
            className="main-button"
            onClick={() => handleNavigation("/consultar-horas-equipe")}
          >
            <span className="button-icon">
              <FaClock />
            </span>
            <span className="button-text">CONSULTAR HORAS PAE DA EQUIPE</span>
            <span className="button-arrow">
              <FaChevronRight />
            </span>
          </button>

          <button
            className="main-button"
            onClick={() => handleNavigation("/gerenciar-treinos-equipe")}
          >
            <span className="button-icon">
              <FaCalendarAlt />
            </span>
            <span className="button-text">GERENCIAR TREINOS DA EQUIPE</span>
            <span className="button-arrow">
              <FaChevronRight />
            </span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaptainInterface;