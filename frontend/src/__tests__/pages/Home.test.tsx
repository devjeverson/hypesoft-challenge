import { render, screen } from "@testing-library/react";
import Home from "@/pages/Home";

describe("Home Page", () => {
  it("renderiza título da Home", () => {
    render(<Home />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});
