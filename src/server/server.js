const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Inicializa o app Express
const app = express();

// Conecta ao banco de dados
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está funcionando');
});

// Rota para popular o banco de dados com dados iniciais
app.post('/api/seed', async (req, res) => {
  try {
    const User = require('./models/User');
    
    // Limpa o banco de dados
    await User.deleteMany({});
    
    // Importa os dados iniciais do arquivo users.json
    const fs = require('fs');
    const path = require('path');
    const usersData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', 'API-Server', 'users.json'),
        'utf8'
      )
    );
    
    // Insere os usuários no banco de dados
    await User.insertMany(usersData.users);
    
    res.status(201).json({ message: 'Banco de dados populado com sucesso!' });
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
    res.status(500).json({ message: 'Erro ao popular banco de dados', error: error.message });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Para tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error(`Erro não tratado: ${err.message}`);
  process.exit(1);
});