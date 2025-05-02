import React, { useState } from "react";
import '../styles/Contact.css';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import mauaLogo from '../assets/maua-branco.png';
import { CiLogin } from "react-icons/ci";
import Header from './Layout/Header';
import Footer from './Layout/Footer';

const Contact = () => {
    return (
        <div className="contato-container">
            <Header />
            <Footer />
        </div>
    );
};

export default Contact;