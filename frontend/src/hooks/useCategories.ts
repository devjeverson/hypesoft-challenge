import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "@/services/categoriesService";
import type { Category } from "@/types/product";

const KEY = ["categories"];

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: KEY,
    queryFn: categoriesService.list,
    staleTime: 1000 * 60 * 5,
    initialData: [],
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<Category, "id">) =>
      categoriesService.create(payload),

    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoriesService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
