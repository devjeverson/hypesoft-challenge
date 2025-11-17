import { categoriesService } from "@/services/categoriesService";
import { api } from "@/services/api";

jest.mock("@/services/api");

describe("categoriesService", () => {
  beforeEach(() => jest.clearAllMocks());

  it("lista categorias", async () => {
    (api.get as jest.Mock).mockResolvedValue([
      { id: 1, name: "Periféricos" }
    ]);

    const result = await categoriesService.list();

    expect(api.get).toHaveBeenCalledWith("/categories");
    expect(result[0].name).toBe("Periféricos");
  });

  it("cria categoria", async () => {
    (api.post as jest.Mock).mockResolvedValue({ id: 45, name: "Monitores" });

    const result = await categoriesService.create({ name: "Monitores" });

    expect(api.post).toHaveBeenCalledWith("/categories", { name: "Monitores" });
    expect(result.id).toBe(45);
  });

  it("edita categoria", async () => {
    (api.put as jest.Mock).mockResolvedValue({ id: 1, name: "Audio" });

    const result = await (categoriesService as any).update(1, { name: "Audio" });

    expect(api.put).toHaveBeenCalledWith("/categories/1", { name: "Audio" });
    expect(result.name).toBe("Audio");
  });

  it("remove categoria", async () => {
    (api.delete as jest.Mock).mockResolvedValue({ success: true });

    const result = await categoriesService.remove("9");

    expect(api.delete).toHaveBeenCalledWith("/categories/9");
    expect(result).toBeUndefined();
  });
});
