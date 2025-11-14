import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  price: z.string().min(1, "Preço obrigatório"),
  stock: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ProductForm({
  defaultValues,
  onSave,
}: {
  defaultValues?: Partial<FormData>;
  onSave?: (data: FormData) => Promise<void> | void;
}) {
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormData>({
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
    };

    if (onSave) await onSave(payload as any);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Nome</Label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label>Preço</Label>
        <Input {...register("price")} placeholder="0,00" />
      </div>

      <div>
        <Label>Estoque</Label>
        <Input {...register("stock")} placeholder="0" />
      </div>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
