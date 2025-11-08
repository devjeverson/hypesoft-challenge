import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="p-4 bg-white shadow">
        <h1 className="text-xl font-semibold text-primary">HypeSoft Challenge</h1>
      </header>

      <main className="flex-1 p-6">{children}</main>

      <footer className="p-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HypeSoft
      </footer>
    </div>
  );
}
