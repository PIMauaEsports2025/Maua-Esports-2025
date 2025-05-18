import React, { useState, useEffect } from "react";
import "../styles/PainelUsuario.css";
import Footer from "./Layout/Footer";
import { FaUserEdit } from "react-icons/fa";

const PainelUsuario = () => {
    const [usuario, setUsuario] = useState({
        id: "U12345",
        nome: "Mateus Martins",
        email: "mateus.martins@maua.br",
        modalidade: "Valorant",
        horasPAE: 48
    });

    const [editandoNome, setEditandoNome] = useState(false);
    const [novoNome, setNovoNome] = useState(usuario.nome);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setUsuario((prev) => ({
                ...prev,
                horasPAE: prev.horasPAE + 1
            }));
        }, 60000);

        return () => clearInterval(intervalo);
    }, []);

    const salvarNome = () => {
        setUsuario((prev) => ({
            ...prev,
            nome: novoNome
        }));
        setEditandoNome(false);
    };

    return (
        <div className="admin-container">
            <header className="top-header">
                <div className="logo-section">
                    <img src="/maua-branco.png" alt="Mauá E-SPORTS" className="logo" />
                    <h1 className="title">Painel do Usuário</h1>
                </div>
            </header>

            <main className="main-panel">
                <div className="button-panel">
                    <div className="admin-greeting">
                        <h2>Informações Pessoais</h2>
                        <p>Acompanhe seus dados e progresso</p>
                    </div>

                    <div className="info-card">
                        <label>Nome:</label>
                        {editandoNome ? (
                            <div className="edit-nome-wrapper">
                                <input
                                    value={novoNome}
                                    onChange={(e) => setNovoNome(e.target.value)}
                                />
                                <button onClick={salvarNome} className="botao-salvar">
                                    Salvar
                                </button>
                            </div>
                        ) : (
                            <div className="nome-display">
                                <p>{usuario.nome}</p>
                                <button
                                    onClick={() => setEditandoNome(true)}
                                    className="botao-editar"
                                    title="Editar nome"
                                >
                                    <FaUserEdit size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="info-card">
                        <label>ID do Usuário:</label>
                        <p>{usuario.id}</p>
                    </div>

                    <div className="info-card">
                        <label>Email Institucional:</label>
                        <p>{usuario.email}</p>
                    </div>

                    <div className="info-card">
                        <label>Modalidade:</label>
                        <p>{usuario.modalidade}</p>
                    </div>

                    <div className="info-card">
                        <label>Horas PAE:</label>
                        <p>{usuario.horasPAE}</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PainelUsuario;