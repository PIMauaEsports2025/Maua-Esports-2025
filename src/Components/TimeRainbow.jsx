import React from "react";
import "../styles/TeamPage.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";

function TimeRainbow() {
  const jogadores = [
    {
      nome: "LEOZIN",
      nomeCompleto: "Leonardo Galdi Fiorese | ENG 4º ano",
      funcao: "CAPITÃO",
    },
    {
      nome: "LOSTIWNL",
      nomeCompleto: "Caio Francisco Lima Secundino | ADM 3º ano",
      funcao: "COACH",
    },
    {
      nome: "SIMON_",
      nomeCompleto: "Victor Simon Paulo | CIC 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: "LUCKFERO",
      nomeCompleto: "Lucca de Souza Oliveira | CIC 3º ano",
      funcao: "PLAYER",
    },
    {
      nome: "RFODS",
      nomeCompleto: "Rodrigo Fernandes Faltz | ENG 5º ano",
      funcao: "PLAYER",
    },
    {
      nome: "RK",
      nomeCompleto: "Robert Kevyn Gonçalves Gomes | CIC 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: "VCL",
      nomeCompleto: "Victhor das Virgens de Lima Castro | CIC 2º ano",
      funcao: "PLAYER",
    },
  ];

  return (
    <section className="team-page">
      <Header />

      <div className="team-banner">
        <h1>RAINBOW SIX: SIEGE</h1>
        <h2>Equipe R6</h2>
      </div>

      <main className="team-container">
        <div className="team-description">
          <p>
            Mais do que um FPS, Rainbow Six é sobre tática, paciência e
            coordenação. Cada operador tem um papel único e nossos times sabem
            como utilizá-los com precisão. Representamos a Mauá com orgulho em
            confrontos de alto nível e decisões milimétricas a cada round.
          </p>
        </div>

        <div className="player-grid">
          {jogadores.map((jogador, index) => (
            <div className="player-card" key={index}>
              <div className="player-header">
                <h3 className="player-name">{jogador.nome}</h3>
              </div>
              <div className="player-info">
                <span className="player-fullname">{jogador.nomeCompleto}</span>
                <span
                  className={`player-role-container ${
                    jogador.funcao === "CAPITÃO"
                      ? "captain"
                      : jogador.funcao === "COACH"
                      ? "coach"
                      : ""
                  }`}
                >
                  {jogador.funcao}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </section>
  );
}

export default TimeRainbow;
