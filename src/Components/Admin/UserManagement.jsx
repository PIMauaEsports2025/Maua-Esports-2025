import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../../styles/Admin/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        // Dados mockados temporários
        const mockData = [
          { id: 1, ra: "24.00123-4", name: "João Silva", email: "24.00123-4@maua.br", role: "admin", modality: "CS2" },
          { id: 2, ra: "23.01234-5", name: "Maria Costa", email: "23.01234-5@maua.br", role: "captain", modality: "LOL" },
          { id: 3, ra: "22.02345-6", name: "Pedro Santos", email: "22.02345-6@maua.br", role: "member", modality: "VALORANT" }
        ];
        
        setUsers(mockData);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar usuários');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <div className="loading">Carregando usuários...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Gerenciar Usuários</h2>
        <button className="add-button">
          <FaPlus /> Novo Usuário
        </button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>RA</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Modalidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.ra}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge ${user.role}`}>
                  {user.role === 'admin' ? 'Administrador' : 
                   user.role === 'captain' ? 'Capitão' : 'Membro'}
                </span>
              </td>
              <td>{user.modality}</td>
              <td>
                <button className="edit-button" title="Editar">
                  <FaEdit />
                </button>
                <button className="delete-button" title="Excluir">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
