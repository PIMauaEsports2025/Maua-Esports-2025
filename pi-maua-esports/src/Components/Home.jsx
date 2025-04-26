import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaBars } from 'react-icons/fa'; 
import mauaLogo from '../assets/maua-branco.png';
import heroBanner from '../assets/HeroBanner.jpg';
import { CiLogin } from "react-icons/ci";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          <img src={mauaLogo} alt="Logo Mauá" className="logo-img" />
          <h1>Mauá Esports</h1>
          <button 
            className="mobile-menu-button" 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
      <FaBars />
    </button>
        </div>
        <nav className={`navigation ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/about">Sobre</Link></li>           
            <li><Link to="/teams">Times</Link></li>
            <li><Link to="/treinos">Treinos</Link></li>
            <li><Link to="/campeonatos">Campeonatos</Link></li>
            <li>             
            <div className="auth-links">
              <Link to="/login" className="login-btn">
                <CiLogin className="login-icon" /> Login
              </Link>
            </div>           
            </li>
          </ul>
        </nav>
      </header>
      <main 
        className="hero-section" 
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="hero-content">
          <h1>Bem-vindo ao Mauá Esports</h1>
          <p>A equipe de esports do Instituto Mauá de Tecnologia</p>
          <div className="hero-buttons">
            <button className="inscrever-button">Inscrever-se</button>
            <button className="times-button">Times</button>
          </div>
        </div>
      </main>
      <section className="features">
        <div className="feature-card">
          <h3>Eventos</h3>
          <p>Confira os próximos campeonatos e torneios.</p>
        </div>
        <div className="feature-card">
          <h3>Times</h3>
          <p>Conheça nossos jogadores e equipes.</p>
        </div>
        <div className="feature-card">
          <h3>Comunidade</h3>
          <p>Participe da nossa comunidade de gamers.</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Mauá Esports. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;