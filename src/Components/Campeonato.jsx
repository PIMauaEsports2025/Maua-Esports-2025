import React, { useState, useEffect } from "react";
import "../styles/Campeonato.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

import ReactVLibras from "react-vlibras-plugin";

function Campeonato() {
  const [siteData, setSiteData] = useState({
    campeonatos: {
      title: "CAMPEONATOS",
      description:
        "Venha acompanhar de perto a emoção dos nossos campeonatos! A Mauá E-Sports reúne os melhores talentos da instituição em partidas cheias de estratégia, adrenalina e espírito de equipe. Fique ligado nas transmissões e torça com a gente por cada vitória!",
    },
  });

  useEffect(() => {
    const savedSiteData = localStorage.getItem("siteData");
    if (savedSiteData) {
      const parsedData = JSON.parse(savedSiteData);
      setSiteData(parsedData);
    }

    const checkVLibras = setInterval(() => {
      const pluginRoot = document.querySelector(".vw-plugin-wrapper");
      if (pluginRoot) {
        console.log("VLibras carregado com sucesso");
        clearInterval(checkVLibras);
      }
    }, 500);

    return () => clearInterval(checkVLibras);
  }, []);

  return (
    <div>
      <div className="campeonato-container">
        <Header />

        <main className="comeco-content">
          <h1>{siteData.campeonatos.title}</h1>
          <p>{siteData.campeonatos.description}</p>
        </main>
      </div>

      <section className="championships-section">
        <div className="championships-wrapper">
          <div className="championship-cards">
            <div className="championship-card valorant">
              <div className="card-image"></div>
              <div className="card-content">
                <span className="card-type">INTER</span>
                <h3 className="card-title">CAMPEONATO VALORANT</h3>
                <p className="card-date">22 de dezembro, 10h</p>
                <a href="#" className="card-button">
                  VER MAIS
                </a>
              </div>
            </div>

            <div className="championship-card rainbow">
              <div className="card-image"></div>
              <div className="card-content">
                <span className="card-type">INTER</span>
                <h3 className="card-title">CAMPEONATO RAINBOW SIX</h3>
                <p className="card-date">24 de agosto, 13h30</p>
                <a href="#" className="card-button">
                  VER MAIS
                </a>
              </div>
            </div>

            <div className="championship-card fc24">
              <div className="card-image"></div>
              <div className="card-content">
                <span className="card-type">INTER</span>
                <h3 className="card-title">CAMPEONATO FC24</h3>
                <p className="card-date">04 de janeiro, 8h</p>
                <a href="#" className="card-button">
                  VER MAIS
                </a>
              </div>
            </div>

            <div className="championship-card lol">
              <div className="card-image"></div>
              <div className="card-content">
                <span className="card-type">INTER</span>
                <h3 className="card-title">CAMPEONATO LEAGUE OF LEGENDS</h3>
                <p className="card-date">15 de fevereiro, 16h</p>
                <a href="#" className="card-button">
                  VER MAIS
                </a>
              </div>
            </div>

            <div className="championship-card csgo">
              <div className="card-image"></div>
              <div className="card-content">
                <span className="card-type">INTER</span>
                <h3 className="card-title">CAMPEONATO COUNTER-STRIKE</h3>
                <p className="card-date">10 de março, 19h</p>
                <a href="#" className="card-button">
                  VER MAIS
                </a>
              </div>
            </div>

            <div className="championship-card rocket">
              <div className="card-image"></div>
              <div className="card-content">
                <span className="card-type">INTER</span>
                <h3 className="card-title">CAMPEONATO ROCKET LEAGUE</h3>
                <p className="card-date">27 de abril, 14h</p>
                <a href="#" className="card-button">
                  VER MAIS
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ zIndex: 9999, position: "relative" }}>
        <ReactVLibras position="right" avatar="guga" opacity={1} />
      </div>

      <Footer />
    </div>
  );
}

export default Campeonato;
