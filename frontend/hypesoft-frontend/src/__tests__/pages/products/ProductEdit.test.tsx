import { render, screen } from "@testing-library/react";
import ProductEdit from "@/pages/products/ProductEdit";

describe("ProductEdit Component", () => {
  it("renderiza formulário de edição", () => {
    const Comp: any = ProductEdit;
    render(<Comp product={{ id: "1", name: "PC Gamer" }} />);
    expect(screen.getByDisplayValue(/pc gamer/i)).toBeInTheDocument();
  });
});
