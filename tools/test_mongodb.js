// Script para testar a conexão com o MongoDB
const mongoose = require("mongoose");
require("dotenv").config();

// URI de conexão
const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://mauaesports:mauaesports@cluster1.mujq5ew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

console.log("Tentando conectar ao MongoDB...");
console.log(`URI: ${mongoURI.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@")}`); // Oculta credenciais no log

mongoose
  .connect(mongoURI)
  .then((conn) => {
    console.log("==================================================");
    console.log("✅ Conexão com MongoDB bem-sucedida!");
    console.log(`Servidor MongoDB: ${conn.connection.host}`);
    console.log(`Banco de dados: ${conn.connection.name}`);
    console.log("==================================================");

    // Lista as coleções disponíveis
    return conn.connection.db.listCollections().toArray();
  })
  .then((collections) => {
    if (collections.length === 0) {
      console.log("❗ O banco de dados não possui coleções.");
      console.log("Você pode precisar popular o banco de dados com:");
      console.log("   npm run seed");
      console.log("   ou");
      console.log("   curl -X POST http://localhost:5000/api/seed");
    } else {
      console.log("📋 Coleções disponíveis:");
      collections.forEach((collection) => {
        console.log(`   - ${collection.name}`);
      });
    }

    // Encerra a conexão
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Conexão fechada.");
    process.exit(0);
  })
  .catch((err) => {
    console.log("==================================================");
    console.log("❌ Erro ao conectar ao MongoDB:");
    console.log(err);
    console.log("==================================================");

    console.log("🔍 Possíveis causas:");
    console.log("1. String de conexão incorreta");
    console.log("2. Usuário ou senha inválidos");
    console.log("3. IP não está na lista de IPs permitidos");
    console.log("4. Problemas de rede/firewall");
    console.log("5. Cluster MongoDB não está disponível");

    console.log("🛠️ Soluções:");
    console.log("1. Verifique a string de conexão no arquivo .env");
    console.log("2. Verifique se as credenciais estão corretas");
    console.log(
      "3. Adicione seu IP atual à lista de IPs permitidos no MongoDB Atlas"
    );
    console.log("4. Verifique sua conexão com a internet");
    console.log("5. Verifique o status do serviço MongoDB Atlas");

    process.exit(1);
  });
