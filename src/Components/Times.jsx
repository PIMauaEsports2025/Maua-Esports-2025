import React from 'react';
import '../styles/Times.css';
import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';
import { Link } from 'react-router-dom';

import csImage from '../assets/ui/cs.png';
import rocketImage from '../assets/ui/rocket.png';
import rainbowImage from '../assets/ui/rainbow.png';
import valorantImage from '../assets/ui/valorant.png';

function Times() {
    const times = [
        { nome: 'Counter Strike', imagem: csImage },
        { nome: 'EA FC 25', imagem: require('../assets/ui/fc25.png') },
        { nome: 'League Of Legends', imagem: require('../assets/ui/lol.png') },
        { nome: 'Rocket League', imagem: rocketImage },
        { nome: 'TFT - Team Fight Tactics', imagem: require('../assets/ui/tft.png') },
        { nome: "Tom Clancy's Rainbow Six Siege", imagem: rainbowImage },
        { nome: 'Valorant - Line Blue', imagem: valorantImage },
        { nome: 'Valorant - Line Purple', imagem: valorantImage },
        { nome: 'Valorant - Line White', imagem: valorantImage, link: '/time-valorant-a' }
    ];

    return (
        <div className="times-container">
            <Header />
            <main className="comeco-content">
                <h1>EQUIPES</h1>
                <p>
                    A Mauá e-Sports é composta por alunos dedicados e apaixonados por jogos eletrônicos,
                    que atuam em diferentes funções para garantir o crescimento e o bom desempenho da liga.
                </p>
            </main>

            <section className="features">
                {times.map((time, index) => (
                    <div className="feature-card" key={index}>
                        <img src={time.imagem} alt={time.nome} className="feature-image" />
                        <h1>{time.nome}</h1>
                        {time.link ? (
                            <Link to={time.link} className="view-button">VER EQUIPE</Link>
                        ) : null}

                    </div>
                ))}
            </section>
            <Footer />
        </div>
    );
}

export default Times;
