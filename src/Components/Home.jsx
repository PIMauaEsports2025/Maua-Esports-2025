import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig.js";
import { useNavigate, useLocation } from "react-router-dom";
import { FaMedal, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import heroBanner from "../assets/ui/HeroBanner.jpg";
import { IoGameController } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import cs2Image from "../assets/games/cs2.jpg";
import r6Image from "../assets/games/rainbow6.jpg";
import rocketLeagueImage from "../assets/games/rocketleague.jpg";
import eafc25Image from "../assets/games/eafc25.jpg";
import lolImage from "../assets/games/lol.jpg";
import valorantImage from "../assets/games/valorant.jpg";
import tftImage from "../assets/games/tft.jpg";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import ReactVLibras from "react-vlibras-plugin";

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isEdit = params.get("edit") === "1";

  // Conteúdo editável
  const [info, setInfo] = useState({
    titulo: "",
    descricao: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("siteInfo");
    if (saved) setInfo(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("siteInfo", JSON.stringify(info));
    alert("Informações salvas!");
    window.location.href = "/home";
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const handleMicrosoftLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      const account = response.account;
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("userEmail", account.username);
      const emailDomain = account.username.split("@")[1];
      if (emailDomain === "maua.br") {
        navigate("/admin");
      } else {
        navigate("/painelUsuario");
      }
    } catch (error) {
      setLoginError(
        `Erro ao fazer login com Microsoft. Detalhes: ${error.message || "Erro desconhecido"}`
      );
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const stats = [
    {
      number: "22+",
      description: <strong>Torneios disputados</strong>,
    },
    { number: "10+", description: <strong>Títulos conquistados</strong> },
    { number: "20+", description: <strong>Jogadores ativos na equipe</strong> },
    {
      number: "14+",
      description: <strong>Jogos diferentes competidos</strong>,
    },
    {
      number: "8+",
      description: <strong>Anos de tradição em e-sports</strong>,
    },
  ];

  const games = [
    {
      name: "Counter Strike 2",
      image: cs2Image,
      url: "https://www.counter-strike.net/",
    },
    {
      name: "Rainbow Six Siege",
      image: r6Image,
      url: "https://www.ubisoft.com/en-us/game/rainbow-six/siege",
    },
    {
      name: "Rocket League",
      image: rocketLeagueImage,
      url: "https://www.rocketleague.com/",
    },
    {
      name: "EA FC 25",
      image: eafc25Image,
      url: "https://www.ea.com/games/ea-sports-fc/fc-25",
    },
    {
      name: "League of Legends",
      image: lolImage,
      url: "https://www.leagueoflegends.com/",
    },
    {
      name: "Valorant",
      image: valorantImage,
      url: "https://playvalorant.com/",
    },
    {
      name: "Team Fight Tactics",
      image: tftImage,
      url: "https://teamfighttactics.leagueoflegends.com/",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === games.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? games.length - 3 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    const checkVLibras = setInterval(() => {
      const pluginRoot = document.querySelector(".vw-plugin-wrapper");
      if (pluginRoot) {
        clearInterval(checkVLibras);
      }
    }, 500);

    return () => clearInterval(checkVLibras);
  }, []);

  return (
    <div className="home-container">
      <Header onLoginClick={handleMicrosoftLogin} />

      <main
        className="hero-section"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="hero-content">
          <h1 className="bemvindo">BEM-VINDO</h1>
          <p>
            O Mauá e-Sports é a equipe de esportes eletrônicos do Instituto Mauá
            de Tecnologia (IMT), representando a instituição em competições
            universitárias e promovendo o desenvolvimento de habilidades em
            áreas como engenharia, design, administração e comunicação.
          </p>
          <div className="hero-buttons">
            <button className="inscrever-button">SOBRE NÓS</button>
            <button className="times-button">TIMES</button>
          </div>
          {loginError && <div className="error-message">{loginError}</div>}
        </div>
      </main>

      <section className="stats-section">
        <div className="stats-container">
          {stats.map((statItem, index) => (
            <div key={index} className="stat-item-number">
              <div className="stat-number">
                {statItem.number.split("+")[0]}
                <span className="stat-plus">+</span>
              </div>
              <div className="stat-description">{statItem.description}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="quem-somos-conteudo">
        <h2 className="quem-somos-titulo">
          {isEdit ? (
            <input
              type="text"
              name="titulo"
              value={info.titulo}
              onChange={handleChange}
              placeholder="Título"
              style={{ fontSize: 28, fontWeight: "bold", width: "100%" }}
            />
          ) : info.titulo ? (
            info.titulo
          ) : (
            "QUEM SOMOS"
          )}
        </h2>
        {isEdit ? (
          <textarea
            name="descricao"
            value={info.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            style={{ width: "100%", minHeight: 120, marginBottom: 12 }}
          />
        ) : info.descricao ? (
          <p className="quem-somos-texto">{info.descricao}</p>
        ) : (
          <>
            <p className="quem-somos-texto">
              O <strong>Mauá e-Sports</strong> é uma comunidade universitária
              apaixonada por <strong>jogos eletrônicos</strong>,{" "}
              <strong>inovação</strong> e <strong>competitividade</strong>. Fundado
              em 2018, começamos como um grupo de amigos com um sonho em comum:
              colocar o nome da Mauá no cenário dos e-sports.
            </p>
            <p className="quem-somos-texto">
              Hoje, somos uma organização com presença regional, diversas{" "}
              <strong>modalidades ativas</strong> e uma base sólida de jogadores,
              staffs e entusiastas.
            </p>
            <p className="quem-somos-texto">
              Valorizamos o <strong>crescimento pessoal</strong>, o{" "}
              <strong>trabalho em equipe</strong> e o desenvolvimento de{" "}
              <strong>habilidades técnicas e emocionais</strong>. Para nós, e-sports
              é mais do que jogo, é <strong>formação e transformação</strong>. Seja
              como atleta, staff, analista ou criador de conteúdo, cada membro ajuda
              a construir algo maior. Mais do que um time, somos uma{" "}
              <strong>família que joga, aprende e cresce junto</strong>.
            </p>
          </>
        )}
        {isEdit && (
          <button onClick={handleSave} style={{ marginTop: 8 }}>
            Salvar
          </button>
        )}
      </div>

      <section className="features-hobbie">
        <div className="feature-card">
          <IoGameController className="icon" />
          <h1>HOBBIE</h1>
          <p>
            Treinar <strong>jogos como hobby</strong> proporciona{" "}
            <strong>entretenimento</strong> enquanto desenvolve várias{" "}
            <strong>habilidades</strong>, como raciocínio rápido e tomada de
            decisão.
          </p>
        </div>
        <div className="feature-card">
          <FaMedal className="icon" />
          <h1>CAMPEONATOS</h1>
          <p>
            <strong>Competições de e-sports</strong> são uma forma de testar
            suas habilidades contra jogadores de diferentes níveis, oferecendo{" "}
            <strong>desafios constantes</strong>.
          </p>
        </div>
        <div className="feature-card">
          <FaPeopleGroup className="icon" />
          <h1>CONEXÕES</h1>
          <p>
            Participar do <strong>Mauá E-Sports</strong> oferece uma ótima
            oportunidade de fazer novas amizades com pessoas que compartilham o
            mesmo interesse por <strong>jogos online</strong>.
          </p>
        </div>
      </section>

      <section className="games-carousel-section">
        <h2>GAMES</h2>
        <p>
          A equipe é composta por representantes de diferentes cursos que atuam
          de forma organizada e disciplinada em diversos títulos do cenário
          competitivo, como League of Legends, Valorant, Counter-Strike 2, EA FC
          e Teamfight Tactics, entre outros.
        </p>
        <p className="last-p">
          Mais do que participar de torneios, buscamos consolidar uma cultura de
          e-sports responsável, integrando atividades de treinamento,
          planejamento estratégico e representação institucional.
        </p>

        <div className="games-carousel-container">
          <button className="carousel-control prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>

          <div
            className="games-carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {games.map((game, index) => (
                <div key={index} className="game-card">
                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="game-link"
                  >
                    <img src={game.image} alt={game.name} />
                    <div className="game-overlay">
                      <h3>{game.name}</h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-control next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
      </section>

      <section className="depoimentos">
        <h2 className="depoimentos-titulo">DEPOIMENTOS</h2>
        <p className="depoimentos-descricao">
          Conheça histórias reais de quem fez parte do Mauá E-Sports.
        </p>
        <div className="depoimentos-conteudo">
          <div className="depoimento">
            <p className="depoimento-texto">
              “Fundar o Mauá E-Sports foi um dos maiores desafios da minha vida
              universitária. Ver a equipe crescer e conquistar respeito no
              cenário foi gratificante.”
            </p>
            <h3 className="depoimento-autor">Leonardo Stubber</h3>
            <span className="depoimento-cargo">Presidente</span>
          </div>
          <div className="depoimento">
            <p className="depoimento-texto">
              “Ter liderado o time feminino em campeonatos nacionais me ensinou
              mais sobre trabalho em equipe do que qualquer sala de aula. Mauá
              E-Sports mudou minha trajetória.”
            </p>
            <h3 className="depoimento-autor">Carol Emoto</h3>
            <span className="depoimento-cargo">Vice-Presidente</span>
          </div>
        </div>
      </section>

      <div style={{ zIndex: 9999, position: "relative" }}>
        <ReactVLibras position="right" avatar="guga" opacity={1} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;