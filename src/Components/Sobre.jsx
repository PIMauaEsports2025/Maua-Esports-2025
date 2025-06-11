import React, { useState, useEffect } from "react";
import "../styles/Sobre.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import {
  FaGamepad,
  FaTrophy,
  FaMedal,
  FaBullseye,
  FaEye,
  FaHeart,
} from "react-icons/fa";

import ReactVLibras from "react-vlibras-plugin";

function Sobre() {
  const [siteData, setSiteData] = useState({
    sobre: {
      comecoTitle: "COMO COMEÇAMOS",
      comecoText:
        "A Mauá e-Sports nasceu da paixão de um grupo de estudantes do Instituto Mauá de Tecnologia por e-sports e pela vontade de representar a instituição em torneios acadêmicos. O projeto surgiu de conversas informais entre amigos que, unidos pelo interesse comum, decidiram formar uma equipe organizada para competir e promover a cultura gamer dentro da Mauá. Desde o início, a missão foi criar um ambiente de aprendizado, disciplina e crescimento, tanto no competitivo quanto no desenvolvimento pessoal.",
      missao:
        "Promover os e-sports de forma estruturada e responsável, aliando desempenho competitivo, crescimento pessoal e espírito de equipe, sempre em alinhamento com os valores educacionais e tecnológicos da Mauá.",
      visao:
        "Ser reconhecida como uma referência nacional no cenário acadêmico de e-sports, destacando-se pela excelência competitiva, formação de talentos e contribuição para o desenvolvimento da comunidade gamer. ",
      valores:
        "Valorizamos o trabalho em equipe, a disciplina nos treinos e competições, e promovemos a inclusão e o respeito entre os membros. Acreditamos na competitividade saudável e no desenvolvimento contínuo.",
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
    <div className="sobre-container">
      <Header />

      <main className="comeco-content">
        <h1>{siteData.sobre.comecoTitle}</h1>
        <p>{siteData.sobre.comecoText}</p>
      </main>

      <section className="features-mvv">
        <div className="feature-mvv-card">
          <FaBullseye className="feature-mvv-icon" />
          <h1>Missão</h1>
          <p>{siteData.sobre.missao}</p>
        </div>
        <div className="feature-mvv-card">
          <FaEye className="feature-mvv-icon" />
          <h1>Visão</h1>
          <p>{siteData.sobre.visao}</p>
        </div>
        <div className="feature-mvv-card">
          <FaHeart className="feature-mvv-icon" />
          <h1>Valores</h1>
          <p>{siteData.sobre.valores}</p>
        </div>
      </section>

      <section className="premios-section">
        <div className="premios-container">
          {[
            {
              titulo: "Campeão da Liga Universitária",
              descricao:
                "Conquistamos o 1º lugar na competição nacional, enfrentando mais de 50 times universitários em uma disputa acirrada de League of Legends.",
              icon: <FaTrophy className="feature-icon" />,
            },
            {
              titulo: "Campeonato Interfaculdades",
              descricao:
                "Nosso atleta foi eleito o MVP do torneio, com destaque para sua precisão e liderança em partidas decisivas.",
              icon: <FaMedal className="feature-icon" />,
            },
            {
              titulo: "Finalista da Copa Gamer Brasil",
              descricao:
                "O time representou a faculdade entre os finalistas da Copa Gamer Brasil, garantindo visibilidade nacional e apoio de patrocinadores.",
              icon: <FaGamepad className="feature-icon" />,
            },
          ].map((premio, index) => (
            <div className="premio-card" key={index}>
              <div>
                <div className="premio-icon">{premio.icon}</div>
                <h3 className="premio-titulo">{premio.titulo}</h3>
              </div>
              <p className="premio-descricao">{premio.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="processo-content">
        <div className="processo-seletivo">
          <h2 className="titulo">PROCESSO SELETIVO</h2>
          <div className="etapas-container">
            {[
              {
                numero: "1",
                titulo: "Inscrição Online",
                descricao:
                  "Preenchimento de formulário online com informações pessoais, interesses e experiências prévias. Essa etapa nos ajuda a conhecer melhor você.",
              },
              {
                numero: "2",
                titulo: "Dinâmica em Grupo",
                descricao:
                  "Dinâmica em grupo com outros candidatos, voltada para análise de trabalho em equipe, comunicação e resolução de problemas em tempo real.",
              },
              {
                numero: "3",
                titulo: "Entrevista Individual",
                descricao:
                  "Entrevista individual com os líderes das áreas. Aqui vamos explorar seu perfil, expectativas e como você pode contribuir com o time Mauá E-SPORTS.",
              },
            ].map((etapa, index) => (
              <div className="etapa" key={index}>
                <div className="etapa-numero">{etapa.numero}</div>
                <h3 className="etapa-titulo">{etapa.titulo}</h3>
                <p className="etapa-texto">{etapa.descricao}</p>
              </div>
            ))}
          </div>
          <p className="etapas-abertas">* Etapas abertas apenas nos meses de março e agosto</p>
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

      <div style={{ zIndex: 9999, position: "relative" }}>
        <ReactVLibras position="right" avatar="guga" opacity={1} />
      </div>

      <Footer />
    </div>
  );
}

export default Sobre;
