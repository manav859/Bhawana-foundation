---
name: bhawna-engagement-flows
description: Use when building Bhawna Foundation user-submission flows such as contact forms, newsletter signup, volunteer applications, donation intent capture, or event registration with real validation and persistence.
---

# Bhawna Engagement Flows

Use this skill whenever a public interaction writes data.

## Scope

- contact form
- newsletter signup
- volunteer application
- donation intent or pledge flow
- event registration

## Workflow

1. Define the exact user promise first.
2. Validate on both client and server.
3. Persist submissions in MongoDB.
4. Return explicit success and failure states.
5. Expose enough status data for future admin review.

## Rules

- Never fake submission success if nothing is stored.
- Deduplicate newsletter signups by normalized email.
- Use rate limiting or a simple anti-spam measure on public forms.
- Keep donation flows truthful: if payment processing is not integrated yet, store a donation intent and say so clearly.
- Make validation messages specific and recoverable.

## UI expectations

- show inline field errors
- show pending button states
- show submit-level server errors
- show success confirmation
- preserve entered values when a recoverable error occurs
