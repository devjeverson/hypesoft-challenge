import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Keycloak from "keycloak-js";

interface AuthContextType {
  initialized: boolean;
  isAuthenticated: boolean;
  keycloak: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  initialized: false,
  isAuthenticated: false,
  keycloak: null,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

// ✔ keycloak-js LEGADO → instância correta (SEM new)
const keycloakInstance = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthContextType>({
    initialized: false,
    isAuthenticated: false,
    keycloak: null,
    login: () => keycloakInstance.login(),
    logout: () => keycloakInstance.logout(),
  });

  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    keycloakInstance
      .init({
        onLoad: "check-sso",
        checkLoginIframe: false,
        pkceMethod: "S256", // Adiciona segurança extra
        flow: "standard", // ou "implicit"
      })
      .then((authenticated: any) => {
        console.log("Keycloak initialized:", authenticated);
        
        // Configura refresh token automático
        keycloakInstance.onTokenExpired = () => {
          keycloakInstance.updateToken(30).catch(() => {
            console.error("Failed to refresh token");
            keycloakInstance.login();
        });
      };

        setAuth({
          initialized: true,
          isAuthenticated: authenticated,
          keycloak: keycloakInstance,
          login: () => keycloakInstance.login(),
          logout: () => keycloakInstance.logout(),
        });
      })
      .catch((err: any) => {
        console.error("Keycloak init error:", err);
          // Ainda marca como inicializado para não bloquear a aplicação
        setAuth({
          initialized: true,
          isAuthenticated: false,
          keycloak: keycloakInstance,
          login: () => keycloakInstance.login(),
          logout: () => keycloakInstance.logout(),
        });
      });
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
