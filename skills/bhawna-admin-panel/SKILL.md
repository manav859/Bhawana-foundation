---
name: bhawna-admin-panel
description: Use when building the Bhawna Foundation admin panel, including responsive dashboard layout, authentication boundaries, CRUD screens, content management flows, submission review tools, or publish-state controls.
---

# Bhawna Admin Panel

Use this skill for all admin-facing work.

## Scope

- admin routing and layout
- authentication and authorization boundaries
- CRUD interfaces for content
- submission review screens
- publish and draft workflows
- responsive admin tables, cards, filters, and forms

## Workflow

1. Keep admin UI separate from the public site.
2. Build around real domain models and APIs, not temporary local-only state.
3. Prefer form schemas and reusable field components.
4. Support mobile and tablet admin usage, not desktop only.
5. Preserve clear feedback for save, publish, delete, and validation states.

## Guardrails

- Do not expose admin routes or actions without protection once auth is in scope.
- Do not mix admin styling with public marketing styles.
- Do not block future role-based access; leave room for admin and editor distinctions.
- Avoid complex tables that fail on smaller screens; provide stacked or card fallbacks.
