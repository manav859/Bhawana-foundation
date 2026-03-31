# Phase Release Checklist

## Frontend

- layout matches the relevant Pencil frame closely
- desktop, tablet, and mobile all work
- buttons, links, forms, and menus have visible interaction states
- keyboard navigation works
- focus styles are visible
- empty, loading, error, and success states are present where needed
- images have fallbacks and alt text

## Backend

- request validation exists for every write endpoint in scope
- controllers return consistent JSON responses
- database writes are intentional and verified
- meaningful errors are returned for invalid requests
- rate limiting or anti-spam exists for public submissions when relevant

## Integration

- frontend and backend contracts match
- no fake success messages exist
- publish-state or status handling is explicit
- user-visible copy is real and consistent with the design tone

## Phase closeout

- summarize completed work
- list files created and updated
- note remaining assumptions
- define the next phase clearly
