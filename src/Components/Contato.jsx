import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contato.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

function Contato() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            'service_ujdd19b',
            'template_q76er4c',
            formData,
            'TndTwX4-rmLTk0oRe'
        ).then((response) => {
            alert('Mensagem enviada com sucesso!!!');
            setFormData({ nome: '', email: '', mensagem: '' });
        }).catch((err) => {
            console.error('Erro ao enviar:', err);
            alert('Erro ao enviar a mensagem. Tente novamente.');
        });
    };

    return (
        <div className="contato-container">
            <Header />

            <main className="comeco-content">
                <h1>CONTATO</h1>
                <p>
                    Preencha o formulário abaixo com sua mensagem, dúvida ou sugestão.
                    As informações enviadas serão encaminhadas diretamente para o nosso e-mail
                    institucional e entraremos em contato o mais breve possível.
                </p>
            </main>
            <section className='formulario-secao'>
                <form className="formulario-contato" onSubmit={handleSubmit}>
                    <label htmlFor="nome" className="rotulo-campo">NOME COMPLETO</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        className="input-campo"
                        placeholder="Nome completo"
                        value={formData.nome}
                        onChange={handleChange}
                    />

                    <label htmlFor="email" className="rotulo-campo">EMAIL</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input-campo"
                        placeholder="email@maua.br"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="mensagem" className="rotulo-campo">MENSAGEM</label>
                    <textarea
                        id="mensagem"
                        name="mensagem"
                        className="textarea-campo"
                        placeholder="No que podemos te ajudar?"
                        value={formData.mensagem}
                        onChange={handleChange}
                    ></textarea>

                    <button type="submit" className="botao-enviar">ENVIAR MENSAGEM</button>
                </form>
            </section>

            <div className="contato-info">
                <span>mauaesports@gmail.com</span>
                <a
                    href="https://www.instagram.com/esportsmaua/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-instagram"
                >
                    @esportsmaua
                </a>
            </div>

            <Footer />
        </div>
    );
};

export default Contato;