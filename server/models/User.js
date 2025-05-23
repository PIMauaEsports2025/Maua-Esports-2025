const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  discordId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'captain', 'member'],
    default: 'member'
  },
  modality: {
    type: String
  },
  paeHours: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'Usuários' // Definindo explicitamente o nome da coleção
});

// Verificar se o modelo já foi registrado para evitar erros
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;