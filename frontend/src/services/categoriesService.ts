import { api } from "./api";
import type { Category } from "@/types/product";

export const categoriesService = {
  list: async (): Promise<Category[]> => {
    const res = await api.get("/api/categories");
    const data = res?.data;
    return Array.isArray(data) ? data : [];
  },

  create: async (payload: Omit<Category, "id">): Promise<Category> => {
    const res = await api.post("/api/categories", payload);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/api/categories/${id}`);
  },
};
