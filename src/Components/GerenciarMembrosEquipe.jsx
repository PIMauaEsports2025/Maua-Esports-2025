import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import Footer from "./Layout/Footer";
import HeaderAdmin from "./Layout/HeaderAdmin.jsx";
import { FaSearch, FaPencilAlt, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import "../styles/GerenciarMembrosEquipe.css";
import {
  fetchMembers,
  updateMember,
  deleteMember,
  createMember,
} from "../Service/memberApi.js";
import { fetchExternalModalities } from "../Service/trainingApi.js";

const GerenciarMembrosEquipe = () => {
  const navigate = useNavigate();
  const { accounts } = useMsal();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [modalities, setModalities] = useState([]);
  const [loadingModalities, setLoadingModalities] = useState(false);
  const [captainData, setCaptainData] = useState(null);
  const [newMember, setNewMember] = useState({
    name: "",
    discordId: "",
    email: "",
    role: "member",
    modality: "",
    paeHours: 0,
  });

  // Buscar dados do capitão logado
  useEffect(() => {
    const fetchCaptainData = async () => {
      if (accounts && accounts.length > 0) {
        const userEmail = accounts[0].username;
        try {
          const response = await fetch(`http://localhost:5000/api/users/email/${userEmail}`);
          if (response.ok) {
            const userData = await response.json();
            setCaptainData(userData);
            console.log("Dados do capitão:", userData);
          } else {
            console.error("Erro ao buscar dados do capitão");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do capitão:", error);
        }
      }
    };

    fetchCaptainData();
  }, [accounts]);

  // Fetch members from API
  useEffect(() => {
    const loadMembers = async () => {
      if (!captainData || !captainData.modality) return;
      
      try {
        setLoading(true);
        const data = await fetchMembers();
        // Filtrar apenas membros da mesma modalidade do capitão
        const filteredData = data.filter(member => member.modality === captainData.modality);
        setMembers(filteredData);
        setError(null);
        console.log("Membros da mesma modalidade carregados:", filteredData);
      } catch (err) {
        console.error("Erro ao carregar membros:", err);
        setError(
          "Não foi possível carregar os membros. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, [captainData]);

  // Fetch modalities from API
  useEffect(() => {
    const loadModalities = async () => {
      try {
        setLoadingModalities(true);
        const data = await fetchExternalModalities();
        const modalitiesArray = Object.values(data).map(mod => ({
          _id: mod._id,
          Name: mod.Name,
          Tag: mod.Tag,
        }));
        setModalities(modalitiesArray);
        console.log("Modalidades externas carregadas:", modalitiesArray);
      } catch (err) {
        console.error("Erro ao carregar modalidades externas:", err);
      } finally {
        setLoadingModalities(false);
      }
    };

    loadModalities();
  }, []);

  const handleEditMember = (member) => {
    setCurrentMember({
      ...member,
    });
    setShowEditModal(true);
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este membro?")) {
      try {
        await deleteMember(id);
        setMembers(members.filter((member) => member._id !== id));
        if (typeof window.showNotification === "function") {
          window.showNotification(
            "success",
            "Membro excluído com sucesso!",
            3000
          );
        }
      } catch (err) {
        console.error("Erro ao excluir membro:", err);
        if (typeof window.showNotification === "function") {
          window.showNotification("error", "Erro ao excluir membro!", 5000);
        }
      }
    }
  };

  const handleSaveMember = async (updatedMember) => {
    try {
      const result = await updateMember(updatedMember._id, updatedMember);
      setMembers(
        members.map((member) =>
          member._id === updatedMember._id ? result : member
        )
      );
      setShowEditModal(false);
      if (typeof window.showNotification === "function") {
        window.showNotification(
          "success",
          "Membro atualizado com sucesso!",
          3000
        );
      }
    } catch (err) {
      console.error("Erro ao atualizar membro:", err);
      if (typeof window.showNotification === "function") {
        window.showNotification("error", "Erro ao atualizar membro!", 5000);
      }
    }
  };

  const handleAddMember = async () => {
    try {
      // Adicionar automaticamente a modalidade do capitão
      const memberToAdd = {
        ...newMember,
        modality: captainData.modality
      };
      
      const result = await createMember(memberToAdd);
      setMembers([...members, result]);
      setShowAddModal(false);
      setNewMember({
        name: "",
        discordId: "",
        email: "",
        role: "member",
        modality: "",
        paeHours: 0,
      });
      if (typeof window.showNotification === "function") {
        window.showNotification(
          "success",
          "Membro adicionado com sucesso!",
          3000
        );
      }
    } catch (err) {
      console.error("Erro ao adicionar membro:", err);
      if (typeof window.showNotification === "function") {
        window.showNotification("error", "Erro ao adicionar membro!", 5000);
      }
    }
  };

  const handleBackToCaptain = () => {
    navigate("/capitao-interface");
  };

  // Filter members based on search term
  const filteredMembers =
    members && members.length > 0
      ? members.filter(
          (member) =>
            (member.name &&
              member.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (member.discordId &&
              member.discordId
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (member.email &&
              member.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (member.role &&
              member.role.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : [];

  if (!captainData) {
    return (
      <div className="gerenciar-membros-page">
        <HeaderAdmin />
        <main className="membros-main">
          <div className="loading">Carregando dados do capitão...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="gerenciar-membros-page">
      <HeaderAdmin />
      <main className="membros-main">
        <div className="title-search">
          <div className="title-actions">
            <h1>GERENCIAR MEMBROS - {captainData.modality}</h1>
            <button
              className="add-button"
              onClick={() => setShowAddModal(true)}
            >
              <FaUserPlus /> Adicionar Membro
            </button>
          </div>
          <div className="search-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Pesquise por nome, ID ou email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loading">Carregando membros...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="members-table-container">
            <table className="members-table">
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>DISCORD ID</th>
                  <th>EMAIL</th>
                  <th>FUNÇÃO</th>
                  <th>HORAS PAE</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member._id}>
                    <td>{member.name}</td>
                    <td>{member.discordId || "-"}</td>
                    <td>{member.email}</td>
                    <td>
                      {member.role === "member"
                        ? "Membro"
                        : member.role === "captain"
                        ? "Capitão"
                        : "Admin"}
                    </td>
                    <td>{member.paeHours || 0}</td>
                    <td className="actions-column">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEditMember(member)}
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteMember(member._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      
      {showEditModal && (
        <div
          className="edit-modal-backdrop"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="edit-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>EDITAR MEMBRO</h2>
            <div className="form-group">
              <label>DISCORD ID</label>
              <input
                type="text"
                value={currentMember.discordId || ""}
                onChange={(e) =>
                  setCurrentMember({
                    ...currentMember,
                    discordId: e.target.value,
                  })
                }
                placeholder="Ex: usuario#1234"
              />
            </div>
            <div className="form-group">
              <label>EMAIL</label>
              <input
                type="email"
                value={currentMember.email}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>NOME</label>
              <input
                type="text"
                value={currentMember.name}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>MODALIDADE</label>
              <input
                type="text"
                value={captainData.modality}
                readOnly
                style={{ backgroundColor: '#0d1117', color: '#8b949e' }}
              />
            </div>
            <div className="form-group">
              <label>FUNÇÃO</label>
              <div className="select-wrapper">
                <select
                  value={currentMember.role}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, role: e.target.value })
                  }
                >
                  <option value="member">Membro</option>
                  <option value="captain">Capitão</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>HORAS PAE</label>
              <input
                type="number"
                value={currentMember.paeHours || 0}
                onChange={(e) =>
                  setCurrentMember({
                    ...currentMember,
                    paeHours: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="modal-actions">
              <button
                className="salvar-button"
                onClick={() => handleSaveMember(currentMember)}
              >
                SALVAR
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showAddModal && (
        <div
          className="edit-modal-backdrop"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="edit-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>ADICIONAR MEMBRO</h2>
            <div className="form-group">
              <label>NOME</label>
              <input
                type="text"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                placeholder="Nome completo do aluno"
              />
            </div>
            <div className="form-group">
              <label>DISCORD ID</label>
              <input
                type="text"
                value={newMember.discordId}
                onChange={(e) =>
                  setNewMember({ ...newMember, discordId: e.target.value })
                }
                placeholder="Ex: usuario#1234"
              />
            </div>
            <div className="form-group">
              <label>EMAIL</label>
              <input
                type="email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
                placeholder="Ex: 24.00000-0@maua.br"
              />
            </div>
            <div className="form-group">
              <label>FUNÇÃO</label>
              <div className="select-wrapper">
                <select
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                >
                  <option value="member">Membro</option>
                  <option value="captain">Capitão</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>MODALIDADE</label>
              <input
                type="text"
                value={captainData.modality}
                readOnly
                style={{ backgroundColor: '#0d1117', color: '#8b949e' }}
              />
            </div>
            <div className="form-group">
              <label>HORAS PAE</label>
              <input
                type="number"
                value={newMember.paeHours || 0}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    paeHours: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="modal-actions">
              <button className="save-button" onClick={handleAddMember}>
                ADICIONAR
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowAddModal(false)}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default GerenciarMembrosEquipe;