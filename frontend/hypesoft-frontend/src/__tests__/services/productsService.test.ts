import { productsService } from "@/services/productsService";
import { api } from "@/services/api";

jest.mock("@/services/api");

describe("productsService", () => {
  beforeEach(() => jest.clearAllMocks());

  it("lista produtos", async () => {
    (api.get as jest.Mock).mockResolvedValue([
      { id: 1, name: "Mouse" }
    ]);

    const result = await productsService.list();

    expect(api.get).toHaveBeenCalledWith("/products");
    expect(result[0].name).toBe("Mouse");
  });

  it("busca um produto por ID", async () => {
    (api.get as jest.Mock).mockResolvedValue({ id: 10 });

    const result = await productsService.getById("10");

    expect(api.get).toHaveBeenCalledWith(`/products/${10}`);
    expect(result.id).toBe(10);
  });

  it("cria produto", async () => {
    const data = { name: "Teclado", price: 199.99, categoryId: "3", stock: 10 };

    (api.post as jest.Mock).mockResolvedValue({ id: 55, ...data });

    const result = await productsService.create(data);

    expect(api.post).toHaveBeenCalledWith("/products", data);
    expect(result.id).toBe(55);
  });

  it("atualiza produto", async () => {
    const data = { name: "Monitor", price: 499.99, categoryId: "2", stock: 5 };

    (api.put as jest.Mock).mockResolvedValue({ id: 1, ...data });

    const result = await productsService.update("1", data);

    expect(api.put).toHaveBeenCalledWith(`/products/${1}`, data);
    expect(result.name).toBe("Monitor");
  });

  it("remove produto", async () => {
    (api.delete as jest.Mock).mockResolvedValue({ success: true });

    const result = await productsService.remove("2");

    expect(api.delete).toHaveBeenCalledWith(`/products/${2}`);
    expect(result).toEqual({ success: true });
  });
});
