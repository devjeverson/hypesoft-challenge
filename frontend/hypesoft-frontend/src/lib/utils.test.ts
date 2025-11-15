import { cn } from "@/lib/utils";

describe("utils.cn", () => {
  it("concatena classes simples", () => {
    const result = cn("btn", "primary");
    expect(result).toBe("btn primary");
  });

  it("remove valores falsy", () => {
    const result = cn("btn", "", null as any, undefined as any, "active");
    expect(result).toBe("btn active");
  });

  it("funciona com arrays espalhados", () => {
    const extra = ["lg", "rounded"];
    const result = cn("card", ...extra);
    expect(result).toBe("card lg rounded");
  });

  it("retorna string vazia se nada for válido", () => {
    const result = cn("", undefined as any, null as any);
    expect(result).toBe("");
  });
});
