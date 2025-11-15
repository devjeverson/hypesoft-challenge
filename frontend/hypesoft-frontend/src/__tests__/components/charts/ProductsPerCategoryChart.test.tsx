import { render, screen } from "@testing-library/react";
import ProductsPerCategoryChart from "@/components/charts/ProductsPerCategoryChart";

describe("ProductsPerCategoryChart", () => {
  it("exibe título do gráfico", () => {
    render(<ProductsPerCategoryChart data={[]} />);
    expect(screen.getByText(/produtos por categoria/i)).toBeInTheDocument();
  });
});
