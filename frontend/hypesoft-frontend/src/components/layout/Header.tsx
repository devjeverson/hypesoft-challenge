import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="relative w-1/3">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar produto..." className="pl-8" />
      </div>

      <div className="flex items-center gap-3">
        <span className="font-medium">Jeverson</span>
        <img
          src={`https://ui-avatars.com/api/?name=Jeverson&background=0D8ABC&color=fff`}
          className="rounded-full w-8 h-8"
        />
      </div>
    </header>
  );
}
