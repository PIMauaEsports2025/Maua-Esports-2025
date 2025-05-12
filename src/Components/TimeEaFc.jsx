import React from "react";
import "../styles/TimeCs.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";

function TimeEaFc() {
  const jogadores = [
    {
      nome: "LEO",
      nomeCompleto: "Leonardo Ferreira Abrahão | ENG 2º ano",
      funcao: "CAPITÃO",
    },
    {
      nome: "GABE",
      nomeCompleto: "Gabriel Ferreira Gimenez | ENG 1º ano",
      funcao: "PLAYER",
    },
    {
      nome: "EDU",
      nomeCompleto: "Eduardo Girotto de Oliveira | ENG 1º ano",
      funcao: "PLAYER",
    },
  ];

  return (
    <section className="timeEaFc">
      <Header />
      <main className="team-container">
        <h1>EA FC25</h1>
        <h2>Esta é a nossa line de EA FC25</h2>
        <div className="player-grid">
          {jogadores.map((jogador, index) => (
            <div className="player-card" key={index}>
              <span className="player-fullname">{jogador.nomeCompleto}</span>
              <h3 className="player-name">{jogador.nome}</h3>
              <span className="player-role">{jogador.funcao}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default TimeEaFc;
