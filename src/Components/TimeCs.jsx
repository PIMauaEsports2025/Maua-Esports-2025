import React from "react";
import "../styles/TimeCs.css";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";

function TimeCs() {
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
    {
      nome: "MYTHE",
      nomeCompleto: "Guilherme Zanelli de Novaes | CIC 2º ano",
      funcao: "PLAYER",
    },
    {
      nome: "KINGEY",
      nomeCompleto: "Bruno Saito Santos | ENG 1º ano",
      funcao: "PLAYER",
    },
  ];

  return (
    <section className="timeCs">
      <Header />
      <main className="team-container">
        <h1>Counter Strike 2</h1>
        <h2>Está é a nossa line de CS2</h2>
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

export default TimeCs;
