---
name: bhawna-quality-release
description: Use when hardening Bhawna Foundation work for delivery, including QA, accessibility, responsive verification, security checks, performance passes, environment handling, or release readiness.
---

# Bhawna Quality and Release

Read `references/release-checklist.md` before considering a phase complete.

## Scope

- manual QA
- responsive verification
- accessibility review
- API and error-path verification
- security and validation checks
- release readiness

## Workflow

1. Test the exact phase scope first.
2. Check desktop, tablet, and mobile behavior.
3. Verify loading, empty, error, and success states.
4. Verify form validation on both client and server paths.
5. Confirm no earlier phase behavior regressed.

## Guardrails

- Do not call a feature complete if only the happy path works.
- Do not leave uncaught API errors or blank UI states.
- Do not ship without checking keyboard navigation and focus visibility on user-facing flows.
