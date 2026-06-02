# NEMO DESIGN STUDIOS React Site

Static React site served locally by Node and ready for GitHub Pages.

## Brand font

The wordmark is split into two parts:

- `NEMO DESIGN`: bold weight
- `STUDIOS`: `benzin-regular`

Place the real font file at:

```text
public/assets/fonts/benzin-regular.woff2
```

The CSS already includes the `@font-face` hook.

## Local preview

```powershell
node server.js
```

Then open:

```text
http://localhost:3000
```

## GitHub Pages Hosting

GitHub Pages cannot run `server.js`; publish the `public` folder as the static site.

Recommended setup for easiest routing:

1. Create a repository named `YOUR-GITHUB-USERNAME.github.io`, or use a custom domain.
2. Upload everything inside `public/` to the repository root.
3. In GitHub, open `Settings > Pages`.
4. Set `Source` to `Deploy from a branch`.
5. Choose the `main` branch and `/root`.
6. Save, then open the Pages URL after GitHub finishes deploying.

The `public/404.html` file is included so clean routes like `/work`, `/services`, and `/approach` can load the React app directly.

If you want to keep the full project structure, deploy with a platform that supports Node, or use GitHub Actions to publish only the `public/` folder.
