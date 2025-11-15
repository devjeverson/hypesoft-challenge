/**
 * Esse mock substitui todo RequireAuth no router.tsx
 */
import type { ReactNode } from "react";

jest.mock("@/router", () => {
  const original = jest.requireActual("@/router");

  return {
    __esModule: true,
    ...original,
    // sobrescreve o component interno
    RequireAuth: ({ children }: { children: ReactNode }) => children,
  };
});
