const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Inicializa o app Express
const app = express();

// Configura o CORS para aceitar requisições de diferentes origens
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5001', 'http://localhost:5000'],
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

// Rota de teste
app.get('/', (req, res) => {
  res.send({
    status: 'online',
    message: 'API Mauá E-Sports está funcionando',
    mongoStatus: global.useMockData ? 'offline (usando dados mockados)' : 'conectado',
    timestamp: new Date().toISOString()
  });
});

// Rota para popular o banco de dados com dados iniciais
app.post('/api/seed', async (req, res) => {
  try {
    const User = require('./models/User');
    
    // Limpa o banco de dados
    await User.deleteMany({});
    
    // Importa os dados iniciais
    const initialData = [
      {
        email: "24.01193-2@maua.br",
        discordId: "000000000000000001",
        name: "Lucas Silva",
        role: "captain",
        modality: "Counter-Strike 2",
        paeHours: 15
      },
      {
        email: "24.02193-3@maua.br",
        discordId: "000000000000000002",
        name: "Maria Oliveira",
        role: "member",
        modality: "League of Legends",
        paeHours: 12
      },
      {
        email: "24.03193-4@maua.br",
        discordId: "000000000000000003",
        name: "João Santos",
        role: "member",
        modality: "Valorant",
        paeHours: 10
      }
    ];
    
    // Insere os usuários no banco de dados
    await User.insertMany(initialData);
    
    res.status(201).json({ message: 'Banco de dados populado com sucesso!' });
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
    res.status(500).json({ message: 'Erro ao popular banco de dados', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});