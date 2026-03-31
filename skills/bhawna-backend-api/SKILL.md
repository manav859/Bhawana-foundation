---
name: bhawna-backend-api
description: Use when implementing Bhawna Foundation Express and MongoDB backend features, including domain models, public content APIs, admin CRUD endpoints, validation, filtering, pagination, or service-layer architecture.
---

# Bhawna Backend API

Read `references/content-models.md` before introducing new collections or endpoints.

## Scope

- Express routes and controllers
- Mongoose schemas and indexes
- validation and sanitization
- service and repository style domain logic
- public content endpoints and later admin CRUD support

## Workflow

1. Model the domain first.
2. Add request validation before controller logic.
3. Keep controllers thin; push business rules into services.
4. Return stable response shapes for list and detail views.
5. Add pagination, filtering, and publish-state handling where content lists can grow.

## Required backend behavior

- Validate all write requests server-side.
- Normalize slugs and unique identifiers.
- Support drafts versus published content for future admin workflows.
- Store timestamps and relevant audit fields.
- Shape errors into predictable JSON responses.

## Guardrails

- Do not couple frontend assumptions directly into database schemas.
- Do not store display-only duplication unless it solves a real query or editorial need.
- Do not ship silent failures on form submissions or admin mutations.
