# @solid-stats/ts-toolchain

**Русский** · [English](README.en.md)

Общий пакет пресетов TypeScript-тулчейна для **Solid Stats** — статистики игр
сообщества [Solid Games](https://sg.zone) (ArmA 3). Один источник правды для
конфигов tsconfig, oxlint, oxfmt, vitest и lefthook-хуков, чтобы TS-репозитории
платформы держали единую строгость компилятора, линтинга, форматирования и гейтов
покрытия.

Часть многорепной платформы: его потребляют backend `server-2`, ingest-CLI
`replays-fetcher` и веб-интерфейс `web`. Пакет — только конфиги: ни рантайм-кода, ни
шага сборки; границу рантайма он не пересекает.

> Solid Stats от и до строят AI-агенты по процессу
> [GSD](https://github.com/open-gsd/gsd-core). Разработка вне GSD — вне процесса.

## Быстрый старт

Подключают пакет как dev-зависимость, закреплённую по тегу или SHA коммита (никогда
по ветке — ссылка на ветку ломает воспроизводимость lock-файла):

```json
{
  "devDependencies": {
    "@solid-stats/ts-toolchain": "github:solid-stats/ts-toolchain#v0.1.0"
  }
}
```

Дальше каждый пресет подключают по-своему — tsconfig и lefthook через `extends`,
oxlint через путь в `node_modules`, vitest через `mergeConfig`, oxfmt копированием
значений (он не поддерживает `extends`). Полная таблица потребления и примеры — в
документации ниже.

## Документация

- docs/presets-reference.md — пресеты, политика закрепления версий, подключение
  каждого пресета (tsconfig · oxlint · oxfmt · vitest · lefthook), версии и CI

## Стек

TypeScript 6 · Node 25 · pnpm 11 · oxlint · oxfmt · Vitest 4 · lefthook

## Лицензия — MIT
