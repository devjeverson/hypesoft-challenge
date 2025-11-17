import { api } from "@/services/api";

window.fetch = jest.fn();

describe("api service", () => {
  beforeEach(() => jest.clearAllMocks());

  it("GET retorna JSON corretamente", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1 }],
    });

    const result = await api.get("/products");

    expect(result).toEqual([{ id: 1 }]);
    expect(fetch).toHaveBeenCalledWith("/products", expect.anything());
  });

  it("POST envia body e retorna JSON", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ id: 99 }),
    });

    const body = { name: "Teclado" };
    const result = await api.post("/products", body);


    expect((result as any).id).toBe(99);
    expect(fetch).toHaveBeenCalled();
  });

  it("PUT funciona corretamente", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const result = await api.put("/products/1", { name: "Monitor" });

    expect(result).toEqual({ success: true });
  });

  it("DELETE funciona corretamente", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ deleted: true }),
    });

    const result = await api.delete("/products/1");

    expect((result as any).deleted).toBe(true);
  });

  it("lança erro quando ok = false", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(api.get("/error")).rejects.toThrow();
  });
});
