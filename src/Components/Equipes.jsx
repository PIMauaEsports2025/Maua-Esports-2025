import React from 'react';
import '../styles/Times.css';
import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';
import valorantIcon from '../assets/ui/valorant.png';

function ValorantTeamPage() {
  const players = [
    {
      nome: 'Mateus Doro',
      apelido: 'MATIAS',
      curso: 'IA 2º ano',
      funcao: 'CONTROLADOR'
    },
    {
      nome: 'Emanuel Silva',
      apelido: 'VITU',
      curso: 'CIC 4º ano',
      funcao: 'DUELISTA'
    },
    {
      nome: 'Leonardo Belo',
      apelido: 'SID',
      curso: 'ENG 2º ano',
      funcao: 'INICIADOR'
    }
  ];

  return (
    <div className="times-container">
      <Header />
      <main className="comeco-content">
        <div className="valorant-header">
          <img src={valorantIcon} alt="Valorant" className="valorant-icon" />
          <h2>Equipe A</h2>
          <h1 className="valorant-title">VALORANT</h1>
        </div>
      </main>

      <section className="features-times">
        {players.map((player, i) => (
          Array.from({ length: 3 }).map((_, idx) => (
            <div className="feature-card" key={`${i}-${idx}`}>
              <p style={{ color: '#00BFFF' }}>{player.nome} | {player.curso}</p>
              <h1>{player.apelido}</h1>
              <p>{player.funcao}</p>
            </div>
          ))
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default ValorantTeamPage;