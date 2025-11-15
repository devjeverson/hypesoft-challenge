// src/pages/login/LoginPage.tsx
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Login</h1>
      <button
        onClick={login}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Entrar com Keycloak
      </button>
    </div>
  );
}
