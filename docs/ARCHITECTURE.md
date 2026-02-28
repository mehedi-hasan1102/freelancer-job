# Module Boundaries

## Feature Modules
- `app/features/navbar/*`: Navbar interaction state, desktop/mobile navigation UI, and menu behavior.
- `app/features/skills/*`: Skills data loading, animations, and presentational cards.
- `app/features/dashboard/*`: Dashboard composition, UI cards, and GitHub data orchestration.
- `app/features/project-details/*`: Project details page sections, case-study derivation, and animations.

## Shared Hooks / Primitives
- `app/hooks/useCardGlow.ts`: shared pointer glow interaction primitive for interactive cards.
- `app/hooks/useRevealHeader.ts`: shared section-header reveal animation.

## Service Layer
- `lib/services/github-api.ts`: external GitHub API client with explicit error types (`GithubApiError`), suitable for mocking in tests.
- `app/features/dashboard/services/loadDashboardData.ts`: dashboard-specific aggregation/transformation logic using an injected GitHub API client.

## Component Responsibilities
- `app/components/*`: thin wrappers where possible, delegating feature logic to `app/features/*`.
- `app/features/*/components/*`: presentational pieces.
- `app/features/*/hooks/*`: behavior/state side effects and orchestration.
- `app/features/*/services/*`: external data integration and mapping.
