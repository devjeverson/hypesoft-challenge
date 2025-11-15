// src/router.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "@/pages/dashboard/Dashboard";
import ProductListPage from "@/pages/products/ProductListPage";
import ProductEditPage from "@/pages/products/ProductEditPage";
import CategoriesPage from "@/pages/categories/CategoriesPage";
import LoginPage from "@/pages/login/LoginPage";
import { useAuthContext } from "@/auth/AuthProvider";

const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const { initialized, isAuthenticated } = useAuthContext();

  if (!initialized) return <div>Carregando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<LoginPage />} />

        {/* Products */}
        <Route
          path="/products"
          element={
            <RequireAuth>
              <ProductListPage />
            </RequireAuth>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <RequireAuth>
              <ProductEditPage />
            </RequireAuth>
          }
        />

        {/* Categories */}
        <Route
          path="/categories"
          element={
            <RequireAuth>
              <CategoriesPage />
            </RequireAuth>
          }
        />

        <Route
          path="*"
          element={<h1 className="p-10 text-3xl">404 - Página não encontrada</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
