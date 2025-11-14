import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom"; // if you use react-router; otherwise use your routing

export default function ProductListPage() {
  const { data: products = [], isLoading } = useProducts();
  const deleteMutation = useDeleteProduct();
  const [q, setQ] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.description?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="flex bg-[#f6f6f9] min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Produtos</h1>
            <div className="flex gap-3">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar..." />
              <Link to="/products/new">
                <Button>Novo</Button>
              </Link>
            </div>
          </div>

          <section className="grid gap-4">
            {isLoading && <div>Carregando...</div>}
            {!isLoading && filtered.length === 0 && <div>Nenhum produto</div>}

            {filtered.map((p) => (
              <Card key={p.id} className="rounded-lg">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{p.name}</span>
                    <div className="flex gap-2">
                      <Link to={`/products/${p.id}/edit`}>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMutation.mutate(p.id)}
                        disabled={deleteMutation.isPending}
                      >
                        Excluir
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">{p.description}</div>
                  <div className="mt-2 flex justify-between">
                    <div>R$ {p.price.toFixed(2)}</div>
                    <div>Estoque: {p.stock}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

