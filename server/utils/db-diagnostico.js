// Script para diagnosticar problemas de conexão com o MongoDB
const mongoose = require('mongoose');

// Usar a string de conexão que você está utilizando em sua aplicação
// Certifique-se de incluir o nome do banco de dados na URL
const MONGO_URI = 'mongodb+srv://mauaesports:mauaesports@cluster1.mujq5ew.mongodb.net/MauáEsports?retryWrites=true&w=majority&appName=Cluster1';

async function diagnosticarConexao() {
  console.log('🔍 Iniciando diagnóstico de conexão com MongoDB...');
  console.log('URI de conexão:', MONGO_URI.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://****:****@'));
  
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000 // 10 segundos para timeout
    });
    
    console.log('✅ Conexão estabelecida com sucesso!');
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Nome do banco de dados: ${conn.connection.name}`);
    
    // Verificar coleções
    const collections = await conn.connection.db.listCollections().toArray();
    if (collections.length === 0) {
      console.log('❌ PROBLEMA DETECTADO: Não existem coleções no banco de dados');
      console.log('Solução: Crie as coleções necessárias manualmente no MongoDB Atlas ou execute o endpoint /api/seed');
    } else {
      console.log('Coleções encontradas:');
      collections.forEach(c => console.log(`- ${c.name}`));
      
      // Verificar se a coleção Usuários existe
      const usersCollection = collections.find(c => 
        c.name === 'Usuários' || c.name === 'usuarios' || c.name === 'users' || c.name === 'Users');
      
      if (!usersCollection) {
        console.log('❌ PROBLEMA DETECTADO: Coleção de usuários não encontrada');
        console.log('Solução: Crie a coleção "Usuários" no MongoDB Atlas ou execute o endpoint /api/seed');
      } else {
        console.log(`✅ Coleção de usuários encontrada: ${usersCollection.name}`);
        
        // Verificar documentos
        const count = await conn.connection.db.collection(usersCollection.name).countDocuments();
        console.log(`Total de documentos: ${count}`);
        
        if (count === 0) {
          console.log('❌ PROBLEMA DETECTADO: A coleção de usuários está vazia');
          console.log('Solução: Execute o endpoint /api/seed para popular o banco de dados');
        } else {
          // Mostrar exemplo de documento
          const sample = await conn.connection.db.collection(usersCollection.name).findOne();
          console.log('Exemplo de documento:');
          console.log(JSON.stringify(sample, null, 2));
        }
      }
    }
    
    // Verificar modelo
    try {
      const User = mongoose.model('User');
      const modelUsers = await User.find().limit(2);
      console.log(`✅ Modelo 'User' encontrou ${modelUsers.length} documentos`);
      
      if (modelUsers.length > 0) {
        console.log('Exemplo de documento através do modelo:');
        console.log(JSON.stringify(modelUsers[0].toObject(), null, 2));
      }
    } catch (modelError) {
      console.log('❌ PROBLEMA DETECTADO: Erro ao usar o modelo User');
      console.log('Erro:', modelError.message);
      console.log('Solução: Verifique se o modelo está definido corretamente e se o nome da coleção está correto');
    }
    
  } catch (error) {
    console.error('==================================================');
    console.error(`❌ ERRO DE CONEXÃO: ${error.message}`);
    console.error('Detalhes completos:', error);
    console.error('==================================================');
    console.error('🔍 Possíveis causas:');
    console.error('1. String de conexão incorreta');
    console.error('2. Usuário ou senha inválidos');
    console.error('3. IP não está na lista de IPs permitidos no MongoDB Atlas');
    console.error('4. Problemas de rede/firewall');
    console.error('5. Verifique se o cluster MongoDB está disponível');
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('Desconectado do MongoDB');
    }
  }
}

// Executar diagnóstico
diagnosticarConexao().then(() => console.log('Diagnóstico concluído'));