import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  root: path.resolve(import.meta.dirname),
  resolve: {
    alias: {
      "@shared": path.resolve(import.meta.dirname, "./shared"),
    },
  },
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "server/**/*.spec.ts"],
    coverage: {
      provider: "v8",
      include: ["server/**", "shared/**"],
      exclude: ["server/**/*.test.ts", "server/**/*.spec.ts"],
      reporter: ["text", "lcov"],
      // Ratchet: raise these as coverage grows. CI fails if coverage drops below.
      thresholds: {
        lines: 3,
        statements: 3,
        functions: 9,
        branches: 14,
      },
    },
  },
});
