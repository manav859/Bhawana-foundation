---
name: bhawna-project-core
description: Use when starting or restructuring work for the Bhawna Foundation project, especially for repo architecture, phase boundaries, shared conventions, or decisions that affect both the public site and future admin panel.
---

# Bhawna Project Core

Use this skill before broad project work or when a task affects multiple layers.

Read `references/global-rules.md` first.

## Default decisions

- Use JavaScript only.
- Keep frontend and backend cleanly separated.
- Treat the design file as the source of truth for structure and visual direction.
- Preserve compatibility with later phases; do not hardwire shortcuts that block admin, content APIs, or deployment.

## Recommended structure

- `client/` for the public React app and later shared UI primitives.
- `server/` for Express, MongoDB models, validation, services, and API routes.
- Keep feature code grouped by domain, not by file type alone.

## Workflow

1. Confirm the current phase boundary from user instructions or repo state.
2. Touch only the scope needed for that phase.
3. If a missing cross-cutting concern is required for consistency, add the smallest stable version of it.
4. Prefer reusable modules, content-driven rendering, and stable interfaces between client and server.
5. Leave clean extension points for admin features, uploads, search, and SEO.

## Guardrails

- Do not build pages or panels the user has not asked for yet.
- Do not fake external integrations; if payment or email delivery is not integrated, model a truthful intermediate state.
- Every user-facing flow should have validation, loading, error, empty, and success states once the flow is in scope.
- Keep naming readable and domain-specific: programs, projects, events, volunteers, donations, newsletters.
