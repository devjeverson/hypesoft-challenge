import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("App", () => {
  it("renderiza layout principal da aplicação", () => {
    render(<App />);
    
    // Verifica se o Header aparece
    expect(screen.getByText(/hypesoft/i)).toBeInTheDocument();
    
    // Verifica se a sidebar aparece
    expect(screen.getByText(/produtos/i)).toBeInTheDocument();
  });
});
