import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

import { useCategories } from "@/hooks/useCategories";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  price: z.string().min(1, "Preço obrigatório"),
  stock: z.string().optional(),
  categoryId: z.string().min(1, "Selecione uma categoria"),
});

export type FormData = z.infer<typeof schema>;

export default function ProductForm({
  defaultValues,
  onSave,
}: {
  defaultValues?: Partial<FormData>;
  onSave?: (data: any) => Promise<void> | void;
}) {
  const { data: categories } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {},
  });

  async function onSubmit(data: FormData) {
    const payload = {
      name: data.name,

      price: Number(
        String(data.price)
          .replace(/[^\d.,-]/g, "")
          .replace(",", ".")
      ),

      stock: data.stock ? Number(data.stock) : 0,

      categoryId: data.categoryId,
    };

    if (onSave) await onSave(payload);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Nome */}
      <div>
        <Label>Nome</Label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </div>

      {/* Preço */}
      <div>
        <Label>Preço</Label>
        <Input {...register("price")} placeholder="0,00" />
        {errors.price && (
          <p className="text-red-500 text-xs">{errors.price.message}</p>
        )}
      </div>

      {/* Estoque */}
      <div>
        <Label>Estoque</Label>
        <Input {...register("stock")} placeholder="0" />
      </div>

      {/* Categoria */}
      <div>
        <Label>Categoria</Label>

        <select
          {...register("categoryId")}
          className="w-full border rounded-md p-2 text-sm"
        >
          <option value="">Selecione...</option>

          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <p className="text-red-500 text-xs">{errors.categoryId.message}</p>
        )}
      </div>

      {/* Botão */}
      <Button type="submit">Salvar</Button>
    </form>
  );
}
