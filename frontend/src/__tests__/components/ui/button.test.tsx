import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("renderiza e responde ao clique", async () => {
    const fn = jest.fn();
    render(<Button onClick={fn}>Clique</Button>);

    await userEvent.click(screen.getByText("Clique"));

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
