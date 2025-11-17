import { renderHook, act } from "@testing-library/react";
import { useCategories } from "@/hooks/useCategories";
import { categoriesService } from "@/services/categoriesService";

jest.mock("@/services/categoriesService");

describe("useCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("carrega categorias corretamente", async () => {
    (categoriesService.list as jest.Mock).mockResolvedValue([
      { id: 1, name: "Eletrônicos" },
    ]);

    const { result } = renderHook(() => useCategories());

    await act(async () => {});

    expect(result.current.data!).toHaveLength(1);
    expect(result.current.data![0].name).toBe("Eletrônicos");
  });

  it("cria categoria e atualiza o estado", async () => {
    (categoriesService.list as jest.Mock).mockResolvedValue([]);
    (categoriesService.create as jest.Mock).mockResolvedValue({
      id: 99,
      name: "Monitores",
    });

    const { result } = renderHook(() => useCategories());

    await act(async () => {
      await (result.current as any).create({ name: "Monitores" });
    });

    expect(result.current.data!).toHaveLength(1);
    expect(result.current.data![0].id).toBe(99);
  });

  it("remove categoria", async () => {
    (categoriesService.list as jest.Mock).mockResolvedValue([
      { id: 1, name: "Cadeiras" },
    ]);

    (categoriesService.remove as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useCategories());

    await act(async () => {});

    await act(async () => {
      await (result.current as any).remove(1);
    });

    expect(result.current.data!).toHaveLength(0);
  });
});
