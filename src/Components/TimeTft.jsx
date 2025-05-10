import React from 'react';
import '../styles/TimeTft.css';
import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';

function TimeTft() {
    const jogadores = [
        { nome: 'NAPOLEON FOX', nomeCompleto: 'Wagner Silva Filho | CIC 2º ano', funcao: 'CAPITÃO' },
        { nome: 'HIGA', nomeCompleto: 'Rodrigo Yassuhide Higa | ENG 4º ano', funcao: 'CO-CAPITÃO' },
        { nome: 'HU', nomeCompleto: 'Pedro Henrique Hu | ENG 4º ano', funcao: 'PLAYER' },
        { nome: 'LP._.', nomeCompleto: 'Lucas Machado da Costa Pennone | CIC 2º ano', funcao: 'PLAYER' },
        { nome: 'JOTINHA', nomeCompleto: 'João Filipe Pinheiro Marques | CIC 2º ano', funcao: 'PLAYER' },
        ];

    return (
        <section className='timeTft'>
            <Header/>
            <main className="team-container">
                    <h1>Team Fight Tactics</h1>
                    <h2>Esta são as nossas lines de TFT, confira</h2>
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

export default TimeTft;