# Repository Guidelines

## Project Structure & Module Organization

All source files live at the repository root. `index.html` defines the page, `style.css` defines responsive styles, and `favicon.svg` supplies the icon. `app.js` renders entries and manages filters, navigation, and dialogs. `catalog.js` contains the pure search and sort function. `graveyard.json` stores the catalog. `catalog.test.js` validates data and behavior. `server.js` provides a local preview. See `README.md` for deployment and entry fields.

## Build, Test, and Development Commands

Use Node.js 22 or later. No dependency installation or build step is required.

- `npm run dev`: serve the site at `http://localhost:3000`.
- `npm start`: run the same preview server.
- `PORT=3001 npm run dev`: use another local port.
- `npm test`: run tests with Node’s built-in test runner.
- `node --check app.js`: check JavaScript syntax. Repeat for changed modules.

Deploy the static assets listed in `README.md` through a static host. Keep source in this repository. Do not introduce Sites unless it preserves source here.

## Coding Style & Naming Conventions

Use ES modules, two-space indentation, single-quoted JavaScript strings, and semicolons. Keep JSON indented with two spaces. Use camelCase for variables and functions, and lowercase kebab-case for entry IDs, such as `dark-sky`. Follow existing CSS classes. No formatter or linter is configured.

Prefer native browser features and Node APIs over dependencies. Preserve keyboard access, visible focus, reduced-motion support, and mobile layouts. Render catalog text with `textContent`.

## Catalog Editorial Rules

Include entire product lines, distinct apps, or services. Exclude annual model replacements, rumors, and active products. Provide credible HTTPS sources and explain date exceptions.

Use `history` values `apple`, `acquired`, or `sherlocked`. Acquired entries require an acquisition year. For Sherlocking cases, identify who ended support. Do not claim Apple caused closure without evidence.

## Testing Guidelines

Name tests `*.test.js`. Use `node:test` and `node:assert/strict`. No numerical coverage threshold exists. Cover changed filter behavior and catalog constraints. Update count assertions when entries change. Check desktop and mobile layouts, direct entry links, dialogs, and Escape behavior after UI changes.

## Commit & Pull Request Guidelines

Existing commits use concise imperative subjects, such as `Build searchable Apple product archive`. Follow this style. Keep changes focused. Describe the change, sources, and validation in each pull request. Link relevant issues and include screenshots for visual changes.
