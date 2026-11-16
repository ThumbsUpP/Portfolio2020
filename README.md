# Pierre Cayol — portfolio

Personal portfolio, built as a fully static [Astro](https://astro.build) site. `pnpm build` writes plain HTML, CSS, and JS to `dist/` with no server adapter and no server endpoints. The site is served from the domain root (`https://pcayol.com/`).

## Requirements

- Node.js 22+
- [pnpm](https://pnpm.io) 10+

## Scripts

```bash
pnpm install
pnpm dev       # local dev server
pnpm build     # static build -> dist/
pnpm preview   # serve dist/ locally
```

Open the preview (or deploy the contents of `dist/`) at the domain root. Page assets, fonts, and images under `public/` are referenced with root-relative URLs (`/images/...`, `/favicon-pc.ico`).

## Deploy

Upload `dist/` to any static host. No Node process is required at runtime. Google Fonts (Open Sans) and the existing analytics snippet are loaded from their CDNs, matching the previous site.
