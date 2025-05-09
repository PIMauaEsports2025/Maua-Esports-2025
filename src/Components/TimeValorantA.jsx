import React from 'react';
import '../styles/Time-ValorantA.css';
import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';
import valorantLogo from '../assets/ui/valorant.png';

function TimeValorantA() {
    const jogadores = [
        { nome: 'MATIAS', nomeCompleto: 'Mateus Doro | IA 2º ano', funcao: 'CONTROLADOR' },
        { nome: 'VITU', nomeCompleto: 'Emmanuel Silva | CNG 4º ano', funcao: 'DUELISTA' },
        { nome: 'SID', nomeCompleto: 'Leonardo Bello | ENG 2º ano', funcao: 'INICIADOR' },
        { nome: 'MATIAS', nomeCompleto: 'Mateus Doro | IA 2º ano', funcao: 'CONTROLADOR' },
        { nome: 'VITU', nomeCompleto: 'Emmanuel Silva | CNG 4º ano', funcao: 'DUELISTA' },
        { nome: 'SID', nomeCompleto: 'Leonardo Bello | ENG 2º ano', funcao: 'INICIADOR' },
        { nome: 'MATIAS', nomeCompleto: 'Mateus Doro | IA 2º ano', funcao: 'CONTROLADOR' },
        { nome: 'VITU', nomeCompleto: 'Emmanuel Silva | CNG 4º ano', funcao: 'DUELISTA' },
        { nome: 'SID', nomeCompleto: 'Leonardo Bello | ENG 2º ano', funcao: 'INICIADOR' },
    ];

    return (
        <section className='timeValorantA'>
            <Header />
            <main className="team-container">
                    <h2>Line White</h2>
                    <h1>VALORANT</h1>
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

export default TimeValorantA;