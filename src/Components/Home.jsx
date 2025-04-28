import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaBars, FaMedal, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import mauaLogo from '../assets/maua-branco.png';
import heroBanner from '../assets/HeroBanner.jpg';
import { CiLogin } from "react-icons/ci";
import { IoGameController } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaInstagram, FaDiscord, FaTwitch, FaYoutube } from 'react-icons/fa';

import cs2Image from '../assets/cs2.jpg';
import r6Image from '../assets/rainbow6.jpg';
import rocketLeagueImage from '../assets/rocketleague.jpg';
import eafc25Image from '../assets/eafc25.jpg';
import lolImage from '../assets/lol.jpg';
import valorantImage from '../assets/valorant.jpg';
import tftImage from '../assets/tft.jpg';


const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const stats = [
    { number: '22+', description: 'Lorem ipsum dolor sit amet' },
    { number: '10+', description: 'Lorem ipsum dolor sit amet' },
    { number: '20+', description: 'Lorem ipsum dolor sit amet' },
    { number: '14+', description: 'Lorem ipsum dolor sit amet' },
    { number: '8+', description: 'Lorem ipsum dolor sit amet' },
  ];

  const games = [
    { name: "Counter Strike 2", image: cs2Image },
    { name: "Rainbow Six Siege", image: r6Image },
    { name: "Rocket League", image: rocketLeagueImage },
    { name: "EA FC 25", image: eafc25Image },
    { name: "League of Legends", image: lolImage },
    { name: "Valorant", image: valorantImage },
    { name: "Team Fight Tactics", image: tftImage }
  ];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === games.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? games.length - 3 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  return (
    <div className="home-container">
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
        <nav className={`navigation ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/Sobre">Sobre</Link></li>
            <li><Link to="/teams">Times</Link></li>
            <li><Link to="/treinos">Treinos</Link></li>
            <li><Link to="/campeonatos">Campeonatos</Link></li>
            <li><Link to="/contact">Contato</Link></li>
            <li>
              <div className="auth-links">
                <Link to="/login" className="login-btn"> Login
                  <CiLogin className="login-icon" />
                </Link>
                <Link to="/sobre" className="sobre-btn"> Login
                  <CiLogin className="sobre-icon" />
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
          <h1>Bem-vindo</h1>
          <p>O Mauá e-Sports é a equipe de esportes eletrônicos do Instituto Mauá de Tecnologia (IMT), representando
            a instituição em competições universitárias e promovendo o desenvolvimento de
            habilidades em áreas como engenharia, design, administração e comunicação.
          </p>
          <div className="hero-buttons">
            <button className="inscrever-button">Inscrever-se</button>
            <button className="times-button">Times</button>
          </div>
        </div>
      </main>

      <section className="stats-section">
        <div className="stats-container">
          {stats.map((statItem, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">
                {statItem.number.split('+')[0]}
                <span className="stat-plus">+</span>
              </div>
              <div className="stat-description">{statItem.description}</div>
            </div>
          ))}
        </div>
        <hr className="stats-divider" />
      </section>

      <section className="features">
        <div className="feature-card">
          <IoGameController className='icon' />
          <h1>Hobbie</h1>
          <p>Treinar <strong>jogos como hobby</strong> proporciona <strong>entretenimento</strong> enquanto
            desenvolve várias <strong>habilidades</strong>, como raciocínio rápido e tomada de decisão.
            Além disso, esse treino se torna uma forma <strong>saudável e divertida</strong> de passar o tempo.
          </p>
        </div>
        <div className="feature-card">
          <FaMedal className='icon' />
          <h1>Participar de Campeonatos</h1>
          <p><strong>Competições de e-sports</strong> são uma forma de testar suas habilidades contra
            jogadores de diferentes níveis, oferecendo <strong>desafios constantes</strong>.
            Participar de campeonatos permite obter <strong>reconhecimento</strong> e
            <strong> prêmios</strong>, além de ser uma motivação extra para treinar mais.
          </p>
        </div>
        <div className="feature-card">
          <FaPeopleGroup className='icon' />
          <h1>Conexões</h1>
          <p>Participar do <strong>Mauá E-Sports</strong> oferece uma ótima oportunidade de fazer
            novas amizades com pessoas que compartilham o mesmo interesse por <strong>jogos online</strong>.
            Além disso, você pode desenvolver habilidades de <strong>trabalho em equipe</strong> e <strong>comunicação</strong>.
          </p>
        </div>
      </section>

      <section className="games-carousel-section">
        <h2>Nossos Jogos</h2>

        <div className="games-carousel-container">
          <button className="carousel-control prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>

          <div
            className="games-carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {games.map((game, index) => (
                <div key={index} className="game-card">
                  <img src={game.image} alt={game.name} />
                  <div className="game-overlay">
                    <h3>{game.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-control next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h1>Carol Emoto</h1>
          <h3>Vice-Presidente</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div className="feature-card">
          <h1>Leonardo Stubber</h1>
          <h3>Ex-Presidente</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src={mauaLogo} alt="Logo Mauá Esports" className="footer-logo-img" />
            <div className="footer-logo-text">
              <h2>MAUÁ</h2>
              <h3>E-SPORTS</h3>
            </div>
          </div>

          <div className="footer-description">
            <p>Liga Universitária de Esports do Instituto Mauá de Tecnologia, promovendo competições, treinamentos e integração entre alunos apaixonados por games, representando a instituição em torneios acadêmicos.</p>
          </div>

          <div className="footer-links">
            <ul className="footer-nav">
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/sobre">SOBRE</Link></li>
              <li><Link to="/campeonatos">CAMPEONATOS</Link></li>
              <li><Link to="/times">TIMES</Link></li>
            </ul>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer"><FaDiscord /></a>
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer"><FaTwitch /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;