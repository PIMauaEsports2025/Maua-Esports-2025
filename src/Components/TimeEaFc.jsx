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
          <p>Nossa equipe de EA FC 25 representa o Instituto Mauá de Tecnologia em competições universitárias, com jogadores talentosos que demonstram habilidade e paixão pelo esporte virtual.</p>
        </div>
        
        <div className="player-grid">
          {jogadores.map((jogador, index) => (
            <div className="player-card" key={index}>
              <div className="player-header">
                <h3 className="player-name">{jogador.nome}</h3>
              </div>
              <div className="player-info">
                <span className="player-fullname">{jogador.nomeCompleto}</span>
                <span className={`player-role-container ${jogador.funcao === "CAPITÃO" ? "captain" : jogador.funcao === "COACH" ? "coach" : ""}`}>
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
