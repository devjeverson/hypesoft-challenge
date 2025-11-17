import { render, screen } from "@testing-library/react";
import CategoriesPage from "@/pages/categories/CategoriesPage";

describe("CategoriesPage", () => {
  it("renderiza título da página de categorias", () => {
    render(<CategoriesPage />);
    expect(screen.getByText(/categorias/i)).toBeInTheDocument();
  });
});
