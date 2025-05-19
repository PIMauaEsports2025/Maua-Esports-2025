import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminInterface.css";
import { FaUsers, FaClock, FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import Footer from "./Layout/Footer";

const CapitaoInterface = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            <header className="top-header">
                <div className="logo-section" onClick={() => navigate("/capitao")}>
                    <img src="/maua-branco.png" alt="Mauá E-SPORTS" className="logo" />
                    <h1 className="title">Painel do Capitão</h1>
                </div>

                <div className="user-section">
                    <span>Capitão, {user?.nome}</span>
                </div>
            </header>

            <main className="main-panel">
                <div className="button-panel">
                    <div className="admin-greeting">
                        <h2>Painel do Capitão</h2>
                        <p>Gerencie sua equipe e treinos</p>
                    </div>

                    <button
                        className="main-button"
                        onClick={() => navigate("/capitao/membros")}
                    >
                        <FaUsers />
                        <span className="button-text">MEMBROS DA EQUIPE</span>
                        <FaChevronRight />
                    </button>

                    <button
                        className="main-button"
                        onClick={() => navigate("/capitao/horas-pae")}
                    >
                        <FaClock />
                        <span className="button-text">HORAS PAE</span>
                        <FaChevronRight />
                    </button>

                    <button
                        className="main-button"
                        onClick={() => navigate("/capitao/treinos-equipe")}
                    >
                        <FaCalendarAlt />
                        <span className="button-text">TREINOS</span>
                        <FaChevronRight />
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CapitaoInterface;
