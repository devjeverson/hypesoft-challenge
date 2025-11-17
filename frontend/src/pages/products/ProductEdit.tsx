import { useParams } from "react-router-dom";
import { useProduct, useUpdateProduct } from "@/hooks/useProducts";
import ProductForm from "@/components/forms/ProductForm";

export default function ProductEdit() {
  const { id } = useParams();
  const { data, isLoading } = useProduct(id);
  const updateMutation = useUpdateProduct();

  if (isLoading) return <p>Carregando...</p>;
  if (!data) return <p>Produto não encontrado</p>;

  // CONVERTE Product → FormData
  const defaultValues = {
    name: data.name,
    price: String(data.price).replace(".", ","), // form espera string
    stock: String(data.stock),
    categoryId: data.categoryId ?? "",
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>

      <ProductForm
        defaultValues={defaultValues}
        onSave={async (values) => {
          // envia para o backend no formato certo
          await updateMutation.mutateAsync({
            id: id!,
            payload: {
              name: values.name,
              price: Number(values.price.replace(",", ".")),
              stock: values.stock ? Number(values.stock) : 0,
              categoryId: values.categoryId,
            },
          });
        }}
      />
    </div>
  );
}
