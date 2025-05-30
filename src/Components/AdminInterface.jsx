import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminInterface.css";
import {
  FaSignOutAlt,
  FaUsers,
  FaClock,
  FaGamepad,
  FaCalendarAlt,
  FaChevronRight,
  FaEdit,
  FaChartBar,
} from "react-icons/fa";
import { useMsal, useAccount } from "@azure/msal-react";
import Footer from "./Layout/Footer";

const AdminInterface = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || null);

  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
  }, [account, navigate]);

  const handleLogout = () => {
    try {
      instance.logoutRedirect({
        postLogoutRedirectUri: "http://localhost:3000",
      });

      // Não precisa de navigate, pois o logoutRedirect cuida do redirecionamento
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

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

  if (!account) {
    return null;
  }

  return (
    <div className="admin-container">
      <header className="top-header">
        <div className="logo-section" onClick={() => navigate("/admin")}>
          <img src="/maua-branco.png" alt="Mauá E-SPORTS" className="logo" />
          <h1 className="title">E-SPORTS</h1>
        </div>

        <div className="user-dropdown-wrapper" ref={dropdownRef}>
          <div
            className="user-section"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span>Bem vindo, {account.name || account.username}</span>
            <span className="dropdown">▼</span>
          </div>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Sair da Conta
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="main-panel">
        <div className="button-panel">
          <div className="admin-greeting">
            <h2>Painel Administrativo</h2>
            <p>Selecione uma opção para gerenciar</p>
          </div>

          <button
            className="main-button"
            onClick={() => handleNavigation("/gerenciar-membros")}
          >
            <span className="button-icon">
              <FaUsers />
            </span>
            <span className="button-text">GERENCIAR MEMBROS</span>
            <span className="button-arrow">
              <FaChevronRight />
            </span>
          </button>

          <button
            className="main-button"
            onClick={() => handleNavigation("/consulta-horas-pae")}
          >
            <span className="button-icon">
              <FaClock />
            </span>
            <span className="button-text">CONSULTAR HORAS PAE</span>
            <span className="button-arrow">
              <FaChevronRight />
            </span>
          </button>

          <button
            className="main-button"
            onClick={() => handleNavigation("/gerenciar-modalidades")}
          >
            <span className="button-icon">
              <FaGamepad />
            </span>
            <span className="button-text">GERENCIAR MODALIDADES</span>
            <span className="button-arrow">
              <FaChevronRight />
            </span>
          </button>

          <button
            className="main-button"
            onClick={() => handleNavigation("/gerenciar-treinos")}
          >
            <span className="button-icon">
              <FaCalendarAlt />
            </span>
            <span className="button-text">GERENCIAR TREINOS</span>
            <span className="button-arrow">
              <FaChevronRight />
            </span>
          </button>

          <button
            className="main-button"
            onClick={() => handleNavigation("/editar-site")}
          >
            <span className="button-icon">
              <FaEdit />
            </span>
            <span className="button-text">EDITAR INFORMAÇÕES DO SITE</span>
            <span className="button-arrow">
              <FaChevronRight />
            </span>
          </button>
          <button
            className="main-button"
            onClick={() => handleNavigation("/dashboard")}
          >
            <span className="button-icon">
              <FaChartBar />
            </span>
            <span className="button-text">DASHBOARD</span>
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

export default AdminInterface;
