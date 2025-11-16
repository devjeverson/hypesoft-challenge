import { api } from "./api";
import type { Product } from "@/types/product";

export const productsService = {
  list: async (): Promise<Product[]> => {
    const res = await api.get("/api/products");
    return res as Product[];
  },

  getById: async (id: string): Promise<Product> => {
    const res = await api.get(`/api/products/${id}`);
    return res as Product;
  },

  create: async (payload: Omit<Product, "id">): Promise<Product> => {
    const res = await api.post("/api/products", payload);
    return res as Product;
  },

  update: async (id: string, payload: Omit<Product, "id">): Promise<Product> => {
    const res = await api.put(`/api/products/${id}`, payload);
    return res as Product;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/api/products/${id}`);
  },
};
