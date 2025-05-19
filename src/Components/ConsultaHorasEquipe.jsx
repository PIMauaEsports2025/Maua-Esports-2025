import React, { useState, useEffect } from "react";
import "../styles/ConsultaHorasEquipe.css";
import { FaSearch, FaUserCircle, FaFilter, FaClock } from "react-icons/fa";
import { fetchMembers } from "../Service/memberApi.js";
import Footer from "./Layout/Footer";
import HeaderAdmin from "./Layout/HeaderAdmin.jsx";

const ConsultaHorasEquipe = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Simulação de dados do capitão (em uma aplicação real, viria do contexto de autenticação)
  const captainInfo = {
    name: "LEOZIN",
    modality: "Counter-Strike: Global Offensive A"
  };

  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        const allMembers = await fetchMembers();
        
        // Filtra apenas membros da mesma modalidade que o capitão
        const teamMembers = allMembers.filter(member => 
          member.modality === captainInfo.modality
        );
        
        setMembers(teamMembers);
        setFilteredMembers(teamMembers);
        setError("");
      } catch (err) {
        console.error("Erro ao carregar membros:", err);
        setError("Não foi possível carregar os dados dos membros da equipe.");
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  useEffect(() => {
    // Aplica filtros e ordenação aos membros
    let results = [...members];
    
    // Aplicar pesquisa
    if (searchTerm) {
      results = results.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.discordId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Aplicar ordenação
    results.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "paeHours") {
        comparison = (a.paeHours || 0) - (b.paeHours || 0);
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });
    
    setFilteredMembers(results);
  }, [members, searchTerm, sortBy, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="consulta-equipe-page">
      <HeaderAdmin />
      
      <main className="consulta-equipe-main">
        <div className="title-section">
          <h1>HORAS PAE DA EQUIPE</h1>
          <p className="team-info">Modalidade: {captainInfo.modality}</p>
        </div>
        
        <div className="search-filter-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Pesquisar membro..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <button 
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filtros
          </button>
        </div>
        
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-option">
              <label>Ordenar por:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Nome</option>
                <option value="paeHours">Horas PAE</option>
              </select>
            </div>
            
            <div className="filter-option">
              <label>Ordem:</label>
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Crescente</option>
                <option value="desc">Decrescente</option>
              </select>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading">
            <p>Carregando dados dos membros...</p>
          </div>
        )}
        
        {error && !loading && (
          <div className="error-message">{error}</div>
        )}
        
        {!loading && !error && (
          <div className="team-members-container">
            <div className="members-grid">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <div className="member-card" key={member._id}>
                    <div className="member-avatar">
                      <FaUserCircle />
                    </div>
                    <div className="member-info">
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-email">{member.email}</p>
                      <div className="member-hours">
                        <FaClock className="hours-icon" />
                        <span className="hours-value">{member.paeHours || 0} horas</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>Nenhum membro encontrado.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="summary-panel">
          <h3>Resumo da Equipe</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Total de Membros:</span>
              <span className="stat-value">{filteredMembers.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Média de Horas PAE:</span>
              <span className="stat-value">
                {filteredMembers.length > 0 
                  ? (filteredMembers.reduce((sum, m) => sum + (m.paeHours || 0), 0) / filteredMembers.length).toFixed(1)
                  : 0}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total de Horas PAE:</span>
              <span className="stat-value">
                {filteredMembers.reduce((sum, m) => sum + (m.paeHours || 0), 0)}
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConsultaHorasEquipe;