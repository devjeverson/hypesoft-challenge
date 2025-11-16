import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "@/pages/dashboard/Dashboard";
import ProductListPage from "@/pages/products/ProductListPage";
import ProductEditPage from "@/pages/products/ProductEditPage";
import ProductCreate from "@/pages/products/ProductCreate";
import CategoriesPage from "@/pages/categories/CategoriesPage";
import LoginPage from "@/pages/login/LoginPage";

import AppLayout from "@/components/layout/AppLayout";

import { useAuthContext } from "@/auth/AuthProvider";

const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const { initialized, isAuthenticated } = useAuthContext();

  if (!initialized) return <div>Carregando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* 🔓 ROTA PÚBLICA */}
      <Route path="/login" element={<LoginPage />} />

      {/* 🔐 ROTAS PROTEGIDAS — TODAS DENTRO DO LAYOUT */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        {/* index = "/" */}
        <Route index element={<Dashboard />} />

        {/* Products */}
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/new" element={<ProductCreate />} />
        <Route path="products/edit/:id" element={<ProductEditPage />} />

        {/* Categories */}
        <Route path="categories" element={<CategoriesPage />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<h1 className="p-10 text-3xl">404 - Página não encontrada</h1>}
      />
    </Routes>
  );
}

export default AppRoutes;
