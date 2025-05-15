import React, { useState } from "react";
import "../styles/Times.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import { Link } from "react-router-dom";
import csImage from "../assets/ui/cs.png";
import rocketImage from "../assets/ui/rocket.png";
import rainbowImage from "../assets/ui/rainbow.png";
import valorantImage from "../assets/ui/valorant.png";

function Times() {
  const times = [
    { nome: "Counter Strike", imagem: csImage, link: "/time-cs" },
    {
      nome: "EA FC 25",
      imagem: require("../assets/ui/fc25.png"),
      link: "/time-ea-fc",
    },
    {
      nome: "League Of Legends",
      imagem: require("../assets/ui/lol.png"),
      link: "/time-league-of-legends",
    },
    { nome: "Rocket League", imagem: rocketImage, link: "/time-rocket-league" },
    {
      nome: "TFT - Team Fight Tactics",
      imagem: require("../assets/ui/tft.png"),
      link: "/time-tft",
    },
    {
      nome: "Tom Clancy's Rainbow Six Siege",
      imagem: rainbowImage,
      link: "/time-rainbow-six",
    },
    {
      nome: "Valorant - Line Blue",
      imagem: valorantImage,
      link: "/time-valorant-blue",
    },
    {
      nome: "Valorant - Line Purple",
      imagem: valorantImage,
      link: "/time-valorant-purple",
    },
    {
      nome: "Valorant - Line White",
      imagem: valorantImage,
      link: "/time-valorant-white",
    },
  ];
  return (
    <div className="times-container">
      <Header />
      
      <div className="teams-hero">
        <div className="hero-content">
          <h1>NOSSAS EQUIPES</h1>
          <p className="hero-text">
            A elite dos games universitários representando o Instituto Mauá de Tecnologia
          </p>
        </div>
      </div>
      
      <main className="teams-description">
        <div className="description-container">
          <h2>EXCELÊNCIA NOS E-SPORTS</h2>
          <p>
            A Mauá e-Sports reúne times formados por alunos talentosos e
            apaixonados por jogos eletrônicos, que trabalham juntos para alcançar
            a excelência em suas modalidades.
          </p>
          <p>
            Competimos em grandes arenas de e-sports com títulos renomados como
            Counter Strike, League of Legends, Valorant, Rocket League, Team Fight
            Tactics, Rainbow Six Siege e EA FC 25. Nossas equipes são estruturadas
            com treinamentos regulares e estratégias personalizadas para enfrentar
            desafios.
          </p>
          <p>
            Mais do que vitórias, promovemos valores como trabalho em equipe,
            disciplina, inclusão e respeito, acreditando que o crescimento como
            jogador está ligado ao desenvolvimento pessoal.
          </p>
        </div>
      </main>

      <section className="teams-grid-section">
        <h2 className="section-title">CONHEÇA NOSSAS EQUIPES</h2>
        
        <div className="teams-grid">
          {times.map((time, index) => (
            <Link to={time.link} className="team-card" key={index}>
              <div className="team-card-content">
                <div className="team-card-icon">
                  <img src={time.imagem} alt={time.nome} />
                </div>
                <h3 className="team-name">{time.nome}</h3>
                <div className="team-card-overlay">
                  <span className="view-text">Ver Equipe</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="teams-values">
        <div className="values-content">
          <h2>NOSSOS VALORES</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Excelência</h3>
              <p>Buscamos sempre o melhor desempenho em tudo o que fazemos</p>
            </div>
            <div className="value-item">
              <h3>Trabalho em Equipe</h3>
              <p>Acreditamos na força da colaboração e apoio mútuo</p>
            </div>
            <div className="value-item">
              <h3>Disciplina</h3>
              <p>Comprometimento com treinamentos e melhorias constantes</p>
            </div>
            <div className="value-item">
              <h3>Inclusão</h3>
              <p>Valorizamos a diversidade e oportunidades iguais para todos</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Times;
