// src/router.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import Dashboard from "@/pages/dashboard/Dashboard";

// Products
import ProductListPage from "@/pages/products/ProductListPage";
import ProductEditPage from "@/pages/products/ProductEditPage";

// Categories
import CategoriesPage from "@/pages/categories/CategoriesPage";

// (Opcional — para Keycloak futuramente)
const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  // aqui depois vamos validar o token do Keycloak
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

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

        {/* Not found */}
        <Route path="*" element={<h1 className="p-10 text-3xl">404 - Página não encontrada</h1>} />

      </Routes>
    </BrowserRouter>
  );

}
export default AppRoutes;
