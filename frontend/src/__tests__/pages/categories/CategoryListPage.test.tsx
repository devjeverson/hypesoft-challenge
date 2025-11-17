import { render, screen } from "@testing-library/react";
import CategoryListPage from "@/pages/categories/CategoryListPage";
import * as useCategories from "@/hooks/useCategories";

jest.spyOn(useCategories, "useCategories");

describe("CategoryListPage", () => {
  it("lista categorias na tabela", () => {
    jest.spyOn(useCategories, "useCategories").mockReturnValue({
      categories: [{ id: 1, name: "Periféricos" }],
      loading: false,
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as ReturnType<typeof useCategories.useCategories>);

    render(<CategoryListPage />);

    expect(screen.getByText(/periféricos/i)).toBeInTheDocument();
  });
});
