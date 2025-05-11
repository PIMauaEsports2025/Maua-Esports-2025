import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GerenciarModalidades.css';
import { FaSearch, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import cs2Image from '../assets/games/cs2.jpg';
import r6Image from '../assets/games/rainbow6.jpg';
import rocketLeagueImage from '../assets/games/rocketleague.jpg';
import eafc25Image from '../assets/games/eafc25.jpg';
import lolImage from '../assets/games/lol.jpg';
import valorantImage from '../assets/games/valorant.jpg';
import tftImage from '../assets/games/tft.jpg';
import Footer from './Layout/Footer.jsx';
import Header from './Layout/HeaderAdmin.jsx';
import HeaderAdmin from './Layout/HeaderAdmin.jsx';

const API_URL = 'http://localhost:3000';
const API_TOKEN = 'frontendmauaesports';

const GerenciarModalidades = () => {
  const navigate = useNavigate();
  const [modalidades, setModalidades] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Função para fazer requisições à API
  const fazerRequisicao = async (endpoint, params = {}) => {
    try {
      const url = new URL(`${API_URL}${endpoint}`);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      console.log('Fazendo requisição para:', url.toString());

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${response.statusText}\nResposta: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError(error.message);
      throw error;
    }
  };

  // Buscar todas as modalidades
  const buscarModalidades = async () => {
    setLoading(true);
    try {
      const data = await fazerRequisicao('/modality/all');
      
      // Converter objeto em array para facilitar renderização
      const modalidadesArray = Object.values(data).map(modalidade => ({
        id: modalidade._id || Math.random().toString(36).substr(2, 9),
        nome: modalidade.Name,
        tag: modalidade.Tag,
        treinos: modalidade.ScheduledTrainings || [],
        imagem: obterImagemModalidade(modalidade.Tag)
      }));
      
      setModalidades(modalidadesArray);
      setError(null);
    } catch (error) {
      setError('Falha ao carregar modalidades. Tente novamente.');
      setModalidades([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar modalidades por tag/nome
  const buscarModalidadesPorFiltro = async () => {
    if (!pesquisa.trim()) {
      return buscarModalidades();
    }

    setLoading(true);
    try {
      // Tenta buscar por tag primeiro
      const data = await fazerRequisicao('/modality/all', { Tag: pesquisa });
      
      // Se não houver resultados, poderia implementar uma busca por nome aqui
      // (assumindo que a API suporte isso, o que não é mostrado no test-api.html)
      
      const modalidadesArray = Object.values(data).map(modalidade => ({
        id: modalidade._id || Math.random().toString(36).substr(2, 9),
        nome: modalidade.Name,
        tag: modalidade.Tag,
        timesCadastrados: modalidade.VoiceChannelsIds?.length || 0,
        treinos: modalidade.ScheduledTrainings || [],
        imagem: obterImagemModalidade(modalidade.Tag)
      }));
      
      setModalidades(modalidadesArray);
      setError(null);
    } catch (error) {
      setError(`Nenhuma modalidade encontrada para "${pesquisa}".`);
      setModalidades([]);
    } finally {
      setLoading(false);
    }
  };

  // Mapear tags para imagens (simulação)
  const obterImagemModalidade = (tag) => {
    const tagMap = {
      'VAL': valorantImage,
      'CS': cs2Image,
      'LOL': lolImage,
      'TFT': tftImage,
      'RL': rocketLeagueImage,
      'R6': r6Image,
      'FC': eafc25Image
    };
    
    // Tenta encontrar uma imagem para a tag ou parte dela
    const matchingTag = Object.keys(tagMap).find(key => 
      tag && tag.includes(key)
    );
    
    return matchingTag ? tagMap[matchingTag] : '';
  };

  // Função para excluir uma modalidade
  const excluirModalidade = async (id) => {
    // Simulação - em produção, faria uma chamada DELETE para a API
    setDeletingId(id);
    try {
      // await fazerRequisicao(`/modality/delete/${id}`, {}, 'DELETE');
      
      // Simulando exclusão com timeout
      setTimeout(() => {
        setModalidades(modalidades.filter(modalidade => modalidade.id !== id));
        setDeletingId(null);
        alert('Modalidade excluída com sucesso!');
      }, 1000);
      
    } catch (error) {
      alert(`Erro ao excluir modalidade: ${error.message}`);
      setDeletingId(null);
    }
  };

  // Função para editar uma modalidade
  const editarModalidade = (id) => {
    // Aqui você redirecionaria para a tela de edição
    alert(`Editar modalidade ${id}`);
  };

  // Carregar modalidades ao montar o componente
  useEffect(() => {
    buscarModalidades();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarModalidadesPorFiltro();
    }
  };

  const handleVoltar = () => {
    navigate('/admin');
  };

  return (
    <div className="gerenciar-modalidades-page">
      
      <HeaderAdmin />

      <main className="modalidades-main">
        <div className="title-search">
          <h1>GERENCIAR MODALIDADES</h1>
          <div className="search-box">
            <FaSearch 
              className="search-icon" 
              onClick={buscarModalidadesPorFiltro}
              style={{cursor: 'pointer'}}
            />
            <input 
              type="text" 
              placeholder="Pesquisar por tag (ex: VAL, CS, LOL)" 
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">Carregando modalidades...</div>
        ) : (
          <div className="modalidades-grid">
            {modalidades.length > 0 ? modalidades.map((modalidade) => (
              <div className="modalidade-card" key={modalidade.id}>
                <div className="modalidade-img-container">
                  {modalidade.imagem ? (
                    <img src={modalidade.imagem} alt={modalidade.nome} />
                  ) : (
                    <div className="placeholder-img">
                      <FaSearch className="no-img-icon" />
                    </div>
                  )}
                </div>
                <div className="modalidade-info">
                  <div className="nome-label">NOME</div>
                  <h3>{modalidade.nome}</h3>
                  <div className="tag-label">TAG</div>
                  <h4>{modalidade.tag}</h4>                                  
                </div>
                <div className="modalidade-actions">
                  <button 
                    className="action-btn edit" 
                    onClick={() => editarModalidade(modalidade.id)}
                  >
                    <FaPencilAlt />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => excluirModalidade(modalidade.id)}
                    disabled={deletingId === modalidade.id}
                  >
                    {deletingId === modalidade.id ? '...' : <FaTrashAlt />}
                  </button>
                </div>
              </div>
            )) : (
              <div className="no-results">
                Nenhuma modalidade encontrada
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GerenciarModalidades;