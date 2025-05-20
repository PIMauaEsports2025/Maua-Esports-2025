const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Usando a variável de ambiente do .env ou a string de conexão diretamente como fallback
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://mauaesports:mauaesports@cluster1.mujq5ew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
    
    console.log('Tentando conectar ao MongoDB...');
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000 // Timeout após 5 segundos
    });

    console.log(`✅ MongoDB conectado com sucesso! Servidor: ${conn.connection.host}`);
    return conn;  } catch (error) {
    console.error('==================================================');
    console.error(`❌ Erro ao conectar ao MongoDB: ${error.message}`);
    console.error('Detalhes completos:', error);
    console.error('==================================================');
    console.error('🔍 Possíveis causas:');
    console.error('1. String de conexão incorreta');
    console.error('2. Usuário ou senha inválidos');
    console.error('3. IP não está na lista de IPs permitidos no MongoDB Atlas');
    console.error('4. Problemas de rede/firewall');
    console.error('5. Verifique se o cluster MongoDB está disponível');
    console.error('==================================================');
    
    // Em ambiente de desenvolvimento, continua com dados mockados
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Continuando em modo de desenvolvimento com dados mockados');
      return null; // Retorna null para indicar que devemos usar dados mockados
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;