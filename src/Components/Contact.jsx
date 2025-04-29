import React, { useState } from "react";
import '../styles/Contact.css';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import mauaLogo from '../assets/maua-branco.png';
import { CiLogin } from "react-icons/ci";

const Contact = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    
    return (
        <div className="nav-bar">
            <header className="home-header">
                <div className="logo">
                    <img src={mauaLogo} alt="Logo Mauá" className="logo-img" />
                    <h1>Mauá E-Sports</h1>
                    <button
                        className="mobile-menu-button"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle navigation menu"
                    >
                        <FaBars />
                    </button>
                </div>
                <nav className={`navigation ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">Sobre</Link></li>
                        <li><Link to="/teams">Times</Link></li>
                        <li><Link to="/treinos">Treinos</Link></li>
                        <li><Link to="/campeonatos">Campeonatos</Link></li>
                        <li><Link to="/contact" className="active">Contato</Link></li>
                        <li>
                            <div className="auth-links">
                                <Link to="/login" className="login-btn"> Login
                                    <CiLogin className="login-icon" />
                                </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Contact;