import {
  LayoutDashboard,
  BarChart2,
  Package,
  Users,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  Tags,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const sections = [
    {
      label: "GENERAL",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: "/",
        },
      ],
    },
    {
      label: "SHOP",
      items: [
        {
          icon: BarChart2,
          label: "Statistics",
          href: "/statistics",
        },
        {
          icon: Package,
          label: "Products",
          href: "/products",
        },
        {
          icon: Tags,
          label: "Categories",
          href: "/categories",
        },
        {
          icon: Users,
          label: "Customers",
          href: "/customers",
        },
        {
          icon: FileText,
          label: "Invoice",
          href: "/invoice",
        },
        {
          icon: MessageSquare,
          label: "Message",
          href: "/messages",
          badge: 4,
        },
      ],
    },
    {
      label: "SUPPORT",
      items: [
        {
          icon: Settings,
          label: "Settings",
          href: "/settings",
        },
        {
          icon: HelpCircle,
          label: "Help",
          href: "/help",
        },
      ],
    },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col p-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-xl bg-primary" />
        <h1 className="font-semibold text-lg">ShopSense</h1>
      </div>

      {/* Sections */}
      <div className="flex-1 space-y-8 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="text-xs font-semibold text-muted-foreground mb-3">
              {section.label}
            </p>

            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}

                      {item.badge !== undefined && (
                        <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-md">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Upgrade Box */}
      <div className="mt-10 p-4 bg-primary/10 rounded-xl text-center">
        <p className="text-sm font-semibold">Try ShopSense Pro</p>
        <p className="text-xs text-muted-foreground mb-3">
          Get Pro and enjoy 20+ features to enhance your sales.
        </p>

        <button className="w-full text-white bg-primary rounded-lg py-2 text-sm hover:opacity-90 transition">
          Upgrade Plan
        </button>
      </div>

      <footer className="text-xs text-muted-foreground mt-6 text-center">
        © 2025 HypeSoft
      </footer>
    </aside>
  );
}
