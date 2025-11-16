import Keycloak from "keycloak-js";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AuthContextType {
  initialized: boolean;
  isAuthenticated: boolean;
  keycloak: Keycloak | null;
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
        onLoad: "login-required",
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        setAuth((prevAuth) => ({
          ...prevAuth,
          initialized: true,
          isAuthenticated: authenticated,
          keycloak: keycloakInstance,
        }));
      });
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
