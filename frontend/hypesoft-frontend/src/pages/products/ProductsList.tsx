import { useNavigate } from "react-router-dom";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductsList() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();
  const deleteMutation = useDeleteProduct();

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button onClick={() => navigate("/products/new")}>
          Novo Produto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Nome</th>
                <th className="text-left">Preço</th>
                <th className="text-left">Estoque</th>
                <th className="text-left">Ações</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="py-2">{p.name}</td>
                  <td>R$ {p.price.toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/products/${p.id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(p.id!)}
                    >
                      Deletar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
