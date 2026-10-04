# Killed by Apple

An independent graveyard for discontinued Apple product lines, software, and services. Inspired by [Killed by Google](https://github.com/codyogden/killedbygoogle), with an original implementation and design.

## Run

Requires Node.js 22 or later. No dependencies or installation step.

```sh
npm run dev
```

Open http://localhost:3000. Run `npm test` to check the catalog, filters, and sorting.

## Features

- Responsive archive with search, category filters, and four sort options.
- Individual entry details with shareable URL fragments, such as `/#ipod`.
- Story filters for Apple originals, acquired products, and documented Sherlocking cases.
- Source links and editorial notes that distinguish discontinuation from a service shutdown.
- Native accessible dialogs, keyboard focus, reduced-motion support, and live result counts.

## Add an entry

Edit `graveyard.json`. Each entry contains `id`, `name`, `type` (`hardware`, `software`, or `service`), `start`, `end`, `description`, `note`, `source`, and `icon`. Each entry also includes `history` (`apple`, `acquired`, or `sherlocked`). Acquired entries include an `acquired` year. Optional `references` contain labeled source URLs. Years are intentionally year-level precision. `icon` accepts `ipod`, `airport`, `hardware`, `software`, `service`, or `photo`.

Include only entire product lines, distinct applications, or services. Group all iPods together. Group AirPort Express, Extreme, and Time Capsule together. Exclude routine model refreshes, discontinued colors, rumors, and products that remain available. A retired product line with a successor can qualify, but explain the transition. Acquired products can qualify. State their acquisition history in the note. The acquisition year must precede or match discontinuation.

A closed third-party product can qualify as a Sherlocking case when a credible source documents feature overlap with Apple. Label it `sherlocked`. Name the actual company that ended support and distinguish chronology from causation. Never imply Apple acquired it or ordered its closure. Exclude still-active products, even if Apple copied some features. Watson is the initial case. Its developer ended support under an agreement with Sun, after the overlap with Sherlock 3. Rebrands and successful continuations, such as Workflow becoming Shortcuts, do not qualify by themselves.

Use the end-of-sale year for software and hardware, or the shutdown year for services. Explain exceptions and staged shutdowns in `note`. Link to a credible source that documents the product’s end. Verify introduction years before adding entries. Existing products may continue to work after discontinuation. This is a curated starter catalog, not an exhaustive list.

The dataset includes 31 entries reviewed on October 4, 2026. Apple Pay, Apple Books, iTunes for Windows, and the current HomePod line are not discontinued and are excluded.

## Deploy

Serve `index.html`, `style.css`, `app.js`, `catalog.js`, `graveyard.json`, and `favicon.svg` through any static web host. No build step, server API, or Sites plugin is required. Relative asset paths support hosting at a subdirectory. The included Node server is for local preview only.

All application source lives at the repository root and can be tracked with Git. No code from Killed by Google is copied. This project is not affiliated with Apple Inc.
