# 🎮 Mauá Esports - Plataforma Oficial

## 📌 Sobre o Projeto
O **Mauá Esports** é a plataforma oficial da equipe de esports do Instituto Mauá de Tecnologia. O site tem como objetivo centralizar informações sobre eventos, campeonatos, jogadores e notícias, proporcionando uma experiência interativa e dinâmica para a comunidade.

## 🚀 Tecnologias Utilizadas

### **Frontend**
- ⚛️ **React.js** - Framework principal para construção da interface dinâmica e responsiva.
- ☁️ **AWS Amplify** - Serviço de hospedagem e backend serverless para escalabilidade.

### **Backend**
- 🟢 **Node.js** + **Express.js** - Servidor robusto e escalável para processar as requisições da aplicação.
- 🗂️ **MongoDB** - Banco de dados NoSQL para armazenamento flexível das informações.
- 🔑 **Microsoft Azure AD OAuth** - Autenticação segura e gerenciamento de identidades.

### **Ferramentas Auxiliares**
- 🔧 **GitHub** - Controle de versão e colaboração no código-fonte.
- 🎨 **Figma** - Protótipos e design da interface.
- ☁️ **MongoDB Atlas** - Banco de dados hospedado na nuvem para maior disponibilidade.
- 🚀 **Vercel/Netlify** - Hospedagem do frontend.
- 🌍 **Railway/Render** - Hospedagem do backend.

## 📂 Estrutura do Projeto
```
Maua-Esports-2025/
├─ public/
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  ├─ maua-branco.png
│  └─ robots.txt
├─ src/
│  ├─ assets/
│  │  ├─ games/
│  │  │  ├─ cs2.jpg
│  │  │  ├─ eafc25.jpg
│  │  │  ├─ lol.jpg
│  │  │  ├─ rainbow6.jpg
│  │  │  ├─ rocketleague.jpg
│  │  │  ├─ tft.jpg
│  │  │  └─ valorant.jpg
│  │  ├─ ui/
│  │  │  ├─ HeroBanner.jpg
│  │  │  └─ maua-branco.png
│  │  └─ LoginBack.png
│  ├─ Components/
│  │  ├─ Admin/
│  │  │  ├─ DashBoard.jsx
│  │  │  ├─ ModalitiesList.jsx
│  │  │  ├─ PaeHoursControl.jsx
│  │  │  ├─ PaeHoursView.jsx
│  │  │  ├─ ScheduledTrainingsEditor.jsx
│  │  │  ├─ TeamManagement.jsx
│  │  │  ├─ TrainingList.jsx
│  │  │  └─ UserManagement.jsx
│  │  ├─ Layout/
│  │  │  ├─ Footer.jsx
│  │  │  └─ Header.jsx
│  │  ├─ UI/
│  │  │  ├─ Notification.jsx
│  │  │  └─ NotificationManager.jsx
│  │  ├─ AdminInterface.jsx
│  │  ├─ Contact.jsx
│  │  ├─ Home.jsx
│  │  ├─ LoginRegister.jsx
│  │  └─ Sobre.jsx
│  ├─ models/
│  │  └─ models.js
│  ├─ Service/
│  │  └─ api.js
│  ├─ Stage-API-Maua-Esports-main/
│  │  ├─ .env.example
│  │  ├─ .gitattributes
│  │  ├─ .gitignore
│  │  ├─ defaultModalities.json
│  │  ├─ defaultTrains.json
│  │  ├─ index.js
│  │  ├─ LICENSE
│  │  ├─ package.json
│  │  └─ README.md
│  ├─ styles/
│  │  ├─ Admin/
│  │  │  ├─ Dashboard.css
│  │  │  ├─ ModalitiesList.css
│  │  │  ├─ PaeHoursControl.css
│  │  │  ├─ PaeHoursView.css
│  │  │  ├─ ScheduledTrainingsEditor.css
│  │  │  ├─ TeamManagement.css
│  │  │  ├─ TrainingsList.css
│  │  │  └─ UserManagement.css
│  │  ├─ Layout/
│  │  │  ├─ Footer.css
│  │  │  └─ Header.css
│  │  ├─ UI/
│  │  │  └─ Notification.css
│  │  ├─ AdminInterface.css
│  │  ├─ App.css
│  │  ├─ Contact.css
│  │  ├─ Home.css
│  │  ├─ index.css
│  │  ├─ LoginRegister.css
│  │  └─ Sobre.css
│  ├─ App.js
│  ├─ App.test.js
│  ├─ index.js
│  ├─ logo.svg
│  ├─ reportWebVitals.js
│  └─ setupTests.js
├─ .gitignore
├─ .hintrc
├─ LICENSE
├─ package-lock.json
├─ package.json
└─ README.md

```

## 📜 Instalação e Execução

### 🔧 **Pré-requisitos**
Antes de iniciar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### 🛠️ **Passo a Passo**
```sh
# Clone o repositório
git clone https://github.com/PIMauaEsports2025/Maua-Esports-2025.git
cd maua-esports
```

#### 📌 **Rodar o Projeto**
```sh
npm install  # Instalar dependências
npm start  # Iniciar servidor backend e frontend 
# Dependências já instaladas no npm
```
## 📌 Funcionalidades
#### ✅ Cadastro e login de usuários 
#### ✅ Página principal com informações e atualizações
#### ✅ Sistema de gerenciamento de torneios
#### ✅ Perfil dos jogadores e estatísticas
#### ✅ Dashboard para administradores

## 📸 Preview (Figma)
🔗 [Clique aqui para visualizar o design](https://www.figma.com/design/ANWM55epeLisAus2vfac3R/PI-3%C2%BA-Semestre---Mau%C3%A1-E-Sports?node-id=0-1&p=f&t=pgtO1yUtCPUn8CyO-0)

## 🤝 Contribuição
Quer contribuir com o projeto? Siga os passos:
1. **Fork** o repositório 🍴
2. Crie uma **branch** com sua funcionalidade (`git checkout -b feature/minha-feature`) 🌱
3. Faça o **commit** das alterações (`git commit -m 'Adiciona minha feature'`) 💡
4. Faça o **push** para a branch (`git push origin feature/minha-feature`) 🚀
5. Abra um **Pull Request** 📝

## 🔥 Padrão de Commits
Utilizamos o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) para manter um histórico de commits organizado e padronizado.

## 📝 Licença
Este projeto está sob a licença **MIT**. Sinta-se à vontade para utilizá-lo e modificá-lo conforme necessário.

---
**Desenvolvido com 💙 pela equipe Mauá Esports.**
#### 🧑‍💻 [Breno Augusto - 24.01496-6](https://github.com/BrenoAugustoOG)
#### 🧑‍💻 [Gustavo Seripierri - 24.00630-0](https://github.com/GustavoSeripierri)
#### 👩‍💻 [Leticia de Carvalho - 24.00141-4](https://github.com/leticiacarvalhoo)
#### 👩‍💻 [Lyssa Okawa - 24.01193-2](https://github.com/lyssaokawaperini)

