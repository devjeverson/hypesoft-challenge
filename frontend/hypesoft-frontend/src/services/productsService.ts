import { api } from "./api";
import type { Product } from "@/types/product";

export const productsService = {
  list: async (): Promise<Product[]> => {
    const res = await api.get("/products");
    return res.data as Product[];
  },

  getById: async (id: string): Promise<Product> => {
    const res = await api.get(`/products/${id}`);
    return res.data as Product;
  },

  create: async (payload: Omit<Product, "id">): Promise<Product> => {
    const res = await api.post("/products", payload);
    return res.data as Product;
  },

  update: async (id: string, payload: Omit<Product, "id">): Promise<Product> => {
    const res = await api.put(`/products/${id}`, payload);
    return res.data as Product;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
