import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import mauaLogo from "../../assets/ui/maua-branco.png";
import "../../styles/Layout/Header.css";

const Header = ({ onLoginClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="home-header">
      <div className="logo">
        <img src={mauaLogo} alt="Logo Mauá" className="logo-img" />
        <h1>MAUÁ E-SPORTS</h1>
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <FaBars />
        </button>
      </div>
      <nav className={`navigation ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
          <li>
            <Link to="/times">Times</Link>
          </li>
          <li>
            <Link to="/campeonatos">Campeonatos</Link>
          </li>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
          <li>
            <Link to="/capitao">Capitao</Link>
          </li>
          <li>
            <Link to="/painelUsuario">ususario</Link>
          </li>
          <li>
            <div className="auth-links">
              <button
                className="login-btn"
                onClick={onLoginClick}
              >
                Login
                <CiLogin className="login-icon" />
              </button>
              <Link to="/admin">
                <button className="times-button">Painel Admin</button>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
