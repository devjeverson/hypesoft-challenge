import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm  from "@/components/forms/ProductForm";

describe("ProductForm", () => {
  it("chama onSubmit com dados corretamente", async () => {
    const onSave = jest.fn();
    render(<ProductForm onSave={onSave} />);

    await userEvent.type(screen.getByPlaceholderText(/nome/i), "Monitor");
    await userEvent.click(screen.getByRole("button", { name: /salvar/i }));

    expect(onSave).toHaveBeenCalled();
    expect(onSave.mock.calls[0][0].name).toBe("Monitor");
  });
});
