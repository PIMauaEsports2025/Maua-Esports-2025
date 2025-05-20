import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useMsal } from "@azure/msal-react";
import mauaLogo from "../../assets/ui/maua-branco.png";
import "../../styles/Layout/Header.css";

const Header = ({ onLoginClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // MSAL hooks para autenticação Microsoft
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts && accounts.length > 0;

  const handleLogin = async () => {
  try {
    await instance.loginPopup();
  } catch (error) {
    if (error.errorCode === "user_cancelled") {
      // Usuário fechou o popup, não faz nada
      return;
    }
    // Outros erros podem ser tratados aqui
    console.error("Erro ao fazer login:", error);
  }
};

  const handleLogout = () => {
    instance.logoutPopup();
  };

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
          {/* LINKS TEMPORÁRIOS PARA REALIZAR ALTERÇÕES NO FRONT-END E DEPOIS ALTERAMOS O BACK-END */}
          <li>
            <Link to="/capitao">Capitao</Link>
          </li>
          <li>
            <Link to="/painelUsuario">Usuário</Link>
          </li>{" "}
          {/* AQUI ACABOU OS LINKS TEMPORÁRIOS, SENDO SOMENTE O CAPITÃO E O USUÁRIO */}
          <li>
            <div className="auth-links">
              {!isAuthenticated ? (
                <button className="login-btn" onClick={handleLogin}>
                  Login com Microsoft
                  <CiLogin className="login-icon" />
                </button>
              ) : (
                <button className="login-btn" onClick={handleLogout}>
                  Logout ({accounts[0]?.name || "Usuário"})
                  <CiLogin className="login-icon" />
                </button>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;