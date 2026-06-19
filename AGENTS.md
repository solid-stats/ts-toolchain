# ts-toolchain — agent guide

`@solid-stats/ts-toolchain` is the shared TypeScript toolchain package for the Solid
Stats platform: config-only presets (tsconfig, oxlint, oxfmt, vitest, lefthook) consumed
by `server-2`, `replays-fetcher`, and `web`.

**Boundary — what it owns / must NOT cross:** it owns only shared tool configuration and
the version pins for those tools. It ships **no runtime code and no build step**, and
must not grow any: application logic, framework code, domain types, or executable
helpers belong in the consuming repos, never here. Preset content stays
**service-agnostic** — never tailor a preset to one consumer (for example,
fetcher-specific or web-specific rules). Changing a preset is a cross-repo contract
change: every consuming repo inherits it, so weigh the blast radius across `server-2`,
`replays-fetcher`, and `web` before editing.

**Shared standards:** the cross-repo conventions, GSD obligations, the cross-app boundary
map, and the documentation-language rule live in the `skills` repo
(`solid-stats/skills`, `solidstats-shared-project-standards`). Read them first; this file
adds only what is specific to this package.

---

## Project

`@solid-stats/ts-toolchain` is a config-only package: shared toolchain presets for the
Solid Stats TypeScript repos. It contains no runtime code and no build step — only
preset files (`tsconfig/`, `oxlint/`, `oxfmt/`, `vitest/`, `lefthook.yml`) exposed
through the package `exports` map.

The package is intentionally service-agnostic: presets are designed to be inherited by
any Solid Stats TypeScript repo (`server-2`, `replays-fetcher`, `web`), not specialized
for one of them.

## No-runtime boundary

- This package must never ship runtime code or a build step. If a change would require
  shipping executable application logic, it belongs in the consuming repo, not here.
- Each preset is consumed differently because the underlying tools diverge on `extends`
  support. The exact consumption rules per preset live in
  [docs/presets-reference.md](docs/presets-reference.md).
- Preset versions are spike-locked; see `package.json` `devDependencies` for current
  pins. Treat version bumps as cross-repo changes — every consumer inherits them.
- Consumers pin this package by tag or commit SHA, never by branch ref, to keep
  lockfiles reproducible.

## Validation

```bash
pnpm install
pnpm run lint
pnpm run format
pnpm run typecheck
```

CI (`.github/workflows/ci.yml`) runs `lint`, `format`, and `typecheck` on every push and
pull request against `master`.
