# BALWEH Website

Company website starter built with:

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Useful commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Project structure

- `app/layout.tsx` - global structure and SEO metadata
- `app/page.tsx` - homepage
- `app/globals.css` - Tailwind import and global styles

## Deployment

### Hostinger (static export)

This project uses static export (`output: "export"`).

1. Build the site:

```bash
npm run build
```

2. Upload the contents of `out/` to Hostinger `public_html` directory.
3. Keep `.htaccess` in the uploaded root (it is included via `public/.htaccess`) so cache and security headers are applied.

Note: Next.js `headers()` are not used with static export, so caching is handled by `.htaccess` on Hostinger.
