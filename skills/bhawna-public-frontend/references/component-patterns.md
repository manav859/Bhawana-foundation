# Public Frontend Component Patterns

## Layout patterns

- Use a centered content container with generous desktop padding and tighter mobile gutters.
- Alternate light sections with white or soft-tinted sections to match the design rhythm.
- Preserve strong vertical spacing between sections; do not compress the page into a dense app layout.

## Repeated UI patterns from the design

- top navbar with brand, nav links, and a prominent donate CTA
- hero with background image, dark overlay, eyebrow tag, headline, supporting copy, and dual CTA buttons
- four-up impact stats band
- image-plus-content split section for story or about content
- card grids for programs, projects, blog posts, and testimonials
- full-width newsletter and donation CTA strips
- multi-column footer with contact and quick links

## Interaction expectations

- Mobile nav should use a proper open and close state.
- Cards should have subtle hover lift or border emphasis, not dramatic motion.
- CTA buttons should have one solid primary treatment and one lighter secondary treatment.
- Form controls should show focus, validation errors, disabled states, and success confirmation.

## Content handling

- Prefer mapping arrays into reusable cards.
- Keep link text and buttons consistent with the design language: direct, positive, action-oriented.
- Trim copy carefully on smaller screens instead of letting cards break unpredictably.
