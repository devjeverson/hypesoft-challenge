import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCategory } from "@/hooks/useCategories";

type Form = { name: string };

export default function CategoryForm() {
  const { register, handleSubmit, reset } = useForm<Form>();
  const [msg, setMsg] = useState<string | null>(null);
  const create = useCreateCategory();

  async function onSubmit(data: Form) {
    try {
      await create.mutateAsync({ name: data.name });
      setMsg("Categoria criada");
      reset();
      setTimeout(() => setMsg(null), 2000);
    } catch (err: any) {
      setMsg(err?.message ?? "Erro");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <Label>Nova categoria</Label>
        <Input {...register("name")} placeholder="ex: Eletrônicos" />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={create.isPending}>Criar</Button>
        {msg && <span className="text-sm text-muted-foreground">{msg}</span>}
      </div>
    </form>
  );
}
