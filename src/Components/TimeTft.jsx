import React from "react";
import "../styles/TeamPage.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";

function TimeTft() {
  const jogadores = [
    {
      nome: "NAPOLEON FOX",
      nomeCompleto: "Wagner Silva Filho | CIC 2º ano",
      funcao: "CAPITÃO",
    },
    {
      nome: "HIGA",
      nomeCompleto: "Rodrigo Yassuhide Higa | ENG 4º ano",
      funcao: "CO-CAPITÃO",
    },
    {
      nome: "HU",
      nomeCompleto: "Pedro Henrique Hu | ENG 4º ano",
      funcao: "PLAYER",
    },
    {
      nome: "LP._.",
      nomeCompleto: "Lucas Machado da Costa Pennone | CIC 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: "JOTINHA",
      nomeCompleto: "João Filipe Pinheiro Marques | CIC 2º ano",
      funcao: "PLAYER",
    },
  ];
  return (
    <section className="team-page">
      <Header />
      
      <div className="team-banner">
        <h1>TEAMFIGHT TACTICS</h1>
        <h2>Equipe TFT</h2>
      </div>
      
      <main className="team-container">
        <div className="team-description">
          <p>Nossa equipe de TFT se destaca nas competições universitárias com jogadores de alta habilidade estratégica e conhecimento profundo das mecânicas do jogo.</p>
        </div>
        
        <div className="player-grid">
          {jogadores.map((jogador, index) => (
            <div className="player-card" key={index}>
              <div className="player-header">
                <h3 className="player-name">{jogador.nome}</h3>
              </div>
              <div className="player-info">
                <span className="player-fullname">{jogador.nomeCompleto}</span>
                <span className={`player-role-container ${jogador.funcao === "CAPITÃO" ? "captain" : jogador.funcao === "CO-CAPITÃO" ? "captain" : jogador.funcao === "COACH" ? "coach" : ""}`}>
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

export default TimeTft;
