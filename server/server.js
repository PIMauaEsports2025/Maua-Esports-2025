const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const trainingRoutes = require('./routes/trainingRoutes'); // Import training routes

// Inicializa o app Express
const app = express();

// Configura o CORS para aceitar requisições de diferentes origens
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5001', 'http://localhost:5000', 'http://localhost:5173'], // Added 5173 for Vite default
  credentials: true
}));

// Conecta ao banco de dados
connectDB()
  .then(connection => {
    if (!connection) {
      console.log('⚠️ Usando modo offline com dados mockados');
      // Configura variável global para indicar uso de dados mockados
      global.useMockData = true;
    } else {
      global.useMockData = false;
    }
  });

// Middleware
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/trainings', trainingRoutes); // Use training routes

// Rota de teste
app.get('/', (req, res) => {
  res.send({
    status: 'online',
    message: 'API Mauá E-Sports está funcionando',
    mongoStatus: global.useMockData ? 'offline (usando dados mockados)' : 'conectado',
    timestamp: new Date().toISOString()
  });
});

// Rota para popular o banco de dados com dados iniciais (se necessário)
// ... (seu código de /api/seed existente)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});