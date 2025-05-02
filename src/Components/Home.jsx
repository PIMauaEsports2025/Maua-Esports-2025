import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { FaMedal, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import heroBanner from '../assets/ui/HeroBanner.jpg';
import { IoGameController } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import cs2Image from '../assets/games/cs2.jpg';
import r6Image from '../assets/games/rainbow6.jpg';
import rocketLeagueImage from '../assets/games/rocketleague.jpg';
import eafc25Image from '../assets/games/eafc25.jpg';
import lolImage from '../assets/games/lol.jpg';
import valorantImage from '../assets/games/valorant.jpg';
import tftImage from '../assets/games/tft.jpg';
import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const stats = [
    { number: '22+', description: 'Torneios universitários disputados' },
    { number: '10+', description: 'Títulos conquistados' },
    { number: '20+', description: 'Jogadores ativos na equipe' },
    { number: '14+', description: 'Jogos diferentes competidos' },
    { number: '8+', description: 'Anos de tradição em e-sports' },
  ];

  const games = [
    { name: "Counter Strike 2", image: cs2Image, url: "https://www.counter-strike.net/" },
    { name: "Rainbow Six Siege", image: r6Image, url: "https://www.ubisoft.com/en-us/game/rainbow-six/siege" },
    { name: "Rocket League", image: rocketLeagueImage, url: "https://www.rocketleague.com/" },
    { name: "EA FC 25", image: eafc25Image, url: "https://www.ea.com/games/ea-sports-fc/fc-25" },
    { name: "League of Legends", image: lolImage, url: "https://www.leagueoflegends.com/" },
    { name: "Valorant", image: valorantImage, url: "https://playvalorant.com/" },
    { name: "Team Fight Tactics", image: tftImage, url: "https://teamfighttactics.leagueoflegends.com/" }
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
      <Header />

      <main
        className="hero-section"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="hero-content">
          <h1>BEM-VINDO</h1>
          <p>O Mauá e-Sports é a equipe de esportes eletrônicos do Instituto Mauá de Tecnologia (IMT), representando
            a instituição em competições universitárias e promovendo o desenvolvimento de
            habilidades em áreas como engenharia, design, administração e comunicação.
          </p>
          <div className="hero-buttons">
            <button className="inscrever-button">SOBRE NÓS</button>
            <button className="times-button">TIMES</button>
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
        <h2>EQUIPE</h2>
        <p>A equipe é composta por representantes de diferentes cursos que atuam de forma organizada e disciplinada em diversos títulos do cenário competitivo, como League of Legends, Valorant, Counter-Strike 2, EA FC e Teamfight Tactics, entre outros.</p>
        <p className='last-p'>Mais do que participar de torneios, buscamos consolidar uma cultura de e-sports responsável, integrando atividades de treinamento, planejamento estratégico e representação institucional.</p>

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
                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="game-link"
                  >
                    <img src={game.image} alt={game.name} />
                    <div className="game-overlay">
                      <h3>{game.name}</h3>
                    </div>
                  </a>
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
          <p>
            Formanda em Engenharia de Computação, Carol lidera o time com paixão pelos e-sports desde 2022.
            Competidora de Rainbow Six Siege, trouxe para a equipe sua experiência em gestão de comunidades gamers
            e organização de torneios. Sob sua liderança, o Mauá E-Sports expandiu para 7 modalidades diferentes
            e conquistou 3 títulos regionais.
          </p>
        </div>
        <div className="feature-card">
          <h1>Leonardo Stubber</h1>
          <h3>Ex-Presidente</h3>
          <p>
            Fundador do Mauá E-Sports em 2018, Leo transformou um grupo de amigos jogadores em uma das equipes
            universitárias mais respeitadas do estado. Especialista em estratégia de MOBAs, deixou como legado
            a estruturação dos treinos semanais e parcerias com grandes marcas do cenário gamer. Hoje atua como
            consultor da equipe enquanto finaliza seu MBA em Gestão Esportiva.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;