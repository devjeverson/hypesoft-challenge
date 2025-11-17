import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import { useCategories, useDeleteCategory, useCreateCategory } from "@/hooks/useCategories";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const deleteMutation = useDeleteCategory();
  const createMutation = useCreateCategory();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleCreate() {
    setError("");

    if (!name.trim()) {
      setError("Nome obrigatório");
      return;
    }

    try {
      await createMutation.mutateAsync({ name });
      setName("");
    } catch (err: any) {
      setError(err?.message ?? "Erro ao criar categoria");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Confirma remover categoria?")) return;
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err: any) {
      alert(err?.message);
    }
  }

  return (
    <div className="flex bg-[#f6f6f9] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-8 space-y-8">
          <h1 className="text-2xl font-semibold">Categorias</h1>

          {/* CREATE CATEGORY */}
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Criar nova categoria</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <Label>Nome da categoria</Label>
                <Input
                  placeholder="Ex: Eletrônicos"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              <Button onClick={handleCreate} disabled={createMutation.isPending}>
                {createMutation.isPending ? "Salvando..." : "Salvar"}
              </Button>
            </CardContent>
          </Card>

          {/* LIST */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de categorias</CardTitle>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <p>Carregando...</p>
              ) : (categories ?? []).length > 0 ? (
                <ul className="space-y-2">
                  {(categories ?? []).map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between border rounded-lg p-3 bg-white"
                    >
                      <span>{c.name}</span>

                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(c.id)}
                        disabled={deleteMutation.isPending}
                      >
                        Remover
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Nenhuma categoria cadastrada</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
