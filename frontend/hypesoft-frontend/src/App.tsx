import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRoutes from "./router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

