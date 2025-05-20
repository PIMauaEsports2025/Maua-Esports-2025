import React, { createContext, useState, useContext, useEffect } from 'react';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { msalConfig, loginRequest, silentRequest } from './msalConfig';

// Cria contexto de autenticação
const AuthContext = createContext();

// Hook personalizado para uso do contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Inicializa MSAL
const msalInstance = new PublicClientApplication(msalConfig);

// Certifique-se de inicializar a instância antes de qualquer uso
msalInstance.initialize().catch(error => {
  console.error("Falha ao inicializar MSAL:", error);
});

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inicializa o estado de autenticação
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Garante que MSAL está inicializado
        await msalInstance.initialize();
        
        // Se já há contas logadas, seleciona a primeira
        const accounts = msalInstance.getAllAccounts();
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          try {
            // Tenta obter o token silenciosamente
            await msalInstance.acquireTokenSilent({
              ...silentRequest,
              account: accounts[0]
            });
          } catch (error) {
            console.error("Erro ao adquirir token silenciosamente:", error);
          }
        }
      } catch (error) {
        console.error("Erro na inicialização da autenticação:", error);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  // Função para login
  const login = async () => {
    try {
      setLoading(true);
      const response = await msalInstance.loginPopup(loginRequest);
      
      if (response) {
        setAccount(response.account);
        console.log("Login successful", response);
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Erro ao fazer login. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para logout
  const logout = () => {
    msalInstance.logoutPopup({
      postLogoutRedirectUri: window.location.origin,
    });
    setAccount(null);
  };

  // Valores a serem disponibilizados pelo contexto
  const authContextValue = {
    account,
    isAuthenticated: !!account,
    login,
    logout,
    loading,
    msalInstance,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};