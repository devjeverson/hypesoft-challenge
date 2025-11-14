import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import ProductForm from "@/components/forms/ProductForm";
import { useProduct, useUpdateProduct } from "@/hooks/useProducts";

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id);
  const update = useUpdateProduct();

  async function handleSave(data: any) {
    await update.mutateAsync({ id: id as string, payload: data });
    navigate("/products");
  }

  if (isLoading) return <div>Carregando...</div>;
  if (!product) return <div>Produto não encontrado</div>;

  return (
    <div className="flex bg-[#f6f6f9] min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-10">
          <h1 className="text-2xl font-semibold mb-6">Editar produto</h1>
            <ProductForm
                 defaultValues={{
                    name: product.name,
                    price: String(product.price),
                    stock: String(product.stock ?? 0),
                 }}
                onSave={handleSave}
            />
        </main>
      </div>
    </div>
  );
}
