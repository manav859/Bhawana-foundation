# Bhawna Foundation

Production-grade MERN scaffold for the Bhawna Foundation public website and admin panel.

## Architecture Overview

- `client/`: Vite + React + Tailwind application containing both the public website and admin panel shells.
- `server/`: Express API with modular route structure, MongoDB connection setup, auth-ready middleware, upload-ready middleware, and shared error handling.
- Workspace root: shared scripts for local development and build orchestration.

## Folder Structure

```text
.
|-- client/
|   |-- src/
|   |   |-- app/
|   |   |-- components/
|   |   |-- config/
|   |   |-- features/
|   |   |-- layouts/
|   |   `-- pages/
|   |-- .env.example
|   |-- package.json
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   `-- vite.config.js
|-- server/
|   |-- src/
|   |   |-- config/
|   |   |-- constants/
|   |   |-- middlewares/
|   |   |-- modules/
|   |   |-- routes/
|   |   `-- utils/
|   |-- uploads/
|   |-- .env.example
|   `-- package.json
|-- skills/
|-- Bhawna-foundation.pen
`-- package.json
```

## Setup Instructions

1. Install dependencies from the repo root:
   - `npm install`
2. Copy environment files:
   - `client/.env.example` to `client/.env`
   - `server/.env.example` to `server/.env`
3. Update `server/.env` with a valid MongoDB connection string and JWT secret.
4. Start both apps:
   - `npm run dev`
5. Open:
   - public app: `http://localhost:5173`
   - API: `http://localhost:5000`

## Current Scope

Phase 1 intentionally covers architecture, routing, layout shells, Tailwind setup, backend structure, env files, and dummy routes only. Business features, data models, admin CRUD forms, and page-specific UI implementations are reserved for later phases.
