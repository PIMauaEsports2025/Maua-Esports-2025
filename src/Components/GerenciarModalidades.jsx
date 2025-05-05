// src/components/GerenciarModalidades.jsx
import React from 'react';

const GerenciarModalidades = () => {
  return (
    <div className="gerenciar-modalidades-container">
      <header className="header">
        <h1>Gerenciar Modalidades</h1>
        <button className="add-button">+ Adicionar Modalidade</button>
      </header>

      <section className="modalidades-list">
        <div className="modalidade-card">
          <h2>Modalidade 1</h2>
          <p>Descrição da modalidade 1.</p>
          <div className="actions">
            <button className="edit-button">Editar</button>
            <button className="delete-button">Excluir</button>
          </div>
        </div>

        <div className="modalidade-card">
          <h2>Modalidade 2</h2>
          <p>Descrição da modalidade 2.</p>
          <div className="actions">
            <button className="edit-button">Editar</button>
            <button className="delete-button">Excluir</button>
          </div>
        </div>

        {/* Adicione mais cards conforme necessário */}
      </section>
    </div>
  );
};

export default GerenciarModalidades;
