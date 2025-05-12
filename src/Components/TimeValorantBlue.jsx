import React from "react";
import "../styles/Time-ValorantBlue.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import valorantLogo from "../assets/ui/valorant.png";

function TimeValorantBlue() {
  const jogadores = [
    {
      nome: "PIPIGUMES",
      nomeCompleto: "Vinicius Ikki Tagashira | ENG 2º ano",
      funcao: "CAPITÃO",
    },
    {
      nome: "_EIKAO",
      nomeCompleto: "Eike Marchiori Ulinski | ICD 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: "FMXX",
      nomeCompleto: "Felipe Brito Moulin Rodrigues | CIC 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: "LEO_4848",
      nomeCompleto: "Leonardo Roberto Amadio | ENG 4º ano",
      funcao: "PLAYER",
    },
    {
      nome: "_THEUZX",
      nomeCompleto: "Mateus de Barros Façanha | ENG 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: "SCROLL",
      nomeCompleto: "Fabricio Navarro Meira | SIN 3º ano",
      funcao: "PLAYER",
    },
  ];

  return (
    <section className="timeValorantBlue">
      <Header />
      <main className="team-container">
        <h1>VALORANT</h1>
        <h2>Line Purple</h2>
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

export default TimeValorantBlue;
