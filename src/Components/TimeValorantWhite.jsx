import React from "react";
import "../styles/Time-ValorantWhite.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import valorantLogo from "../assets/ui/valorant.png";

function TimeValorantWhite() {
  const jogadores = [
    {
      nome: "RBTYY",
      nomeCompleto: "Lucas Hideki Eguthi | DSG 3º ano",
      funcao: "CAPITÃO",
    },
    {
      nome: "_FELPS_03",
      nomeCompleto: "Felipe Fernandes David | ENG 1º ano",
      funcao: "PLAYER",
    },
    {
      nome: "KIZUKKI",
      nomeCompleto: "Thiago Arevolo de Azevedo | CIC 3º ano",
      funcao: "PLAYER",
    },
    {
      nome: "VOLPOTA",
      nomeCompleto: "Guilherme Murbach Volpolini | CIC 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: ".MIGGG",
      nomeCompleto: "Miguel Sinigali Franzim | ENG 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: "PEPE0907",
      nomeCompleto: "Pedro Martinho de Toledo | ENG 1º ano",
      funcao: "PLAYER",
    },
  ];

  return (
    <section className="timeValorantWhite">
      <Header />
      <main className="team-container">
        <h1>VALORANT</h1>
        <h2>Line White</h2>
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

export default TimeValorantWhite;
