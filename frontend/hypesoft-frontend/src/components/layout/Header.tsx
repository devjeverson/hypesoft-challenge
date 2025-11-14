import { Input } from "@/components/ui/input";
import { Search, Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 border-b bg-white px-8 flex items-center justify-between shadow-sm">
      <div className="relative w-96">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10 h-11 rounded-xl" placeholder="Search" />
      </div>

      <div className="flex items-center gap-6">
        <Bell className="text-muted-foreground w-5 h-5 cursor-pointer" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">Jeveron Oliveira</p>
            <p className="text-xs text-muted-foreground">Shop Admin</p>
          </div>

          <img
            src="https://ui-avatars.com/api/?name=Jeveron+Oliveira&background=random"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
