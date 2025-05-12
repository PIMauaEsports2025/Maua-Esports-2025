import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GerenciarTreinos.css";
import { FaSearch, FaEdit, FaTrashAlt, FaFilter, FaPlus } from "react-icons/fa";
import Footer from "./Layout/Footer.jsx";
import Header from "./Layout/HeaderAdmin.jsx";
import HeaderAdmin from "./Layout/HeaderAdmin.jsx";

// URL e token da API
const API_URL = "http://localhost:3000";
const API_TOKEN = "frontendmauaesports";

const GerenciarTreinos = () => {
  const navigate = useNavigate();
  const [treinos, setTreinos] = useState([]);
  const [modalidades, setModalidades] = useState({});
  const [filtroModalidade, setFiltroModalidade] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroPeriodo, setFiltroPeriodo] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentTreino, setCurrentTreino] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Novos estados para adicionar/excluir treinos
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTreino, setNewTreino] = useState({
    ModalityId: "",
    Status: "SCHEDULED",
    StartTimestamp: Date.now(),
    EndTimestamp: Date.now() + 7200000, // 2 horas por padrão
    AttendedPlayers: [],
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingTreino, setDeletingTreino] = useState(null);

  // Função para fazer requisições à API - Corrigida para seguir o padrão do test-api.html
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
      console.log("Headers:", {
        Authorization: `Bearer ${API_TOKEN}`,
      });

      const options = {
        method,
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      };

      // Adiciona Content-Type apenas quando há um body
      if (body && (method === "POST" || method === "PATCH")) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      console.log("Status da resposta:", response.status);
      console.log(
        "Headers da resposta:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Erro ${response.status}: ${response.statusText}\nResposta: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Dados recebidos:", data);
      return data;
    } catch (error) {
      console.error("Erro detalhado na requisição:", error);
      setError(error.message);
      throw error;
    }
  };

  // Buscar todas as modalidades para referência
  const buscarModalidades = async () => {
    try {
      const data = await fazerRequisicao("/modality/all");
      const modalidadesObj = {};

      Object.values(data).forEach((modalidade) => {
        modalidadesObj[modalidade._id] = {
          nome: modalidade.Name,
          tag: modalidade.Tag,
        };
      });

      setModalidades(modalidadesObj);
      return modalidadesObj;
    } catch (error) {
      console.error("Erro ao buscar modalidades:", error);
      return {};
    }
  };

  // Buscar todos os treinos - Ajustando o formato dos timestamps
  const buscarTreinos = async () => {
    setLoading(true);
    try {
      // Buscar modalidades primeiro se ainda não tivermos
      let modalidadesRef = modalidades;
      if (Object.keys(modalidades).length === 0) {
        modalidadesRef = await buscarModalidades();
      }

      // Preparar filtros
      const params = {};
      if (filtroStatus) {
        params["Status"] = filtroStatus;
      }

      // Adicionar filtros temporais com formato string para evitar problemas
      if (filtroPeriodo) {
        const agora = Date.now();
        if (filtroPeriodo === "proximos") {
          params["StartTimestamp>"] = agora.toString();
        } else if (filtroPeriodo === "passados") {
          params["StartTimestamp<"] = agora.toString();
        }
      }

      const data = await fazerRequisicao("/trains/all", params);

      // Processar treinos para adicionar informações da modalidade
      const treinosProcessados = data.map((treino) => ({
        ...treino,
        modalidadeNome:
          modalidadesRef[treino.ModalityId]?.nome || "Modalidade Desconhecida",
        modalidadeTag: modalidadesRef[treino.ModalityId]?.tag || "???",
      }));

      setTreinos(treinosProcessados);
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
    if (!pesquisa.trim()) return true;

    const termo = pesquisa.toLowerCase();
    return (
      treino.modalidadeNome.toLowerCase().includes(termo) ||
      treino.modalidadeTag.toLowerCase().includes(termo) ||
      treino.Status.toLowerCase().includes(termo)
    );
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
        "Treino atualizado no modo simulação! (Nota: as alterações não persistirão após recarregar a página, pois a API não suporta esta operação)"
      );
    } catch (error) {
      alert(`Erro na simulação: ${error.message}`);
    }
  };

  // Nova função para abrir o modal de adicionar treino
  const handleAddTreinoClick = () => {
    const defaultModalityId = Object.keys(modalidades)[0] || "";

    setNewTreino({
      ModalityId: defaultModalityId,
      Status: "SCHEDULED",
      StartTimestamp: Date.now(),
      EndTimestamp: Date.now() + 7200000,
      AttendedPlayers: [],
    });

    setShowAddModal(true);
  };

  // Nova função para salvar novo treino (simulação)
  const handleSaveNewTreino = async (event) => {
    event.preventDefault();

    try {
      console.log("Simulando criação de novo treino:", newTreino);

      const tempId = `temp-${Date.now()}`;

      const modalidadeInfo = modalidades[newTreino.ModalityId] || {
        nome: "Desconhecida",
        tag: "???",
      };

      const novoTreinoCompleto = {
        ...newTreino,
        _id: tempId,
        modalidadeNome: modalidadeInfo.nome,
        modalidadeTag: modalidadeInfo.tag,
      };

      setTreinos([...treinos, novoTreinoCompleto]);
      setShowAddModal(false);
      alert(
        "Treino adicionado em modo simulação! (Nota: o treino não persistirá após recarregar a página, pois a API não suporta esta operação)"
      );
    } catch (error) {
      alert(`Erro na simulação: ${error.message}`);
    }
  };

  // Nova função para iniciar processo de exclusão
  const handleDeleteClick = (treino) => {
    setDeletingTreino(treino);
    setShowDeleteModal(true);
  };

  // Função para exclusão simulada
  const handleDeleteConfirm = async () => {
    try {
      console.log("Simulando exclusão do treino:", deletingTreino);

      // Excluir apenas do estado local
      setTreinos(treinos.filter((t) => t._id !== deletingTreino._id));

      setShowDeleteModal(false);
      setDeletingTreino(null);
      alert(
        "Treino excluído em modo simulação! (Nota: a exclusão não persistirá após recarregar a página, pois a API não suporta esta operação)"
      );
    } catch (error) {
      alert(`Erro na simulação: ${error.message}`);
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
  }, [filtroStatus, filtroPeriodo]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      buscarTreinos();
    }
  };

  const handleVoltar = () => {
    navigate("/admin");
  };

  return (
    <div className="gerenciar-treinos-page">
      <HeaderAdmin />

      <main className="treinos-main">
        <div className="title-search">
          <div className="title-actions">
            <h1>GERENCIAR TREINOS</h1>
            <button className="add-button" onClick={handleAddTreinoClick}>
              <FaPlus /> Novo Treino
            </button>
          </div>
          <div className="search-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Pesquisar por modalidade ou status"
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
                    <th>JOGADORES</th>
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
                      <td>{treino.AttendedPlayers.length}</td>
                      <td className="acoes-cell">
                        <button
                          className="action-btn edit"
                          onClick={() => handleEditTreino(treino)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeleteClick(treino)}
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

      {/* Novo Modal de Adição */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h2>Adicionar Novo Treino</h2>
            <form onSubmit={handleSaveNewTreino}>
              <div className="form-group">
                <label>Modalidade:</label>
                <select
                  value={newTreino.ModalityId}
                  onChange={(e) =>
                    setNewTreino({
                      ...newTreino,
                      ModalityId: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Selecione uma modalidade</option>
                  {Object.entries(modalidades).map(([id, modalidade]) => (
                    <option key={id} value={id}>
                      {modalidade.nome}
                    </option>
                  ))}
                </select>
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

      {/* Novo Modal de Confirmação de Exclusão */}
      {showDeleteModal && deletingTreino && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h2>Confirmar Exclusão</h2>
            <p>
              Tem certeza que deseja excluir o treino de{" "}
              <strong>{deletingTreino.modalidadeNome}</strong> agendado para{" "}
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

      <Footer />
    </div>
  );
};

export default GerenciarTreinos;
