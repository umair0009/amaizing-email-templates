# Amaizing Email Templates

> **Portfolio Showcase — Source Available for Review Only**
> This repository is a sanitized snapshot of professional work I contributed to as a
> **UI Developer at Amaizing Inc.** It is published here to document my involvement
> in the project. It is **not** intended to be cloned, built, modified, redistributed,
> or re-used. See [LICENSE](./LICENSE).

Transactional and marketing email templates for the Amaizing Platform — built with MJML, Mustachio templating, and the Perpendicular email-development framework, then delivered through Postmark.

---

## My Role

**UI Developer** — contributed responsive email layouts in MJML, variable/loop/conditional handling via Mustachio, template previews, and asset styling across the template library.

---

## Tech Stack

- **Templating:** MJML, AC Mustachio
- **Framework:** Perpendicular (email development framework)
- **Language:** TypeScript
- **Delivery:** Postmark
- **Build:** Yarn Berry
- **Tooling:** Biome, oxlint/oxfmt

---

## Repository Structure

```
src/
├── templates/              # Email templates organized by product area
│   └── amaizing/           # Platform-specific templates
│       ├── advantage/      # Advantage product emails
│       ├── auth/           # Auth flows (verify email, reset password)
│       ├── buyboxpro/      # BuyBoxPro alerts
│       └── trackpack/      # Trackpack alerts
├── layouts/                # Shared email layouts
└── deploy.ts               # Postmark deployment script
assets/                     # Shared images and styles
```

---

## Why This Repo Exists

Clients and recruiters sometimes ask for source-level proof of professional work. This repository provides that proof in a form that respects confidentiality:

- **Secrets removed** — no environment files, no API keys, no tokens (Postmark / DigitalOcean / registry tokens)
- **Internal documentation removed** — handoff notes, deployment scripts config, CI config
- **Dependencies on private packages preserved** in `package.json` — the repo will not install or build without access to Amaizing's private npm registry, by design

---

## Attribution

Original repository: `amaizing-inc/amaizing-email-templates` (private)
Owned and copyrighted by Amaizing Inc. Published here with the goal of demonstrating my personal contribution. If any part of this publication should be amended, please contact me.

---

## Contact

**Umair Ashraf**
UI Developer
GitHub: [@umair0009](https://github.com/umair0009)
