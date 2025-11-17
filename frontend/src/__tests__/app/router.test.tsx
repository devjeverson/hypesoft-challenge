import { render, screen } from "@testing-library/react";
import AppRoutes from "@/router";

describe("Router", () => {
  it("renderiza rota inicial", () => {
    render(<AppRoutes />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
