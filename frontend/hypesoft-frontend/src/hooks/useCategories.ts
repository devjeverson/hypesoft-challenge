import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "@/services/categoriesService";
import type { Category } from "@/types/product";

const CATEGORIES_KEY = ["categories"];

export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: CATEGORIES_KEY,
    queryFn: () => categoriesService.list(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<Category, "id">) =>
      categoriesService.create(payload),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoriesService.remove(id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  });
}
