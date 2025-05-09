import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

require('dotenv').config();
const express = require('express');
const msal = require('@azure/msal-node');

const app = express();
const port = 3000;

const config = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: 'https://login.microsoftonline.com/common',
    clientSecret: process.env.CLIENT_SECRET
  }
};

const cca = new msal.ConfidentialClientApplication(config);

const authCodeUrlParameters = {
  scopes: ["user.read"],
  redirectUri: process.env.REDIRECT_URI
};

app.get('/login', async (req, res) => {
  try {
    const authUrl = await cca.getAuthCodeUrl(authCodeUrlParameters);
    res.redirect(authUrl);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/redirect', async (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read"],
    redirectUri: process.env.REDIRECT_URI
  };

  try {
    const response = await cca.acquireTokenByCode(tokenRequest);
    res.send(`<h2>Login Microsoft feito!</h2><p>Usuário: ${response.account.username}</p>`);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
