import React, { createContext, useContext, useEffect, useState } from "react";
import keycloak from "./keycloak";

type AuthContextType = {
  initialized: boolean;
  isAuthenticated: boolean;
  token?: string | null;
  username?: string | null;
  login: () => void;
  logout: () => void;
  getToken: () => Promise<string | undefined>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

useEffect(() => {
  keycloak
    .init({
      onLoad: window.location.href.includes("code=")
        ? "check-sso"
        : "login-required",
      pkceMethod: "S256",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
    })
    .then((auth) => {
      setInitialized(true);
      setIsAuthenticated(auth);
      setToken(keycloak.token ?? null);

      if (keycloak.tokenParsed) {
        const parsed = keycloak.tokenParsed as any;
        setUsername(parsed.preferred_username || parsed.email || null);
      }

      keycloak.onTokenExpired = () => {
        keycloak
          .updateToken(30)
          .then(() => setToken(keycloak.token ?? null))
          .catch(() => keycloak.logout());
      };
    })
    .catch(() => {
      setInitialized(true);
      setIsAuthenticated(false);
    });
}, []);


  const login = () => keycloak.login();
  const logout = () => keycloak.logout();

  const getToken = async () => {
    try {
      await keycloak.updateToken(30);
      return keycloak.token ?? undefined;
    } catch {
      return undefined;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        initialized,
        isAuthenticated,
        token,
        username,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
