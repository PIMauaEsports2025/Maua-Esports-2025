import React from "react";
import "../styles/Times.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import { Link } from "react-router-dom";
import csImage from "../assets/ui/cs.png";
import rocketImage from "../assets/ui/rocket.png";
import rainbowImage from "../assets/ui/rainbow.png";
import valorantImage from "../assets/ui/valorant.png";
import { link } from "framer-motion/client";

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
      <main className="comeco-content">
        <h1>TIMES</h1>
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
        <p>
          Representamos a Mauá com orgulho, levando inovação, tecnologia e
          espírito competitivo aos campos virtuais, construindo uma história de
          conquistas e paixão pelos e-sports.
        </p>
      </main>

      <section className="features">
        {times.map((time, index) => (
          <div className="feature-card" key={index}>
            <img src={time.imagem} alt={time.nome} className="feature-image" />
            <h1>{time.nome}</h1>
            {time.link ? (
              <Link to={time.link} className="view-button">
                VER EQUIPE
              </Link>
            ) : null}
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default Times;
