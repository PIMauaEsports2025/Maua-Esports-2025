import React from 'react';
import '../styles/Time-ValorantPurple.css';
import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';
import valorantLogo from '../assets/ui/valorant.png';

function TimeValorantPurple() {
    const jogadores = [
        { nome: 'ANNINHA', nomeCompleto: 'Anna Carolina Santiago Perez | DSG 5º ano', funcao: 'CAPITÃ' },
        { nome: 'LIGIA_', nomeCompleto: 'Ligia de Lima Carchina | SIN 3º ano', funcao: 'PLAYER' },
        { nome: 'AKSEKAI', nomeCompleto: 'Giulia Ribeiro Pinto Cardoso | CIC 2º ano', funcao: 'PLAYER' },
        { nome: 'MIDNUGGETDOPP', nomeCompleto: 'Mateus Doro | DSG 3º ano', funcao: 'PLAYER' },
        { nome: '_TSUKINHA', nomeCompleto: 'Giulia Zaparolli Passiani | CIC 1º ano', funcao: 'PLAYER' },
        ];

    return (
        <section className='timeValorantPurple'>
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
};

export default TimeValorantPurple;