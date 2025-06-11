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

  const [info, setInfo] = useState({
    titulo: "",
    descricao: "",
  });

  const [siteData, setSiteData] = useState({
    home: {
      heroTitle: "BEM-VINDO",
      heroDescription:
        "O Mauá e-Sports é a equipe de esportes eletrônicos do Instituto Mauá de Tecnologia (IMT), representando a instituição em competições universitárias e promovendo o desenvolvimento de habilidades em áreas como engenharia, design, administração e comunicação.",
      quemSomosTitle: "QUEM SOMOS",
      quemSomosText1:
        "O Mauá e-Sports é uma comunidade universitária apaixonada por jogos eletrônicos, inovação e competitividade. Fundado em 2018, começamos como um grupo de amigos com um sonho em comum: colocar o nome da Mauá no cenário dos e-sports.",
      quemSomosText2:
        "Hoje, somos uma organização com presença regional, diversas modalidades ativas e uma base sólida de jogadores, staffs e entusiastas.",
      quemSomosText3:
        "Valorizamos o crescimento pessoal, o trabalho em equipe e o desenvolvimento de habilidades técnicas e emocionais. Para nós, e-sports é mais do que jogo, é formação e transformação. Seja como atleta, staff, analista ou criador de conteúdo, cada membro ajuda a construir algo maior. Mais do que um time, somos uma família que joga, aprende e cresce junto.",
      gamesDescription1:
        "A equipe é composta por representantes de diferentes cursos que atuam de forma organizada e disciplinada em diversos títulos do cenário competitivo, como League of Legends, Valorant, Counter-Strike 2, EA FC e Teamfight Tactics, entre outros.",
      gamesDescription2:
        "Mais do que participar de torneios, buscamos consolidar uma cultura de e-sports responsável, integrando atividades de treinamento, planejamento estratégico e representação institucional.",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("siteInfo");
    if (saved) setInfo(JSON.parse(saved));

    const savedSiteData = localStorage.getItem("siteData");
    if (savedSiteData) {
      const parsedData = JSON.parse(savedSiteData);
      setSiteData(parsedData);
    }
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
    {number: "22+", description: <strong>Torneios disputados</strong> },
    { number: "10+", description: <strong>Títulos conquistados</strong> },
    { number: "20+", description: <strong>Jogadores ativos na equipe</strong> },
    {number: "14+", description: <strong>Jogos diferentes competidos</strong> },
    {number: "8+", description: <strong>Anos de tradição em e-sports</strong> },
  ];

  const games = [
    {
      name: "Rainbow Six Siege",
      image: "https://s2-ge.glbimg.com/Mn4MpbfOftUzZYusjMjY6ucisp4=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2023/b/d/MsAo0RQq25hzLuK95lew/r6-thumb.jpg",
      url: "https://www.ubisoft.com/en-us/game/rainbow-six/siege",
    },
    {
      name: "Rocket League",
      image: "https://vonguru.fr/wp-content/uploads/2020/03/rocket-league-jeux-video-cover-vonguru-min.jpg",
      url: "https://www.rocketleague.com/",
    },
    {
      name: "EA FC 25",
      image: "https://image.api.playstation.com/vulcan/ap/rnd/202409/2712/1e1c42b14d92280e17bda697b8c4ae13ff9f91bdb10fca89.png",
      url: "https://www.ea.com/games/ea-sports-fc/fc-25",
    },
    {
      name: "League of Legends",
      image: "https://cdn.prod.website-files.com/66e1e7e2979a571dc056efb6/66e3ce4ac36ea96ee53486b9_66df30655a91e77fa8ffe849_lol.jpeg",
      url: "https://www.leagueoflegends.com/",
    },
        {
      name: "Counter Strike 2",
      image: cs2Image,
      url: "https://www.counter-strike.net/",
    },
    {
      name: "Valorant",
      image: "https://updateordie.com/wp-content/uploads/2020/08/valorant-couldnt-start-how-to-fix.jpg",
      url: "https://playvalorant.com/",
    },
    {
      name: "Team Fight Tactics",
      image: "https://mir-s3-cdn-cf.behance.net/projects/404/26ac8e139901507.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
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
          <h1 className="bemvindo-new">{siteData.home.heroTitle}</h1>
          <p>
            {siteData.home.heroDescription}
          </p>
          <div className="hero-buttons-ts">
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
      </section>      <div className="quem-somos-conteudo">
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
            siteData.home.quemSomosTitle
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
              {siteData.home.quemSomosText1}
            </p>
            <p className="quem-somos-texto">
              {siteData.home.quemSomosText2}
            </p>
            <p className="quem-somos-texto">
              {siteData.home.quemSomosText3}
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
      </section>      <section className="games-carousel-section">
        <h2>GAMES</h2>
        <p>
          {siteData.home.gamesDescription1}
        </p>
        <p className="last-p">
          {siteData.home.gamesDescription2}
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