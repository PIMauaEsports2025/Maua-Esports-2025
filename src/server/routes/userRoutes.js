const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users - Obter todos os usuários
router.get('/', async (req, res) => {
  try {
    // Se estamos usando dados mockados, retornar os dados mockados
    if (global.useMockData) {
      console.log('Retornando dados mockados de usuários');
      const mockUsers = [
        {
          _id: '1',
          discordId: "000000000000000001",
          email: "24.01193-2@maua.br",
          name: "Lucas Silva",
          role: "captain",
          modality: "Counter-Strike 2",
          paeHours: 15
        },
        {
          _id: '2',
          discordId: "000000000000000002",
          email: "24.02193-3@maua.br",
          name: "Maria Oliveira",
          role: "member",
          modality: "League of Legends",
          paeHours: 12
        },
        {
          _id: '3',
          discordId: "000000000000000003",
          email: "24.03193-4@maua.br",
          name: "João Santos",
          role: "member",
          modality: "Valorant",
          paeHours: 10
        }
      ];
      return res.json(mockUsers);
    }
    
    // Se não, buscar do banco de dados
    const users = await User.find({});
    console.log('Usuários encontrados:', users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
});

// GET /api/users/:id - Obter usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
  }
});

// POST /api/users - Criar novo usuário
router.post('/', async (req, res) => {
  try {
    const { email, discordId, name, role, modality, paeHours } = req.body;
    
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'Usuário com este email já existe' });
    }
    
    const user = await User.create({
      email,
      discordId,
      name,
      role,
      modality,
      paeHours
    });
    
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400).json({ message: 'Dados de usuário inválidos' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
});

// PUT /api/users/:id - Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const { email, discordId, name, role, modality, paeHours } = req.body;
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Verifica se o e-mail já existe em outro usuário
    if (email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email já está em uso' });
      }
    }
    
    user.email = email || user.email;
    user.discordId = discordId || user.discordId;
    user.name = name || user.name;
    user.role = role || user.role;
    user.modality = modality || user.modality;
    user.paeHours = paeHours || user.paeHours;
    
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
});

// DELETE /api/users/:id - Excluir usuário
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    await user.deleteOne();
    res.json({ message: 'Usuário removido' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
  }
});

module.exports = router;