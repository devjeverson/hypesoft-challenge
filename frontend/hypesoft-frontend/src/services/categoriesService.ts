import { api } from "./api";
import type { Category } from "@/types/product";

export const categoriesService = {
  list: async (): Promise<Category[]> => {
    const res = await api.get<Category[]>("/categories");
    return res.data;
  },

  create: async (payload: Omit<Category, "id">): Promise<Category> => {
    const res = await api.post<Category>("/categories", payload);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
