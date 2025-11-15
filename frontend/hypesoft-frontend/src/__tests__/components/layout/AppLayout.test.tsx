import { render, screen } from "@testing-library/react";
import AppLayout from "@/components/layout/AppLayout";

describe("AppLayout", () => {
  it("renderiza header e sidebar", () => {
    render(
      <AppLayout>
        <div>Conteúdo Principal</div>
      </AppLayout>
    );

    expect(screen.getByText(/hypesoft/i)).toBeInTheDocument(); // Header
    expect(screen.getByText(/produtos/i)).toBeInTheDocument(); // Sidebar
    expect(screen.getByText("Conteúdo Principal")).toBeInTheDocument();
  });
});
