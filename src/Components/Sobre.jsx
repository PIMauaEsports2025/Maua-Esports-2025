import React from 'react';
import '../styles/Sobre.css';
<<<<<<< Updated upstream
import Header from './Layout/Header';
import Footer from './Layout/Footer';

function Sobre() {
    const premios = [
        {
            titulo: "PRÊMIO FREE FIRE",
            descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
        {
            titulo: "PRÊMIO FREE FIRE",
            descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
        {
            titulo: "PRÊMIO FREE FIRE",
            descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
    ];

    return (
        <div className="sobre-container">
            <Header />

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
                    <h1>Missão</h1>
                    <p>Promover os e-sports de forma estruturada e responsável, aliando desempenho competitivo,
                        crescimento pessoal e espírito de equipe, sempre em alinhamento com os valores educacionais e
                        tecnológicos da Mauá.
                    </p>
                </div>
                <div className="feature-card">
                    <h1>Visão</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div className="feature-card">
                    <h1>Valores</h1>
                    <p>Valorizamos o trabalho em equipe, a disciplina nos treinos e competições, e promovemos a
                        inclusão e o respeito entre os membros. Acreditamos na competitividade saudável e no
                        desenvolvimento contínuo, buscando sempre melhorar, tanto como jogadores quanto como indivíduos.
                    </p>
                </div>
            </section>

            <section className='premios-section'>
                <div className="premios-section">
                    <div className="premios-container">
                        {premios.map((premio, index) => (
                            <div className="premio-card" key={index}>
                                <h3 className="premio-titulo">{premio.titulo}</h3>
                                <p className="premio-descricao">{premio.descricao}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='processo-content'>
                <div className="processo-seletivo">
                    <h2 className="titulo">PROCESSO SELETIVO</h2>
                    <div className="etapas-container">
                        {["1° Etapa", "2° Etapa", "3° Etapa"].map((etapa, index) => (
                            <div className="etapa" key={index}>
                                <h3 className="etapa-titulo">{etapa}</h3>
                                <p className="etapa-texto">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="botao-container">
                        <a
                            href="https://linktr.ee/mauaesports"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="botao"
                        >
                            FAZER PARTE
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
=======

const Sobre = () => {
  return (
    <div className="sobre-container">
      <header className="top-header">
        <div className="logo-section">
          <img src="/logo-maua.png" alt="Mauá E-SPORTS" className="logo" />
          <h1 className="title">E-SPORTS</h1>
        </div>
        <div className="user-section">
          <span>Bem vindo, Mateus Martins</span>
          <span className="dropdown">▼</span>
        </div>
      </header>

      <main className="main-panel">
        <div className="button-panel">
          <button className="main-button">GERENCIAR MEMBROS</button>
          <button className="main-button">GERENCIAR ADMINS</button>
          <button className="main-button">CONSULTAR HORAS PAE</button>
          <button className="main-button">GERENCIAR MODALIDADES</button>
          <button className="main-button">GERENCIAR TIMES</button>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-left">
          <img src="/logo-maua.png" alt="Logo Mauá" className="footer-logo" />
          <div>
            <strong>MAUÁ E-SPORTS</strong>
            <p>
              Liga universitária de e-sports do Instituto Mauá de Tecnologia, promovendo
              competições, treinamentos e representando a instituição em torneios acadêmicos.
            </p>
          </div>
        </div>
        <div className="footer-right">
          <nav>
            <a href="#">HOME</a>
            <a href="#">LOJA</a>
            <a href="#">SOBRE</a>
            <a href="#">CAMPEONATOS</a>
          </nav>
          <div className="social-icons">
            {/* Insira os ícones corretos aqui ou importe as bibliotecas necessárias */}
          </div>
        </div>
      </footer>
    </div>
  );
};
>>>>>>> Stashed changes

export default Sobre;
