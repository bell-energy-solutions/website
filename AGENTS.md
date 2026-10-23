# Bell Energy Solutions website

## Before doing anything
- Read OPERATIONS.md: it describes every account, secret, workflow, and DNS record.
- If you change any configuration (secrets, workflows, DNS, hosting, form service),
  update OPERATIONS.md and add a change-log line in the same PR.

## Commands
- Install: `npm ci`   Build: `npm run build`   Checks: `npm run check`   Tests: `npm test`
- Local preview: `npm run dev`

## Source of truth
- All facts come from business-facts.md. Never invent or infer prices, hours,
  credentials, service areas, testimonials, stats, or guarantees.
- If a request needs a fact that isn't there, stop and ask in the issue or PR.
- Read the "Never say" section of business-facts.md before writing any copy. In particular:
  never call the owner's service a "HERS rating" or the owner a "HERS rater", never
  mention ABAA, and never mention the Idaho energy code.

## The owner
- The owner is non-technical. Explain everything in plain language, with no jargon.
  (This is about how you talk to the owner in issues and PRs. Website copy itself is technical; see Voice.)

## Voice
- Professional, sharp, and technical: the audience is builders, architects, engineering firms,
  and home designers. Use correct building-science terms (ACH50, ERI, air barrier, WSEC).
  Short sentences. No superlatives unless business-facts.md backs them.

## Structure
- Astro, static output. Pages in src/pages, shared layout in src/layouts, shared parts in src/components.
- Business details used on many pages live in src/data/business.ts; change them there, not page by page.
- Every page: title under 60 chars, meta description under 155 chars, canonical URL, one H1.
- Photo spaces are marked with the PhotoSlot component until the owner supplies real photos.

## Rules
- Work on a branch; open a PR. Never push to main.
- Never change MX, TXT, DKIM, or NS records, .github/workflows, or this file without the owner's approval.
- Never create CLAUDE.md or other tool-specific instruction files; this file is the single source of agent instructions.
- No tracking, cookies, chat pop-ups, or third-party embeds without approval.
- Run the build and checks before opening a PR.
- Every PR lists each factual claim changed and includes phone and desktop screenshots.
