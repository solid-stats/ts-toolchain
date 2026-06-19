# Presets reference

`@solid-stats/ts-toolchain` is config-only: it ships preset files, no runtime code
and no build step. Each preset is consumed differently because the underlying tools
diverge on how (and whether) they support `extends`. This document is the full
consumption reference for every preset.

## Presets

| Preset          | File                        | Consumption                                                                                |
| --------------- | --------------------------- | ------------------------------------------------------------------------------------------ |
| TypeScript base | `tsconfig/base.json`        | `"extends": "@solid-stats/ts-toolchain/tsconfig/base.json"`                                |
| oxlint rules    | `oxlint/base.oxlintrc.json` | `"extends": ["./node_modules/@solid-stats/ts-toolchain/oxlint/base.oxlintrc.json"]`        |
| oxfmt reference | `oxfmt/base.oxfmtrc.json`   | Duplicate values — oxfmt does not support `extends`                                        |
| vitest coverage | `vitest/base.js` + `.d.ts`  | `import { vitestBaseConfig } from "@solid-stats/ts-toolchain/vitest/base"` + `mergeConfig` |
| lefthook hooks  | `lefthook.yml`              | `extends: ["node_modules/@solid-stats/ts-toolchain/lefthook.yml"]`                         |

The package `exports` map (see `package.json`) is the source of truth for the import
specifiers above.

## Pinning

Consumers must pin by **tag or commit SHA** — never by branch ref.

```json
{
  "devDependencies": {
    "@solid-stats/ts-toolchain": "github:solid-stats/ts-toolchain#v0.1.0"
  }
}
```

Branch refs (`#master`) re-resolve on every `pnpm install` and make the lockfile
non-reproducible.

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

Repo-specific fields (`outDir`, `rootDir`, `types`, `include`, `exclude`) always go in
the consumer tsconfig, never in the shared base.

## oxlint extends

oxlint `.oxlintrc.json` only supports relative file paths in `extends` — bare package
specifiers are not yet implemented. Use the full `node_modules` path:

```json
{
  "extends": ["./node_modules/@solid-stats/ts-toolchain/oxlint/base.oxlintrc.json"]
}
```

## oxfmt

oxfmt does not support `extends`. Copy the values from `oxfmt/base.oxfmtrc.json` into
your own `.oxfmtrc.json`.

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

The vitest preset is shipped as plain ESM JS (`vitest/base.js`), not TypeScript:
consumers import it from `node_modules` at vitest-config load time, and Node refuses to
strip TypeScript types from files under `node_modules`
(`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`). The types live in the sibling
`vitest/base.d.ts`. The base config enforces a V8 coverage gate at 100% for statements,
branches, functions, and lines.

## lefthook extends

```yaml
extends:
  - node_modules/@solid-stats/ts-toolchain/lefthook.yml
```

The shipped hooks run oxfmt `--check` and oxlint on staged files at `pre-commit`, and
`typecheck` plus `test` at `pre-push`. The oxfmt check passes
`--no-error-on-unmatched-pattern` so a staged set that is entirely oxfmt-ignored (for
example, a `package.json`- or lockfile-only commit) does not exit non-zero and
false-block the commit.

## Versions

Preset versions are spike-locked. See `package.json` `devDependencies` for current pins.

- oxlint: `1.69.0`
- oxfmt: `0.54.0`
- typescript: `^6.0.3`
- node: `>=25 <26`
- pnpm: `>=11 <12`

The preset structure is intentionally service-agnostic — not fetcher-specific — and is
adopted across the Solid Stats TypeScript repos.
