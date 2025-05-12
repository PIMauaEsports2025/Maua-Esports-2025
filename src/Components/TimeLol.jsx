import React from "react";
import "../styles/TimeLol.css";
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
    <section className="timeLol">
      <Header />
      <main className="team-container">
        <h1>League Of Legends</h1>
        <h2>Está é a nossa line de LOL</h2>
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

export default TimeLol;
