import React from "react";
import "../styles/TeamPage.css";
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
    <section className="team-page">
      <Header />

      <div className="team-banner">
        <h1>EA FC 25</h1>
        <h2>Equipe de Futebol</h2>
      </div>

      <main className="team-container">
        <div className="team-description">
          <p>
            A paixão pelo futebol também vive no digital com o EA FC 25.
            Representamos a Mauá com jogadores que unem técnica, leitura de jogo
            e habilidade nos controles. Seja em confrontos 1x1 ou modos
            competitivos online, nossos atletas trazem a emoção do estádio para
            o controle do videogame.
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

export default TimeEaFc;