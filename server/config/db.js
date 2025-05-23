const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Especificando explicitamente o banco de dados na URI
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://mauaesports:mauaesports@cluster1.mujq5ew.mongodb.net/MauáEsports?retryWrites=true&w=majority&appName=Cluster1';
    
    console.log('Tentando conectar ao MongoDB...');
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`MongoDB conectado: ${conn.connection.host}`);
    
    // Listar as coleções disponíveis para diagnóstico
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Coleções disponíveis:', collections.map(c => c.name));
    
    return conn;
  } catch (error) {
    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;