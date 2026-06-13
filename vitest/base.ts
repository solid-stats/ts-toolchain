import { defineConfig } from "vitest/config";

export const vitestBaseConfig = defineConfig({
  test: {
    coverage: {
      provider: "v8",
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
