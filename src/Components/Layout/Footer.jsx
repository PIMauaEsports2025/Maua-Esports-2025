import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaDiscord, FaTwitch, FaYoutube } from "react-icons/fa";
import mauaLogo from "../../assets/ui/maua-branco.png";
import "../../styles/Layout/Footer.css";

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img
            src={mauaLogo}
            alt="Logo Mauá Esports"
            className="footer-logo-img"
          />
          <div className="footer-logo-text">
            <h2>MAUÁ</h2>
            <h3>E-SPORTS</h3>
          </div>
        </div>

        <div className="footer-description">
          <p>
            Liga Universitária de Esports do Instituto Mauá de Tecnologia,
            promovendo competições, treinamentos e integração entre alunos
            apaixonados por games, representando a instituição em torneios
            acadêmicos.
          </p>
        </div>

        <div className="footer-links">
          <ul className="footer-nav">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/sobre">SOBRE</Link>
            </li>
            <li>
              <Link to="/campeonatos">CAMPEONATOS</Link>
            </li>
            <li>
              <Link to="/times">TIMES</Link>
            </li>
          </ul>
          <div className="social-icons">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord />
            </a>
            <a
              href="https://twitch.tv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitch />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
