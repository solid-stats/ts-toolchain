# @solid-stats/ts-toolchain

[Русский](README.md) · **English**

Shared TypeScript toolchain presets for **Solid Stats** — the game statistics of the
[Solid Games](https://sg.zone) community (ArmA 3). A single source of truth for the
tsconfig, oxlint, oxfmt, vitest, and lefthook-hook configs, so the platform's TypeScript
repos keep one shared level of compiler strictness, linting, formatting, and coverage
gates.

Part of a multi-repo platform: consumed by the `server-2` backend, the `replays-fetcher`
ingest CLI, and the `web` frontend. The package is config-only — no runtime code, no
build step; it does not cross the runtime boundary.

> Solid Stats is built end to end by AI agents following the
> [GSD](https://github.com/open-gsd/gsd-core) process. Development outside GSD is outside
> the process.

## Quick start

Add the package as a dev dependency pinned by tag or commit SHA (never by branch — a
branch ref breaks lockfile reproducibility):

```json
{
  "devDependencies": {
    "@solid-stats/ts-toolchain": "github:solid-stats/ts-toolchain#v0.1.0"
  }
}
```

Each preset is then consumed in its own way — tsconfig and lefthook via `extends`,
oxlint via a `node_modules` path, vitest via `mergeConfig`, and oxfmt by copying the
values (it does not support `extends`). The full consumption table and examples live in
the documentation below.

## Documentation

- docs/presets-reference.md — presets, the version-pinning policy, consumption of each
  preset (tsconfig · oxlint · oxfmt · vitest · lefthook), versions, and CI

## Stack

TypeScript 6 · Node 25 · pnpm 11 · oxlint · oxfmt · Vitest 4 · lefthook

## License — MIT
