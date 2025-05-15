import React from "react";
import "../styles/TeamPage.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";

function TimeLol() {
  const jogadores = [
    {
      nome: "DANNY",
      nomeCompleto: "João Luiz Du Plessis Lang | ENG 4º ano",
      funcao: "CAPITÃO",
    },
    {
      nome: "GBCYLIN",
      nomeCompleto: "Gabriel Chu Yuan Lin | ENG 4º ano",
      funcao: "COACH",
    },
    {
      nome: "LEONOJOGO",
      nomeCompleto: "Leonardo Carvalho Dos Anjos | ENG 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: "LEOCJ",
      nomeCompleto: "Leonardio Lorio | ENG 3º ano",
      funcao: "PLAYER",
    },
    {
      nome: "LELOZITOS",
      nomeCompleto: "Leandro Fabre | ENG 3º ano",
      funcao: "PLAYER",
    },
    {
      nome: "CAYNESS",
      nomeCompleto: "Cayan Neres CLaro | CIC 3º ano",
      funcao: "PLAYER",
    },
    {
      nome: "MISTYBLIZZARD",
      nomeCompleto: "Jack Hao Chan Chang | ENG 4º ano",
      funcao: "PLAYER",
    },
  ];

  return (
    <section className="team-page">
      <Header />
      
      <div className="team-banner">
        <h1>LEAGUE OF LEGENDS</h1>
        <h2>Equipe LoL</h2>
      </div>
      
      <main className="team-container">
        <div className="team-description">
          <p>Nossa equipe de League of Legends compete nos principais campeonatos universitários do país, trazendo estratégia, habilidade e trabalho em equipe para as lanes do Summoner's Rift.</p>
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

export default TimeLol;
