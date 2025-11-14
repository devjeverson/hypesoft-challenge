import ProductForm from "@/components/forms/ProductForm";
import { useCreateProduct } from "@/hooks/useProducts";

export default function ProductCreate() {
  const { mutateAsync } = useCreateProduct();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>

      <ProductForm
        onSave={async (values) => {
          await mutateAsync(values); 
        }}
      />
    </div>
  );
}
