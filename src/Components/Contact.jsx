import React from "react";
import '../styles/Contact.css';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import mauaLogo from '../assets/ui/maua-branco.png';
import { CiLogin } from "react-icons/ci";
import Header from './Layout/Header';
import Footer from './Layout/Footer';

function Contact() {
    const contact = []
    return (
        <div className="contato-container">
            <Header />

            <main className="comeco-content">
                <h1>CONTATO</h1>
                <p>Preencha o formulário abaixo com sua mensagem, dúvida ou sugestão. 
                    As informações enviadas serão encaminhadas diretamente para o nosso 
                    e-mail institucional e entraremos em contato o mais breve possível.
                </p>
            </main>

            

            <section className="contato-form">
                
            </section>

            <Footer />
        </div>
    );
};

export default Contact;