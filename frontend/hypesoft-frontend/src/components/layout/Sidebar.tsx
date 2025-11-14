import { Home, Package, BarChart2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const menu = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Package, label: "Produtos" },
  { icon: BarChart2, label: "Estoque" },
  { icon: Settings, label: "Configurações" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r bg-background px-4 py-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">HypeSoft</h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition",
              item.active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent"
            )}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <footer className="mt-auto text-xs text-muted-foreground pt-6 border-t">
        © 2025 HypeSoft
      </footer>
    </aside>
  );
}
