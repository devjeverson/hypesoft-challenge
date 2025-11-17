import { render, screen } from "@testing-library/react";
import AppLayout from "@/components/layout/AppLayout";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("AppLayout", () => {
  it("renderiza header e sidebar", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<div>oi</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );


    expect(screen.getByText(/hypesoft/i)).toBeInTheDocument(); // Header
    expect(screen.getByText(/produtos/i)).toBeInTheDocument(); // Sidebar
    expect(screen.getByText("Conteúdo Principal")).toBeInTheDocument();
  });
});
