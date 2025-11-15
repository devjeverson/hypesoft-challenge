import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("aceita entrada de texto", async () => {
    render(<Input placeholder="Nome" />);
    const input = screen.getByPlaceholderText("Nome");

    await userEvent.type(input, "Teste");

    expect(input).toHaveValue("Teste");
  });
});
