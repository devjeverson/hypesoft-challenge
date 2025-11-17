import { render, screen } from "@testing-library/react";
import Dashboard from "@/pages/dashboard/Dashboard";

describe("Dashboard Page", () => {
  it("renderiza conteúdo do Dashboard", () => {
    render(<Dashboard />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
