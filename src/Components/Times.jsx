import React, { useState, useEffect } from "react";
import "../styles/Times.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import { Link } from "react-router-dom";
import csImage from "../assets/ui/cs.png";
import rocketImage from "../assets/ui/rocket.png";
import rainbowImage from "../assets/ui/rainbow.png";
import valorantImage from "../assets/ui/valorant.png";

function Times() {
  const [siteData, setSiteData] = useState({
    times: {
      heroTitle: "NOSSAS EQUIPES",
      heroDescription:
        "A elite dos games universitários representa o Instituto Mauá com talento, estratégia e paixão. Mais que jogadores, somos um time unido que leva o nome Mauá ao topo dos eSports!",
      descriptionTitle: "EXCELÊNCIA NOS E-SPORTS",
      descriptionText1:
        "A Mauá e-Sports reúne times formados por alunos talentosos e apaixonados por jogos eletrônicos, que trabalham juntos para alcançar a excelência em suas modalidades.",
      descriptionText2:
        "Competimos em grandes arenas de e-sports com títulos renomados como Counter Strike, League of Legends, Valorant, Rocket League, Team Fight Tactics, Rainbow Six Siege e EA FC 25. Nossas equipes são estruturadas com treinamentos regulares e estratégias personalizadas para enfrentar desafios.",
      descriptionText3:
        "Mais do que vitórias, promovemos valores como trabalho em equipe, disciplina, inclusão e respeito, acreditando que o crescimento como jogador está ligado ao desenvolvimento pessoal.",
    },
  });

  useEffect(() => {
    const savedSiteData = localStorage.getItem("siteData");
    if (savedSiteData) {
      const parsedData = JSON.parse(savedSiteData);
      setSiteData(parsedData);
    }
  }, []);

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
          <h1>{siteData.times.heroTitle}</h1>
          {siteData.times.heroDescription}
        </div>
      </div>

      <section className="teams-grid-section">
        <h2 className="secao-title-equipes">{siteData.times.sectionTitle}</h2>

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

      <main className="teams-description">
        <div className="description-container">
          <h2>{siteData.times.descriptionTitle}</h2>
          <p>{siteData.times.descriptionText1}</p>
          <p>{siteData.times.descriptionText2}</p>
          <p>{siteData.times.descriptionText3}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Times;
