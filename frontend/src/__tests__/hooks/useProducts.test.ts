import { renderHook, act } from "@testing-library/react";
import { useProducts } from "@/hooks/useProducts";
import { productsService } from "@/services/productsService";

jest.mock("@/services/productsService");

describe("useProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("carrega produtos ao iniciar", async () => {
    (productsService.list as jest.Mock).mockResolvedValue([
      { id: 1, name: "Mouse Gamer" },
    ]);

    const { result } = renderHook(() => useProducts());

    await act(async () => {});

    expect((result.current as any).products).toHaveLength(1);
    expect((result.current as any).products[0].name).toBe("Mouse Gamer");
  });

  it("cria produto e atualiza estado", async () => {
    (productsService.list as jest.Mock).mockResolvedValue([]);
    (productsService.create as jest.Mock).mockResolvedValue({
      id: 20,
      name: "Teclado Mecânico",
    });

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await (result.current as any).create({ name: "Teclado Mecânico" });
    });

    expect((result.current as any).products[0].id).toBe(20);
  });

  it("atualiza produto no estado", async () => {
    (productsService.list as jest.Mock).mockResolvedValue([
      { id: 1, name: "Monitor 144hz" },
    ]);

    (productsService.update as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Monitor 240hz",
    });

    const { result } = renderHook(() => useProducts());

    await act(async () => {});

    await act(async () => {
      await (result.current as any).update(1, { name: "Monitor 240hz" });
    });

    expect((result.current as any).products[0].name).toBe("Monitor 240hz");
  });

  it("remove produto", async () => {
    (productsService.list as jest.Mock).mockResolvedValue([
      { id: 10, name: "Headset" },
    ]);

    (productsService.remove as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(() => useProducts());

    await act(async () => {});

    await act(async () => {
      await (result.current as any).remove(10);
    });

    expect((result.current as any).products).toHaveLength(0);
  });
});
