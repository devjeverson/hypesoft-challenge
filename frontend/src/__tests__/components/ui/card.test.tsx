import { render, screen } from "@testing-library/react";
import { Card, CardContent } from "@/components/ui/card";

describe("Card", () => {
  it("renderiza conteúdo", () => {
    render(
      <Card>
        <CardContent>Conteúdo de Teste</CardContent>
      </Card>
    );

    expect(screen.getByText(/conteúdo de teste/i)).toBeInTheDocument();
  });
});
