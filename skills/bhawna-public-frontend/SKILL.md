---
name: bhawna-public-frontend
description: Use when building or refining Bhawna Foundation public-facing React and Tailwind pages, shared layout, navigation, section components, responsive behavior, or page-level state handling.
---

# Bhawna Public Frontend

Read `references/component-patterns.md` and the design map before major UI work.

## Scope

- public pages only
- shared navbar, footer, page shells, and section primitives
- responsive layout from desktop through mobile
- user-facing states for forms and content blocks

## Workflow

1. Build page shells from the design hierarchy.
2. Extract shared patterns first: section headers, CTAs, cards, stat blocks, media blocks, button variants.
3. Keep page content data-driven where possible.
4. Use React Router for public navigation.
5. Make mobile behavior deliberate: stacked layouts, collapsible navigation, sensible tap targets, and preserved visual rhythm.

## Implementation rules

- Keep components small and reusable.
- Prefer semantic HTML and accessible controls.
- Use Tailwind utilities backed by a consistent token layer.
- Reuse the same button, card, badge, and container patterns across pages.
- Keep visual states real: hover, focus-visible, disabled, loading, empty, and error.

## Guardrails

- Do not turn unfinished pages into empty placeholders if the page is in scope; build the minimum truthful content version instead.
- Do not let one page invent a separate visual system.
- Preserve space for later CMS-driven content and admin editing.
