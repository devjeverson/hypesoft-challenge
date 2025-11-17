import { render, screen } from "@testing-library/react";
import AppRoutes from "@/router";

// mocka RequireAuth para permitir acesso (usuário logado)
jest.mock("@/router", () => {
  const original = jest.requireActual("@/router");
  return {
    __esModule: true,
    ...original,
    RequireAuth: ({ children }: any) => <>{children}</>,
  };
});

describe("Router Authenticated", () => {
  it("permite acessar dashboard quando autenticado", () => {
    render(<AppRoutes />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
