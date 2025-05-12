import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Layout/Footer";
import Header from "./Layout/HeaderAdmin.jsx";
import { FaSearch, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import "../styles/GerenciarMembros.css";
import {
  fetchMembers,
  updateMember,
  deleteMember,
} from "../Service/memberApi.js";
import HeaderAdmin from "./Layout/HeaderAdmin.jsx";

const GerenciarMembros = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  // Fetch members from API
  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        const data = await fetchMembers();
        setMembers(data);
        setError(null);
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

  const handleBackToAdmin = () => {
    navigate("/admin");
  };

  // Filter members based on search term (now using RA instead of name)
  const filteredMembers = members.filter(
    (member) =>
      (member.ra &&
        member.ra.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (member.email &&
        member.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (member.teams &&
        member.teams.some((team) =>
          team.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
      (member.role &&
        member.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="gerenciar-membros-page">
      <HeaderAdmin />

      <main className="membros-main">
        <div className="title-search">
          <h1>GERENCIAR MEMBROS</h1>
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Pesquise pelo RA ou email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                  <th>RA</th>
                  <th>EMAIL</th>
                  <th>TIME</th>
                  <th>TIPO</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member._id}>
                    <td>{member.ra}</td>
                    <td>{member.email}</td>
                    <td>{member.teams ? member.teams.join(", ") : "-"}</td>
                    <td>{member.role}</td>
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
              <label>RA</label>
              <input
                type="text"
                value={currentMember.ra}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, ra: e.target.value })
                }
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
              <div className="select-wrapper">
                <select
                  value={currentMember.modality}
                  onChange={(e) =>
                    setCurrentMember({
                      ...currentMember,
                      modality: e.target.value,
                    })
                  }
                >
                  <option value="CS2">CS2</option>
                  <option value="Valorant">Valorant</option>
                  <option value="LoL">LoL</option>
                  <option value="TFT">TFT</option>
                </select>
              </div>
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
                  <option value="admin">Admin</option>
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
                className="save-button"
                onClick={() => handleSaveMember(currentMember)}
              >
                SALVAR
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GerenciarMembros;
