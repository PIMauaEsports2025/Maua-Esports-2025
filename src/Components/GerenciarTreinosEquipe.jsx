import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GerenciarTreinosEquipe.css";
import { FaSearch, FaEdit, FaTrashAlt, FaFilter, FaPlus, FaUsers } from "react-icons/fa";
import Footer from "./Layout/Footer.jsx";
import HeaderAdmin from "./Layout/HeaderAdmin.jsx";

// URL e token da API (mesmo do componente GerenciarTreinos)
const API_URL = "http://localhost:3000";
const API_TOKEN = "frontendmauaesports";

const GerenciarTreinosEquipe = () => {
  const navigate = useNavigate();
  const [treinos, setTreinos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroPeriodo, setFiltroPeriodo] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentTreino, setCurrentTreino] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTreino, setNewTreino] = useState({
    Status: "SCHEDULED",
    StartTimestamp: Date.now(),
    EndTimestamp: Date.now() + 7200000, // 2 horas por padrão
    AttendedPlayers: [],
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingTreino, setDeletingTreino] = useState(null);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState([]);
  
  // Simulação de informações do capitão (em uma aplicação real, viria do contexto de autenticação)
  const captainInfo = {
    name: "LEOZIN",
    modality: "Counter-Strike: Global Offensive A",
    modalityId: "cs2a"
  };
  
  // Lista simulada de jogadores da equipe
  const teamPlayers = [
    { id: "1", name: "LEOZIN", email: "24.01193-2@maua.br" },
    { id: "2", name: "SIMON_", email: "24.00981-4@maua.br" },
    { id: "3", name: "LUCKFERO", email: "24.01567-9@maua.br" },
    { id: "4", name: "RFODS", email: "24.00345-1@maua.br" },
    { id: "5", name: "RK", email: "24.00759-7@maua.br" }
  ];

  // Função para fazer requisições à API (similar à do componente GerenciarTreinos)
  const fazerRequisicao = async (
    endpoint,
    params = {},
    method = "GET",
    body = null
  ) => {
    try {
      const url = new URL(`${API_URL}${endpoint}`);
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      console.log(`Fazendo requisição ${method} para:`, url.toString());

      const options = {
        method,
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      };

      if (body && (method === "POST" || method === "PATCH")) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Erro ${response.status}: ${response.statusText}\nResposta: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro detalhado na requisição:", error);
      setError(error.message);
      throw error;
    }
  };

  // Buscar os treinos da modalidade do capitão
  const buscarTreinos = async () => {
    setLoading(true);
    try {
      // Em uma implementação real, você filtraria por modalidade na API
      // Aqui estamos simulando com dados mockados
      const data = await fazerRequisicao("/trains/all");
      
      // Filtrar apenas os treinos da modalidade do capitão
      const treinosDaModalidade = data
        .filter(treino => treino.ModalityId === captainInfo.modalityId)
        .map(treino => ({
          ...treino,
          modalidadeNome: captainInfo.modality,
          modalidadeTag: "CS2"
        }));
      
      setTreinos(treinosDaModalidade);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar treinos:", error);
      setError("Falha ao carregar treinos. Tente novamente.");
      setTreinos([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar treinos pelo termo de busca
  const treinosFiltrados = treinos.filter((treino) => {
    // Primeiro, aplica o filtro de pesquisa
    if (pesquisa.trim() && 
        !treino.modalidadeNome.toLowerCase().includes(pesquisa.toLowerCase()) &&
        !treino.Status.toLowerCase().includes(pesquisa.toLowerCase())) {
      return false;
    }
    
    // Depois, aplica filtro de status
    if (filtroStatus && treino.Status !== filtroStatus) {
      return false;
    }
    
    // Finalmente, aplica filtro de período
    if (filtroPeriodo) {
      const agora = Date.now();
      if (filtroPeriodo === "proximos" && treino.StartTimestamp < agora) {
        return false;
      }
      if (filtroPeriodo === "passados" && treino.StartTimestamp > agora) {
        return false;
      }
    }
    
    return true;
  });

  // Editar treino
  const handleEditTreino = (treino) => {
    setCurrentTreino({ ...treino });
    setShowEditModal(true);
  };

  // Salvar alterações no treino
  const handleSaveTreino = async (event) => {
    event.preventDefault();

    try {
      console.log("Simulando atualização do treino:", currentTreino);

      // Atualizar apenas no estado local (sem chamada API)
      setTreinos(
        treinos.map((t) => (t._id === currentTreino._id ? currentTreino : t))
      );

      setShowEditModal(false);
      alert(
        "Treino atualizado no modo simulação!"
      );
    } catch (error) {
      alert(`Erro na simulação: ${error.message}`);
    }
  };

  // Abrir modal para adicionar treino
  const handleAddTreinoClick = () => {
    setNewTreino({
      ModalityId: captainInfo.modalityId,
      Status: "SCHEDULED",
      StartTimestamp: Date.now(),
      EndTimestamp: Date.now() + 7200000,
      AttendedPlayers: [],
    });

    setShowAddModal(true);
  };

  // Salvar novo treino
  const handleSaveNewTreino = async (event) => {
    event.preventDefault();

    try {
      console.log("Simulando criação de novo treino:", newTreino);

      const tempId = `temp-${Date.now()}`;

      const novoTreinoCompleto = {
        ...newTreino,
        _id: tempId,
        modalidadeNome: captainInfo.modality,
        modalidadeTag: "CS2",
      };

      setTreinos([...treinos, novoTreinoCompleto]);
      setShowAddModal(false);
      alert(
        "Treino adicionado em modo simulação!"
      );
    } catch (error) {
      alert(`Erro na simulação: ${error.message}`);
    }
  };

  // Iniciar processo de exclusão
  const handleDeleteClick = (treino) => {
    setDeletingTreino(treino);
    setShowDeleteModal(true);
  };

  // Confirmar exclusão
  const handleDeleteConfirm = async () => {
    try {
      console.log("Simulando exclusão do treino:", deletingTreino);

      setTreinos(treinos.filter((t) => t._id !== deletingTreino._id));

      setShowDeleteModal(false);
      setDeletingTreino(null);
      alert(
        "Treino excluído em modo simulação!"
      );
    } catch (error) {
      alert(`Erro na simulação: ${error.message}`);
    }
  };
  
  // Gerenciar presença
  const handleManageAttendance = (treino) => {
    // No mundo real, você buscaria os jogadores presentes da API
    // Aqui estamos simulando com base nos dados do treino
    setCurrentTreino(treino);
    
    // Inicializa o array de presença com todos os jogadores do time
    // e marca como presentes aqueles que já estão em AttendedPlayers
    const attendance = teamPlayers.map(player => ({
      ...player,
      present: treino.AttendedPlayers.includes(player.id)
    }));
    
    setCurrentAttendance(attendance);
    setShowAttendanceModal(true);
  };
  
  // Alternar presença de um jogador
  const toggleAttendance = (playerId) => {
    setCurrentAttendance(
      currentAttendance.map(player => 
        player.id === playerId 
          ? { ...player, present: !player.present } 
          : player
      )
    );
  };
  
  // Salvar lista de presença
  const handleSaveAttendance = () => {
    try {
      // Lista de IDs dos jogadores presentes
      const presentPlayerIds = currentAttendance
        .filter(player => player.present)
        .map(player => player.id);
      
      // Atualiza o treino atual com a nova lista de presença
      const updatedTreino = {
        ...currentTreino,
        AttendedPlayers: presentPlayerIds
      };
      
      // Atualiza na lista de treinos
      setTreinos(
        treinos.map(t => t._id === currentTreino._id ? updatedTreino : t)
      );
      
      setShowAttendanceModal(false);
      alert("Lista de presença atualizada com sucesso!");
    } catch (error) {
      alert(`Erro ao salvar lista de presença: ${error.message}`);
    }
  };

  // Formatar data para exibição
  const formatarData = (timestamp) => {
    return new Date(timestamp).toLocaleString("pt-BR");
  };

  // Formatar data para input datetime-local
  const formatarDataParaInput = (timestamp) => {
    const data = new Date(timestamp);
    return data.toISOString().slice(0, 16);
  };

  // Carregar dados iniciais
  useEffect(() => {
    buscarTreinos();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      buscarTreinos();
    }
  };

  return (
    <div className="gerenciar-treinos-equipe-page">
      <HeaderAdmin />

      <main className="treinos-main">
        <div className="title-section">
          <h1>GERENCIAR TREINOS DA EQUIPE</h1>
          <p className="team-info">Modalidade: {captainInfo.modality}</p>
        </div>
        
        <div className="title-search">
          <div className="title-actions">
            <button className="add-button" onClick={handleAddTreinoClick}>
              <FaPlus /> Novo Treino
            </button>
          </div>
          <div className="search-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Pesquisar treinos"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button
              className="filter-button"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <FaFilter /> Filtros
            </button>
          </div>
        </div>

        {showFilterMenu && (
          <div className="filtros-container">
            <div className="filtro-grupo">
              <label>Status:</label>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="SCHEDULED">Agendado</option>
                <option value="RUNNING">Em andamento</option>
                <option value="COMPLETED">Finalizado</option>
                <option value="CANCELED">Cancelado</option>
              </select>
            </div>
            <div className="filtro-grupo">
              <label>Período:</label>
              <select
                value={filtroPeriodo}
                onChange={(e) => setFiltroPeriodo(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="proximos">Próximos treinos</option>
                <option value="passados">Treinos passados</option>
              </select>
            </div>
            <button onClick={buscarTreinos} className="aplicar-filtros">
              Aplicar Filtros
            </button>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Carregando treinos...</div>
        ) : (
          <div className="treinos-grid">
            {treinosFiltrados.length > 0 ? (
              <table className="treinos-table">
                <thead>
                  <tr>
                    <th>MODALIDADE</th>
                    <th>INÍCIO</th>
                    <th>FIM</th>
                    <th>STATUS</th>
                    <th>PRESENÇA</th>
                    <th>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {treinosFiltrados.map((treino) => (
                    <tr key={treino._id}>
                      <td>
                        <span className="modalidade-tag">
                          {treino.modalidadeTag}
                        </span>
                        {treino.modalidadeNome}
                      </td>
                      <td>{formatarData(treino.StartTimestamp)}</td>
                      <td>{formatarData(treino.EndTimestamp)}</td>
                      <td>
                        <span
                          className={`status-badge ${treino.Status.toLowerCase()}`}
                        >
                          {treino.Status}
                        </span>
                      </td>
                      <td>
                        <span className="attendance-info">
                          {treino.AttendedPlayers.length}/{teamPlayers.length}
                        </span>
                      </td>
                      <td className="acoes-cell">
                        <button
                          className="action-btn attendance"
                          onClick={() => handleManageAttendance(treino)}
                          title="Gerenciar presença"
                        >
                          <FaUsers />
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => handleEditTreino(treino)}
                          title="Editar treino"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeleteClick(treino)}
                          title="Excluir treino"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-results">Nenhum treino encontrado</div>
            )}
          </div>
        )}
      </main>

      {/* Modal de Edição */}
      {showEditModal && currentTreino && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h2>Editar Treino</h2>
            <form onSubmit={handleSaveTreino}>
              <div className="form-group">
                <label>Modalidade:</label>
                <input
                  type="text"
                  value={currentTreino.modalidadeNome}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Data/Hora de Início:</label>
                <input
                  type="datetime-local"
                  value={formatarDataParaInput(currentTreino.StartTimestamp)}
                  onChange={(e) =>
                    setCurrentTreino({
                      ...currentTreino,
                      StartTimestamp: new Date(e.target.value).getTime(),
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Data/Hora de Término:</label>
                <input
                  type="datetime-local"
                  value={formatarDataParaInput(currentTreino.EndTimestamp)}
                  onChange={(e) =>
                    setCurrentTreino({
                      ...currentTreino,
                      EndTimestamp: new Date(e.target.value).getTime(),
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  value={currentTreino.Status}
                  onChange={(e) =>
                    setCurrentTreino({
                      ...currentTreino,
                      Status: e.target.value,
                    })
                  }
                >
                  <option value="SCHEDULED">Agendado</option>
                  <option value="RUNNING">Em andamento</option>
                  <option value="COMPLETED">Finalizado</option>
                  <option value="CANCELED">Cancelado</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="save-button">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Adição */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h2>Adicionar Novo Treino</h2>
            <form onSubmit={handleSaveNewTreino}>
              <div className="form-group">
                <label>Modalidade:</label>
                <input
                  type="text"
                  value={captainInfo.modality}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Data/Hora de Início:</label>
                <input
                  type="datetime-local"
                  value={formatarDataParaInput(newTreino.StartTimestamp)}
                  onChange={(e) =>
                    setNewTreino({
                      ...newTreino,
                      StartTimestamp: new Date(e.target.value).getTime(),
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Data/Hora de Término:</label>
                <input
                  type="datetime-local"
                  value={formatarDataParaInput(newTreino.EndTimestamp)}
                  onChange={(e) =>
                    setNewTreino({
                      ...newTreino,
                      EndTimestamp: new Date(e.target.value).getTime(),
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  value={newTreino.Status}
                  onChange={(e) =>
                    setNewTreino({
                      ...newTreino,
                      Status: e.target.value,
                    })
                  }
                  required
                >
                  <option value="SCHEDULED">Agendado</option>
                  <option value="RUNNING">Em andamento</option>
                  <option value="COMPLETED">Finalizado</option>
                  <option value="CANCELED">Cancelado</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="save-button">
                  Criar Treino
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && deletingTreino && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h2>Confirmar Exclusão</h2>
            <p>
              Tem certeza que deseja excluir o treino agendado para{" "}
              <strong>{formatarData(deletingTreino.StartTimestamp)}</strong>?
            </p>
            <div className="modal-actions">
              <button type="button" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={handleDeleteConfirm}
              >
                Excluir Treino
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Gerenciamento de Presença */}
      {showAttendanceModal && currentTreino && (
        <div className="modal-overlay">
          <div className="attendance-modal">
            <h2>Gerenciar Presença</h2>
            <p className="training-date">
              Treino: {formatarData(currentTreino.StartTimestamp)}
            </p>
            
            <div className="attendance-list">
              {currentAttendance.map(player => (
                <div key={player.id} className="attendance-item">
                  <label className="attendance-label">
                    <input
                      type="checkbox"
                      checked={player.present}
                      onChange={() => toggleAttendance(player.id)}
                    />
                    <div className="player-attendance-info">
                      <span className="player-name">{player.name}</span>
                      <span className="player-email">{player.email}</span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
            
            <div className="modal-actions">
              <button type="button" onClick={() => setShowAttendanceModal(false)}>
                Cancelar
              </button>
              <button
                type="button"
                className="save-button"
                onClick={handleSaveAttendance}
              >
                Salvar Presenças
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GerenciarTreinosEquipe;