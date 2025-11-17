import { render, screen } from "@testing-library/react";
import ProductListPage from "@/pages/products/ProductListPage";
import * as useProducts from "@/hooks/useProducts";

jest.spyOn(useProducts, "useProducts");

describe("ProductListPage", () => {
  it("mostra produtos na tabela", () => {
    jest.spyOn(useProducts, "useProducts").mockReturnValue({
      products: [{ id: 1, name: "Headset" }],
      loading: false,
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as ReturnType<typeof useProducts.useProducts>);

    render(<ProductListPage />);

    expect(screen.getByText(/headset/i)).toBeInTheDocument();
  });
});
