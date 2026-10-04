# Contributing to Killed by Apple

Help preserve product history through sourced entries, corrections, and code improvements.

## Suggest an entry or report a problem

[Open a GitHub issue](https://github.com/wbreiler/KilledByApple/issues). For a product suggestion, include its name, introduction year, discontinuation year, and reliable source links. For a broken link, identify the entry and suggest a replacement if possible. For a site bug, include reproduction steps and your browser.

## Catalog requirements

Edit `graveyard.json`. Include entire product lines, distinct applications, or services. Keep all iPods in one entry and all AirPort routers in another. Exclude annual model refreshes, active products, rumors, and simple rebrands.

Use these story labels:

- `apple`: an original Apple product that Apple discontinued.
- `acquired`: a product or maker that Apple acquired before discontinuation. Include the integer `acquired` year.
- `sherlocked`: a closed third-party product with documented overlap with Apple features. Identify who ended support. Do not imply Apple owned it or caused its closure without evidence.

Each entry requires a unique lowercase kebab-case `id`, `name`, `type`, `history`, integer `start` and `end` years, `description`, `note`, `source`, and `icon`. Use `hardware`, `software`, or `service` for `type`. See existing entries and [README.md](README.md) for supported icons and optional `references`.

Verify introduction and discontinuation years. Use credible HTTPS sources that document the product’s end. Open every source link before submission. Explain staged shutdowns, acquisitions, successors, and date exceptions in `note`. Keep descriptions factual and respectful.

## Develop locally

Use Node.js 22 or later. No dependencies or build step are required.

```sh
npm run dev
```

Open http://localhost:3000. Use `PORT=3001 npm run dev` if that port is occupied. Source, assets, data, and tests live at the repository root. Follow [AGENTS.md](AGENTS.md) for code conventions.

## Verify changes

Run `npm test` and `git diff --check`. For JavaScript changes, run `node --check` on each changed module. Tests use `node:test` and `node:assert/strict`.

Update catalog count assertions when necessary. Add meaningful tests for changed filter or sort behavior. For UI changes, check desktop and mobile layouts, keyboard focus, category and story filters, search, sorting, direct entry links, and dialog dismissal with Escape.

## Submit a pull request

1. Fork [the repository](https://github.com/wbreiler/KilledByApple).
2. Create a focused branch, such as `add-product-name` or `fix-watson-source`.
3. Make and verify your changes.
4. Commit with an imperative subject, such as `Add sourced product entry`.
5. Open a pull request against the repository’s default branch.

Describe what changed, link supporting sources and relevant issues, and list the checks you ran. Include screenshots for visual changes. Keep unrelated changes in separate pull requests.
