const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  modalityId: { // ID from the external Mauá Esports API
    type: String,
    required: true,
  },
  modalityName: { // Denormalized name for easier display
    type: String,
    required: true,
  },
  modalityTag: { // Denormalized tag for easier display
    type: String,
    required: true,
  },
  startTimestamp: {
    type: Date,
    required: true,
  },
  endTimestamp: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'RUNNING', 'COMPLETED', 'CANCELED'],
    default: 'SCHEDULED',
  },
  attendedPlayers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model
  }],
  description: { // Optional: a brief description for the training
    type: String,
  }
}, {
  timestamps: true,
  collection: 'Treinos',
});

const Training = mongoose.models.Training || mongoose.model('Training', trainingSchema);

module.exports = Training;