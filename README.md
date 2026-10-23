# Bell Energy Solutions website

Source for [bellenergysolutions.com](https://bellenergysolutions.com).

- **Start here:** [AGENTS.md](AGENTS.md) (rules for any AI agent or developer) and [OPERATIONS.md](OPERATIONS.md) (how the site is set up and run).
- **Facts:** every fact on the site comes from [business-facts.md](business-facts.md). Don't add claims that aren't there.
- **Stack:** [Astro](https://astro.build) static site on Cloudflare Workers.

## Commands

```bash
npm ci            # install
npm run dev       # local preview at http://localhost:4321
npm run build     # build to dist/
npm test          # type checks + Playwright layout, accessibility and form tests
npm run check:html  # titles, descriptions, H1s, broken links, HTML validation (after a build)
```

## How changes go live

Open a pull request. Automatic checks run, a preview link is posted on the PR, and the change goes live when the owner clicks **Merge**.
