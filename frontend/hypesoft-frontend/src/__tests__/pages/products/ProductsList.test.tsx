import { render, screen } from "@testing-library/react";
import ProductsList from "@/pages/products/ProductsList";

const ProductsListAny = ProductsList as any;

describe("ProductsList", () => {
  it("renderiza lista de produtos", () => {
    render(<ProductsListAny products={[{ id: 10, name: "Teclado" }]} />);

    expect(screen.getByText(/teclado/i)).toBeInTheDocument();
  });
});
