import { render, screen } from "@testing-library/react";
import { Label } from "@/components/ui/label";

describe("Label", () => {
  it("renderiza corretamente", () => {
    render(<Label htmlFor="x">Produto</Label>);
    expect(screen.getByText("Produto")).toBeInTheDocument();
  });
});
