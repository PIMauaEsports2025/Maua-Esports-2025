const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');

// String de conexão com o MongoDB Atlas
const dbURI = 'mongodb+srv://mauaesports:mauaesports@cluster1.mujq5ew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

// Função para popular o banco de dados
const seedDatabase = async () => {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB para seed');

    // Limpar coleções existentes
    await User.deleteMany({});
    console.log('Coleções limpas');

    // Ler arquivo de usuários
    const usersFilePath = path.join(__dirname, '..', 'API-Server', 'users.json');
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    // Inserir usuários no banco
    await User.insertMany(usersData.users);
    console.log(`${usersData.users.length} usuários inseridos`);

    console.log('Banco de dados populado com sucesso!');
    
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  } finally {
    // Fechar conexão
    await mongoose.connection.close();
    console.log('Conexão fechada');
    process.exit(0);
  }
};

// Executar o script
seedDatabase();