import React from 'react';
import '../styles/Campeonato.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

function Campeonato() {
    return (
        <div>
            <div className="campeonato-container">
                <Header />

                <main className="comeco-content">
                    <h1>CAMPEONATOS</h1>
                    <p>
                        Venha acompanhar de perto a emoção dos nossos campeonatos! A Mauá E-Sports reúne os melhores talentos da instituição
                        em partidas cheias de estratégia, adrenalina e espírito de equipe. Fique ligado nas transmissões e torça com a gente por cada vitória!
                    </p>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Campeonato;