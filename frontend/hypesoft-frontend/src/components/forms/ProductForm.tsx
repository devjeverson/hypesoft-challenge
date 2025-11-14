import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  price: z.string().min(1),
  stock: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function ProductForm() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
    });

  function onSubmit(data: FormData) {
    console.log("FORM:", data);
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
        <Input {...register("price")} />
      </div>

      <div>
        <Label>Estoque</Label>
        <Input {...register("stock")} />
      </div>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
