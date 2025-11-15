import { render, screen } from "@testing-library/react";
import Sidebar from "@/components/layout/Header";

describe("Sidebar", () => {
  it("renderiza os links principais", () => {
    render(<Sidebar />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/produtos/i)).toBeInTheDocument();
    expect(screen.getByText(/categorias/i)).toBeInTheDocument();
  });
});
