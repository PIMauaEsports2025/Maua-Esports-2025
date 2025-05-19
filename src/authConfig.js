export const msalConfig = {
  auth: {
    clientId: "5c2f6178-194c-414d-a1f1-6c91a80eff28",
    authority: "https://login.microsoftonline.com/c49e1939-4b53-4738-bb64-41fb2990e41c",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
  scopes: ["User.Read"],
};