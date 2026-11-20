# MANA CAFÉ

A Persian-first cafe website, built as a PANDORUNT portfolio project. Built with Next.js (App Router), TypeScript and Tailwind CSS, and exported as static files for GitHub Pages.

## Install and run

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck && npm run lint
npm run build        # static output in out/
```

## Deploy to GitHub Pages

1. Create a repository (suggested name: `mana-cafe`) and push the code to the `main` branch.
2. Go to Settings → Pages → Source: **GitHub Actions**.
3. The workflow `.github/workflows/deploy.yml` reads the repository name automatically from `github.event.repository.name` and sets `NEXT_PUBLIC_BASE_PATH=/<repo>`. No repository name is hardcoded.
4. To build locally for a subpath:
   ```bash
   NEXT_PUBLIC_BASE_PATH=/mana-cafe NEXT_PUBLIC_SITE_URL=https://USERNAME.github.io/mana-cafe npm run build
   ```

## Project structure

- `src/data`: static categories and products
- `src/services/catalog.ts`: data access interface
- `src/hooks`: LocalStorage hooks
- `src/components`: UI components
- `src/app`: pages and routes

## Demo admin dashboard

`/admin/` has no login and is **not secure**. Changes are saved only in the LocalStorage of the current browser (keys prefixed with `mana_`). Product detail pages are generated at build time, so a product added from the dashboard appears in the menu but has no detail page.

## Backend migration

Write a new implementation of `CatalogService` (API or database), connect the hooks in `src/hooks/useCatalog.ts` to it, and add real server-side authentication.

## Known limitations

- Real product photos are not included yet. See `IMAGES_TODO.md`.
- The logo text is not converted to paths and renders with the Vazirmatn/Tahoma font. Outline it in Figma or Inkscape for the final version.
- The hero uses an SVG graphic in place of a photograph.
