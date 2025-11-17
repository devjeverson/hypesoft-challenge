import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryForm from "@/components/forms/CategoryForm";

describe("CategoryForm", () => {
  it("envia nova categoria", async () => {
    const onSubmit = jest.fn();
    const Comp: any = CategoryForm;
    render(<Comp onSubmit={onSubmit} />);

    await userEvent.type(screen.getByPlaceholderText(/nome/i), "Periféricos");
    await userEvent.click(screen.getByRole("button", { name: /salvar/i }));

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit.mock.calls[0][0].name).toBe("Periféricos");
  });
  
});
