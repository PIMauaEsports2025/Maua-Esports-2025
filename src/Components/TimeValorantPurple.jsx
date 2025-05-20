import React from "react";
import "../styles/TeamPage.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";

function TimeValorantPurple() {
  const jogadores = [
    {
      nome: "ANNINHA",
      nomeCompleto: "Anna Carolina Santiago Perez | DSG 5º ano",
      funcao: "CAPITÃ",
    },
    {
      nome: "LIGIA_",
      nomeCompleto: "Ligia de Lima Carchina | SIN 3º ano",
      funcao: "PLAYER",
    },
    {
      nome: "AKSEKAI",
      nomeCompleto: "Giulia Ribeiro Pinto Cardoso | CIC 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: "MIDNUGGETDOPP",
      nomeCompleto: "Mateus Doro | DSG 3º ano",
      funcao: "PLAYER",
    },
    {
      nome: "_TSUKINHA",
      nomeCompleto: "Giulia Zaparolli Passiani | CIC 1º ano",
      funcao: "PLAYER",
    },
  ];
  return (
    <section className="team-page">
      <Header />

      <div className="team-banner">
        <h1>VALORANT</h1>
        <h2>Equipe Purple</h2>
      </div>

      <main className="team-container">
        <div className="team-description">
          <p>
            Em Valorant, a precisão de CS:GO se junta às habilidades únicas de
            cada agente, criando um FPS moderno e competitivo. A Mauá E-Sports
            conta com três equipes oficiais – Line Blue, Line Purple e Line
            White – cada uma com seu estilo e estratégia. Elas refletem a força
            e profundidade do nosso time, treinando com disciplina e foco para
            brilhar em torneios universitários e além.
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
                    jogador.funcao === "CAPITÃ"
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

export default TimeValorantPurple;
