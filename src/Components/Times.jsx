import React from 'react';
import '../styles/Times.css';
import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';

function Times() {
    const times = [

    ]
    return (
        <div className="times-container">
            <Header/>

            <main className="comeco-content">
                <h1>EQUIPES</h1>
                <p>A Mauá e-Sports é composta por alunos dedicados e apaixonados por jogos eletrônicos, que atuam em diferentes funções para garantir o crescimento e o bom desempenho da liga. 
                </p>
            </main>

            <section className="features">
                <div className="feature-card">
                    <h1>Counter Strike</h1>
                </div>  
                <div className="feature-card">
                    <h1>EA FC 25</h1>
                </div>
                <div className="feature-card">
                    <h1>League of Legends</h1>
                </div>
                <div className="feature-card">
                    <h1>Rocket League</h1>
                </div>
                <div className="feature-card">
                    <h1>TFT - Team Fight Tactics</h1>
                </div>
                <div className="feature-card">
                    <h1>Tom Clancy's Rainbow Six Siege</h1>
                </div>
                <div className="feature-card">
                    <h1>Valorant - Line Blue</h1>
                </div>
                <div className="feature-card">
                    <h1>Valorant - Line Purple</h1>
                </div>
                <div className="feature-card">
                    <h1>Valorant - Line White</h1>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Times;