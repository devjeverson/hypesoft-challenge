import "@testing-library/jest-dom";
import "whatwg-fetch";

// Evita warnings de act() do React 19
import { configure } from "@testing-library/react";
configure({ asyncUtilTimeout: 3000 });
