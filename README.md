# @solid-stats/ts-toolchain

Shared TypeScript toolchain presets for Solid Stats services (replays-fetcher, server-2, web).

This is a pilot package. It contains config-only presets — no runtime code, no build step.

## Presets

| Preset          | File                        | Consumption                                                                                |
| --------------- | --------------------------- | ------------------------------------------------------------------------------------------ |
| TypeScript base | `tsconfig/base.json`        | `"extends": "@solid-stats/ts-toolchain/tsconfig/base.json"`                                |
| oxlint rules    | `oxlint/base.oxlintrc.json` | `"extends": ["./node_modules/@solid-stats/ts-toolchain/oxlint/base.oxlintrc.json"]`        |
| oxfmt reference | `oxfmt/base.oxfmtrc.json`   | Duplicate values — oxfmt does not support `extends`                                        |
| vitest coverage | `vitest/base.js` + `.d.ts`  | `import { vitestBaseConfig } from "@solid-stats/ts-toolchain/vitest/base"` + `mergeConfig` |
| lefthook hooks  | `lefthook.yml`              | `extends: ["node_modules/@solid-stats/ts-toolchain/lefthook.yml"]`                         |

## Pinning

Consumers must pin by **tag or commit SHA** — never by branch ref.

```json
{
  "devDependencies": {
    "@solid-stats/ts-toolchain": "github:solid-stats/ts-toolchain#v0.1.0"
  }
}
```

Branch refs (`#master`) re-resolve on every `pnpm install` and make the lockfile non-reproducible.

## tsconfig extends

```json
{
  "extends": "@solid-stats/ts-toolchain/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": ".",
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["dist", "node_modules"]
}
```

Repo-specific fields (`outDir`, `rootDir`, `types`, `include`, `exclude`) always go in the consumer tsconfig, never in the shared base.

## oxlint extends

oxlint `.oxlintrc.json` only supports relative file paths in `extends` — bare package specifiers are not yet implemented. Use the full `node_modules` path:

```json
{
  "extends": ["./node_modules/@solid-stats/ts-toolchain/oxlint/base.oxlintrc.json"]
}
```

## oxfmt

oxfmt does not support `extends`. Copy the values from `oxfmt/base.oxfmtrc.json` into your own `.oxfmtrc.json`.

## vitest mergeConfig

```typescript
import { vitestBaseConfig } from "@solid-stats/ts-toolchain/vitest/base";
import { mergeConfig, defineConfig } from "vitest/config";

export default mergeConfig(
  vitestBaseConfig,
  defineConfig({
    test: {
      include: ["src/**/*.test.ts"],
      coverage: {
        include: ["src/**/*.ts"],
        exclude: ["src/**/*.test.ts"],
      },
    },
  }),
);
```

## lefthook extends

```yaml
extends:
  - node_modules/@solid-stats/ts-toolchain/lefthook.yml
```

## Versions

Preset versions are spike-locked. See `package.json` devDependencies for current pins.

- oxlint: `1.69.0`
- oxfmt: `0.54.0`
- typescript: `^6.0.3`
- node: `>=25 <26`
- pnpm: `>=11 <12`

This package will be adopted by `server-2` and `web` in later phases. Preset structure is intentionally service-agnostic — not fetcher-specific.
