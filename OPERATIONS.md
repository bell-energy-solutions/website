# Operations

This file will become the complete map of how the website is configured and run
(accounts, secrets, workflows, DNS, runbooks). It is written in full, from verified
reality, at the end of setup (SITE_BUILDER.md step 8.5).

## Current state (setup in progress)
- Repository: github.com/bell-energy-solutions/website (public)
- Stack: Astro (static output), Node 22+
- Hosting: Cloudflare Workers (`wrangler.jsonc`): static assets from `dist/` plus `worker/index.js`, which 301-redirects www and http to https://bellenergysolutions.com
- Domain: bellenergysolutions.com, registered at Namecheap; nameservers moved to Cloudflare 2026-10-25 (giancarlo/tricia.ns.cloudflare.com). Pre-move DNS snapshot: `dns-snapshot-before.txt`. Email (MX, DKIM) is DNS-only in Cloudflare: do not change without the owner's approval
- Contact form: Web3Forms (FORM_ACCESS_KEY secret)
- AI helper: `.github/workflows/ai-agent.yml` responds to issues labelled `agent` and to `@claude` mentions.
  Secret: `CLAUDE_CODE_OAUTH_TOKEN` (owner's Claude subscription; expires about 2027-10-22).
- Setup progress: `.site-builder/progress.json`

## Change log
- 2026-10-22: Repository created; AI helper workflow added.
- 2026-10-23: PR checks, preview deploys, deploy-on-merge, and branch protection added.
- 2026-10-25: DNS moved to Cloudflare (records copied and verified identical); domain attached to the Worker with www/http redirects.
