import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./auth/AuthProvider";

const queryClient = new QueryClient();

console.log("ENV FRONT:", import.meta.env);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
