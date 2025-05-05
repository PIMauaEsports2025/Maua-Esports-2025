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
                <h1>COMO COMEÇAMOS</h1>
                <p>A Mauá e-Sports nasceu da paixão de um grupo de estudantes do Instituto Mauá de Tecnologia
                    por e-sports e pela vontade de representar a instituição em torneios acadêmicos.
                    O projeto surgiu de conversas informais entre amigos que, unidos pelo interesse comum,
                    decidiram formar uma equipe organizada para competir e promover a cultura gamer dentro da Mauá.
                    Desde o início, a missão foi criar um ambiente de aprendizado, disciplina e crescimento,
                    tanto no competitivo quanto no desenvolvimento pessoal.
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
                    <h1>Rainbow Six Siege</h1>
                </div>
                <div className="feature-card">
                    <h1>Rocket League</h1>
                </div>
                <div className="feature-card">
                    <h1>TFT - Team Fight Tactics</h1>
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