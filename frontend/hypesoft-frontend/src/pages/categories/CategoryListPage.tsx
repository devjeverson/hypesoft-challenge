import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CategoryForm from "@/components/forms/CategoryForm";
import { useCategories, useDeleteCategory } from "@/hooks/useCategories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CategoryListPage() {
  const { data: categories = [], isLoading } = useCategories();
  const del = useDeleteCategory();

  return (
    <div className="flex bg-[#f6f6f9] min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-10">
          <h1 className="text-2xl font-semibold mb-6">Categorias</h1>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nova categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryForm />
              </CardContent>
            </Card>

            <div>
              {isLoading && <div>Carregando...</div>}
              {!isLoading && categories.map((c) => (
                <Card key={c.id} className="mb-3">
                  <CardContent className="flex justify-between items-center">
                    <div>{c.name}</div>
                    <div>
                      <Button variant="destructive" size="sm" onClick={() => del.mutate(c.id)}>Excluir</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
