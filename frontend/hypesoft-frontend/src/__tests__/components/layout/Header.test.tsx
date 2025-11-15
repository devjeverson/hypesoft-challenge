import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("renderiza o texto do header", () => {
    render(<Header />);
    expect(screen.getByText(/hypesoft/i)).toBeInTheDocument();
  });
});
