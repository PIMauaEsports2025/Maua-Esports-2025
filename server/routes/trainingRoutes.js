const express = require('express');
const router = express.Router();
const Training = require('../models/Training');
const User = require('../models/User'); // To validate participants

// GET /api/trainings - Obter todos os treinos
router.get('/', async (req, res) => {
  try {
    const trainings = await Training.find({}).populate('attendedPlayers', 'name email'); // Populate participant details
    res.json(trainings);
  } catch (error) {
    console.error('Error fetching trainings:', error);
    res.status(500).json({ message: 'Erro ao buscar treinos', error: error.message });
  }
});

// GET /api/trainings/:id - Obter treino por ID
router.get('/:id', async (req, res) => {
  try {
    const training = await Training.findById(req.params.id).populate('attendedPlayers', 'name email');
    if (!training) {
      return res.status(404).json({ message: 'Treino não encontrado' });
    }
    res.json(training);
  } catch (error) {
    console.error('Error fetching training:', error);
    res.status(500).json({ message: 'Erro ao buscar treino', error: error.message });
  }
});

// POST /api/trainings - Criar novo treino
router.post('/', async (req, res) => {
  try {
    const {
      modalityId,
      modalityName,
      modalityTag,
      startTimestamp,
      endTimestamp,
      status,
      description,
      attendedPlayers // Expecting an array of User IDs
    } = req.body;

    if (!modalityId || !modalityName || !modalityTag || !startTimestamp || !endTimestamp) {
        return res.status(400).json({ message: 'Campos obrigatórios da modalidade e datas estão faltando.' });
    }

    const newTraining = new Training({
      modalityId,
      modalityName,
      modalityTag,
      startTimestamp: new Date(startTimestamp),
      endTimestamp: new Date(endTimestamp),
      status,
      description,
      attendedPlayers: attendedPlayers || []
    });

    const savedTraining = await newTraining.save();
    const populatedTraining = await Training.findById(savedTraining._id).populate('attendedPlayers', 'name email');
    res.status(201).json(populatedTraining);
  } catch (error) {
    console.error('Error creating training:', error);
    res.status(500).json({ message: 'Erro ao criar treino', error: error.message });
  }
});

// PUT /api/trainings/:id - Atualizar treino
router.put('/:id', async (req, res) => {
  try {
    const {
      modalityId,
      modalityName,
      modalityTag,
      startTimestamp,
      endTimestamp,
      status,
      description,
      attendedPlayers // Expecting an array of User IDs
    } = req.body;

    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Treino não encontrado' });
    }

    training.modalityId = modalityId || training.modalityId;
    training.modalityName = modalityName || training.modalityName;
    training.modalityTag = modalityTag || training.modalityTag;
    training.startTimestamp = startTimestamp ? new Date(startTimestamp) : training.startTimestamp;
    training.endTimestamp = endTimestamp ? new Date(endTimestamp) : training.endTimestamp;
    training.status = status || training.status;
    training.description = description !== undefined ? description : training.description;
    
    if (attendedPlayers !== undefined) {
        // Basic validation: ensure attendedPlayers is an array
        if (!Array.isArray(attendedPlayers)) {
            return res.status(400).json({ message: 'attendedPlayers deve ser um array de IDs de usuário.' });
        }
        training.attendedPlayers = attendedPlayers;
    }

    const updatedTraining = await training.save();
    const populatedTraining = await Training.findById(updatedTraining._id).populate('attendedPlayers', 'name email');
    res.json(populatedTraining);
  } catch (error) {
    console.error('Error updating training:', error);
    res.status(500).json({ message: 'Erro ao atualizar treino', error: error.message });
  }
});

// DELETE /api/trainings/:id - Excluir treino
router.delete('/:id', async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: 'Treino não encontrado' });
    }
    await training.deleteOne();
    res.json({ message: 'Treino removido com sucesso' });
  } catch (error) {
    console.error('Error deleting training:', error);
    res.status(500).json({ message: 'Erro ao excluir treino', error: error.message });
  }
});

module.exports = router;