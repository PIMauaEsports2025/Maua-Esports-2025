import React from 'react';
import '../styles/Sobre.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import mauaLogo from '../assets/ui/maua-branco.png'; // Caminho correto

function Sobre() {
    return (
        <div className="sobre-container">
            <Header />
            
            <main className="sobre-content">
                <h1>Sobre Nós</h1>
                <p>Conteúdo sobre a Mauá Esports.</p>
                <img src={mauaLogo} alt="Logo Mauá E-Sports" className="sobre-logo" />
                
                {/* Adicione mais conteúdo aqui */}
                <section className="sobre-historia">
                    <h2>Nossa História</h2>
                    <p>Fundado em 2018, o Mauá E-Sports nasceu da paixão de um grupo de estudantes
                    por jogos competitivos. O que começou como pequenas competições internas
                    rapidamente cresceu para se tornar uma das mais respeitadas equipes 
                    universitárias do cenário nacional.</p>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}

export default Sobre;
