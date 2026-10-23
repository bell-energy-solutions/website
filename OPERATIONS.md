# Operations

This file will become the complete map of how the website is configured and run
(accounts, secrets, workflows, DNS, runbooks). It is written in full, from verified
reality, at the end of setup (SITE_BUILDER.md step 8.5).

## Current state (setup in progress)
- Repository: github.com/bell-energy-solutions/website (public)
- Stack: Astro (static output), Node 22+
- Hosting: Cloudflare Workers static assets (not live yet)
- Contact form: Web3Forms (not connected yet)
- AI helper: `.github/workflows/ai-agent.yml` responds to issues labelled `agent` and to `@claude` mentions.
  Secret: `CLAUDE_CODE_OAUTH_TOKEN` (owner's Claude subscription; expires about 2027-10-22).
- Setup progress: `.site-builder/progress.json`

## Change log
- 2026-10-22: Repository created; AI helper workflow added.
