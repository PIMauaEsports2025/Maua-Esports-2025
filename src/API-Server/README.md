# 🧑‍💻 API de Gerenciamento de Usuários - Mauá Esports

Este projeto implementa uma **API simples** para gerenciamento de usuários do Mauá Esports, utilizando um **arquivo JSON como banco de dados**.

---

## 📋 Sobre

Esta API permite que diferentes máquinas acessem e modifiquem os dados dos membros da equipe Mauá Esports, fornecendo operações básicas de **CRUD**:

- Criar
- Ler
- Atualizar
- Excluir

---

## 🛠️ Estrutura de Dados

O arquivo `users.json` armazena os seguintes dados para cada usuário:

```json
{
  "users": [
    {
      "_id": "1",
      "email": "24.00123-4@maua.br",
      "discordId": "000000000000000001",
      "name": "Lucas Silva",
      "role": "admin",
      "modality": "Counter Strike 2",
      "paeHours": 15
    }
  ],
  "lastUpdate": "2023-11-14T16:30:00.000Z"
}
```

### Campos

- `_id`: Identificador único do usuário  
- `email`: RA institucional (formato `XX.XXXXX-X@maua.br`)  
- `discordId`: ID do Discord do usuário  
- `name`: Nome completo do usuário  
- `role`: Função (`admin`, `captain`, `member`)  
- `modality`: Modalidade/jogo do usuário  
- `paeHours`: Horas PAE acumuladas  

---

## ⚙️ Instalação

```bash
# 1. Certifique-se de ter o Node.js instalado
# 2. Clone este repositório
git clone https://github.com/seu-usuario/sua-api-maua-esports.git
cd sua-api-maua-esports

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
node server.js
```

---

## 🚀 Uso da API

### Endpoints

| Método  | Endpoint           | Descrição                   |
|---------|--------------------|-----------------------------|
| GET     | `/api/users`       | Listar todos os usuários    |
| GET     | `/api/users/:id`   | Buscar usuário por ID       |
| POST    | `/api/users`       | Adicionar novo usuário      |
| PUT     | `/api/users/:id`   | Atualizar usuário existente |
| DELETE  | `/api/users/:id`   | Remover usuário             |

---

### Exemplos de Uso

#### Listar todos os usuários

```http
GET http://localhost:3000/api/users
```

#### Buscar usuário específico

```http
GET http://localhost:3000/api/users/1
```

#### Adicionar novo usuário

```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "email": "24.01234-5@maua.br",
  "discordId": "000000000000000006",
  "name": "Rafael Moreira",
  "role": "member",
  "modality": "League of Legends",
  "paeHours": 5
}
```

#### Atualizar usuário existente

```http
PUT http://localhost:3000/api/users/3
Content-Type: application/json

{
  "email": "24.00789-0@maua.br",
  "discordId": "000000000000000003",
  "name": "João Pereira",
  "role": "captain",
  "modality": "League of Legends",
  "paeHours": 12
}
```

#### Remover usuário

```http
DELETE http://localhost:3000/api/users/2
```

---

## ⚠️ Observações

- O servidor deve estar rodando para que as operações funcionem.
- Para acesso remoto, substitua `localhost` pelo IP do servidor.
- Certifique-se de que o arquivo `users.json` tem permissões de escrita.

---

## 📞 Suporte

Em caso de dúvidas ou problemas, entre em contato com a equipe de desenvolvimento do **Mauá Esports**.
