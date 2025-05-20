// Configuração do Microsoft Authentication Library (MSAL)
export const msalConfig = {
  auth: {
    clientId: "5c2f6178-194c-414d-a1f1-6c91a80eff28", // Este é o Client ID do Azure Portal
    authority:
      "https://login.microsoftonline.com/c49e1939-4b53-4738-bb64-41fb2990e41c", // Tenant ID específico da Mauá
    redirectUri: window.location.origin, // Redireciona para a página atual após login
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

// Escopos que a aplicação solicita
export const loginRequest = {
  scopes: ["User.Read", "email", "profile"],
};

// Configuração para obter o token silenciosamente
export const silentRequest = {
  scopes: ["User.Read", "email", "profile"],
};
