import { api } from "./api";
import type { Product } from "@/types/product";

export const productsService = {
  list: async (): Promise<Product[]> => {
    const res = await api.get<Product[]>("/products");
    return res.data;
  },

  getById: async (id: string): Promise<Product> => {
    const res = await api.get<Product>(`/products/${id}`);
    return res.data;
  },

  create: async (payload: Omit<Product, "id">): Promise<Product> => {
    const res = await api.post<Product>("/products", payload);
    return res.data;
  },

  update: async (id: string, payload: Omit<Product, "id">): Promise<Product> => {
    const res = await api.put<Product>(`/products/${id}`, payload);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
