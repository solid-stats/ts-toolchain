import { defineConfig } from "vitest/config";

// Shipped as plain ESM JS (not .ts): consumers import this from node_modules at
// vitest-config load time, and Node refuses to strip TypeScript types from files
// under node_modules (ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING). Types live in
// the sibling base.d.ts.
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
