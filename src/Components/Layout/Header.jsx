import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaMicrosoft } from "react-icons/fa";
import { CiLogin } from "react-icons/ci"; 
import { useMsal } from "@azure/msal-react";
import mauaLogo from "../../assets/ui/maua-branco.png";
import "../../styles/Layout/Header.css";

const Header = ({ onLoginClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts && accounts.length > 0;
  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup();
      if (loginResponse) {
        localStorage.setItem("token", loginResponse.accessToken || "authenticated");
          // Buscar dados do usuário pelo email para determinar o role
        const userEmail = loginResponse.account.username;
        console.log("Email do usuário logado:", userEmail);
        
        try {
          const response = await fetch(`http://localhost:5000/api/users/email/${userEmail}`);
          console.log("Status da resposta:", response.status);
          
          if (response.ok) {
            const userData = await response.json();
            console.log("Dados do usuário encontrados:", userData);
            
            // Redirecionar baseado no role do usuário
            switch (userData.role) {
              case 'admin':
                navigate("/admin");
                break;
              case 'captain':
                navigate("/capitao-interface");
                break;
              case 'member':
                navigate("/painel-usuario");
                break;
              default:
                navigate("/painel-usuario");
            }
          } else {
            console.log("Usuário não encontrado no banco de dados. Status:", response.status);
            const errorData = await response.text();
            console.log("Resposta de erro:", errorData);
            // Se o usuário não existe no banco, redirecionar para painel de usuário
            navigate("/painel-usuario");
          }
        } catch (fetchError) {
          console.error("Erro ao buscar dados do usuário:", fetchError);
          navigate("/painel-usuario");
        }
      }
      
    } catch (error) {
      if (error.errorCode === "user_cancelled") {
        return;
      }
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleLogout = () => {
    instance.logoutPopup();
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getFirstName = (fullName) => {
    if (!fullName) return "Usuário";
    return fullName.split(' ')[0];
  };

  return (
    <header className="home-header">
      <div className="logo">
        <img src={mauaLogo} alt="Logo Mauá" className="logo-img" />
        <h1>MAUÁ<br />E-SPORTS</h1>
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
            <div className="auth-links">
              {!isAuthenticated ? (
                <button className="login-btn microsoft-login-btn" onClick={handleLogin}>
                  Login
                </button>
              ) : (
                <button className="login-btn logout-btn" onClick={handleLogout}>
                  Logout ({getFirstName(accounts[0]?.name)})
                  <CiLogin className="logout-icon" />
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