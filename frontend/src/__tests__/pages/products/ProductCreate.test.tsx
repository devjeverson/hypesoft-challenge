import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCreate from "@/pages/products/ProductCreate";
import * as useProducts from "@/hooks/useProducts";

jest.spyOn(useProducts, "useProducts");

describe("ProductCreate Page", () => {
  it("envia formulário de criação", async () => {
    const createMock = jest.fn();

    jest.spyOn(useProducts, "useProducts").mockReturnValue({
      data: [],
      isLoading: false,
      create: createMock,
      update: jest.fn(),
      remove: jest.fn(),
    } as any);

    render(<ProductCreate />);

    await userEvent.type(screen.getByPlaceholderText(/nome/i), "Monitor 27");
    await userEvent.click(screen.getByRole("button", { name: /salvar/i }));

    expect(createMock).toHaveBeenCalled();
  });
});
