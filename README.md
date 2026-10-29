<p align="center">
  <img src="./public/mika.webp" alt="Sekai Beyond Logo" width="100"/>
</p>

<h1 align="center">Sekai Beyond Developers</h1>

<p align="center">
  <strong>Developer docs for Sekai Beyond: the ticket API and the website</strong>
</p>

<p align="center">
  <a href="https://docs.sekaibeyond.com">docs.sekaibeyond.com</a> •
  <a href="https://github.com/SekaiBeyond/SekaiBeyond-Web">SekaiBeyond-Web</a>
</p>

---

The source of [docs.sekaibeyond.com](https://docs.sekaibeyond.com), in English and Simplified Chinese. It's a static site built with [Fumadocs](https://fumadocs.dev) on Next.js and served by GitHub Pages.

## Running it

Node.js 26, as in CI.

```bash
npm install
npm run dev
```

Then open http://localhost:3000/en.

| Command               | Does                                   |
| --------------------- | -------------------------------------- |
| `npm run dev`         | Serve the site with hot reload         |
| `npm run build`       | Build the static site into `out/`      |
| `npm start`           | Serve the built site from `out/`       |
| `npm run types:check` | Check types, including MDX frontmatter |
| `npm run lint`        | Lint and check formatting with Biome   |
| `npm run format`      | Format every file with Biome           |

## Where things are

```
content/docs/
  en/                     English, the source every other language follows
    ticket-api/           Tab: Ticket API (guides)
    api-reference/        Tab: API Reference (endpoints, objects, errors)
    website/              Tab: Website (contributor docs, English only)
  zh/                     Simplified Chinese, same paths as en/
lib/examples.ts           The request and response beside each endpoint
lib/snippets.ts           Turns those into cURL, Python, Node.js, Go and Java
components/api.tsx        Endpoint, ApiPage, RequestExample, ObjectExample, Params, Param, Properties
```

Each folder's `meta.json` sets its sidebar title and page order. A folder with `"root": true` is a tab in the navbar.

## Writing docs

- **Add a page:** write `content/docs/en/<tab>/<name>.mdx` with a `title` and `description`, and add `<name>` to that folder's `meta.json`.
- **Translate it:** write the same path under `zh/`. A page missing from `zh/` shows the English one in its place, which is how the Website tab works.
- **Link between pages** with relative file paths, such as `[Errors](./errors.mdx)`. They become the right URL for each language.
- **An endpoint page** sets `full: true` in its frontmatter and wraps its text in `<ApiPage operation="…">`, which puts the request and response beside it. Add the operation to `lib/examples.ts` first. Both languages share it, so code samples never drift between them.

## Deploying

Every push to `main` builds the site and publishes `out/` to GitHub Pages (see [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). Pull requests only build it. Nothing needs setting up in the repo: the workflow publishes with GitHub's own token.

The site is served at `docs.sekaibeyond.com`, set under **Settings > Pages > Custom domain**, by a DNS record on Cloudflare:

| Type    | Name   | Target                  | Proxy    |
| ------- | ------ | ----------------------- | -------- |
| `CNAME` | `docs` | `sekaibeyond.github.io` | DNS only |

Leave it DNS only: GitHub issues the HTTPS certificate itself, which it can't do behind Cloudflare's proxy.
