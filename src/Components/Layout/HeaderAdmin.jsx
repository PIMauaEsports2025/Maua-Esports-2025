import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/Layout/HeaderAdmin.css';

const HeaderAdmin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    alert("Editar perfil clicado");
  };

  const handleLogout = () => {
    alert("Sair da conta clicado");
  };

  const handleVoltar = () => {
    navigate('/admin');
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
    <header className="top-header">
      <div className="logo-section" onClick={handleVoltar}>
        <img src="/maua-branco.png" alt="Mauá E-SPORTS" className="logo" />
        <h1 className="title">E-SPORTS</h1>
      </div>

      <div className="user-dropdown-wrapper" ref={dropdownRef}>
        <div className="user-section" onClick={() => setIsDropdownOpen((prev) => !prev)}>
          <span>Bem vindo, Mateus Martins</span>
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
  );
};

export default HeaderAdmin;