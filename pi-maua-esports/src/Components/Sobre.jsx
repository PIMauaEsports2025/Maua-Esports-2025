import React from 'react';
import './Sobre.css';
import { Link } from 'react-router-dom';

export default function Sobre() {
  return (
    <div className="container">
      
      {/* Quem Somos */}
      <section className="about">
        <div className="about-content">
          <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e" alt="Jogadores de E-sports" className="about-image" />
          <div className="about-text">
            <h2>QUEM SOMOS</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <button className="btn">FAZER PARTE</button>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="results">
        <h2>NOSSOS RESULTADOS</h2>
        <div className="results-numbers">
          <div className="number">10+<p>Lorem ipsum</p></div>
          <div className="number">20+<p>Lorem ipsum</p></div>
          <div className="number">14+<p>Lorem ipsum</p></div>
          <div className="number">8+<p>Lorem ipsum</p></div>
        </div>
      </section>

      {/* História */}
      <section className="history">
        <h2>A HISTÓRIA POR TRÁS DA MAUÁ E-SPORTS</h2>
        <div className="timeline">
          <div className="timeline-item">2022 - Lorem ipsum dolor</div>
          <div className="timeline-item">2023 - Lorem ipsum dolor</div>
          <div className="timeline-item">2024 - Lorem ipsum dolor</div>
          <div className="timeline-item">2025 - Lorem ipsum dolor</div>
        </div>
      </section>

      {/* Premiações */}
      <section className="awards">
        <h2>PREMIAÇÕES</h2>
        <div className="awards-cards">
          <div className="award-card">
            <img src="https://via.placeholder.com/100" alt="Galaxy" />
            <h3>C.O.P.A FREE FIRE</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="award-card">
            <img src="https://via.placeholder.com/100" alt="Tricked" />
            <h3>C.O.P.A FREE FIRE</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="award-card">
            <img src="https://via.placeholder.com/100" alt="Cadeira" />
            <h3>C.O.P.A FREE FIRE</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </section>

      {/* Processo Seletivo */}
      <section className="selection-process">
        <h2>PROCESSO SELETIVO</h2>
        <div className="steps">
          <div className="step">1° ETAPA<p>Lorem ipsum dolor sit amet.</p></div>
          <div className="step">2° ETAPA<p>Lorem ipsum dolor sit amet.</p></div>
          <div className="step">3° ETAPA<p>Lorem ipsum dolor sit amet.</p></div>
        </div>
        <button className="btn">FAZER PARTE</button>
      </section>

    

      {/* Rodapé */}
      <footer className="footer">
        <img src="https://via.placeholder.com/50" alt="Logo" />
        <p>
          Liga Universitária de Esports do Instituto Mauá de Tecnologia...
        </p>
      </footer>

    </div>
  );
}
