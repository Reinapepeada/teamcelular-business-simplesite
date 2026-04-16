---
description: "Use when implementing or refactoring frontend code in web-client-mvp. Covers senior-level React/Next.js architecture, maintainability, performance, SEO semantics, testing expectations, and safe delivery practices."
name: "Frontend Senior Implementation"
applyTo: "{app,components,src,features,hooks,utils}/**/*.{ts,tsx,js,jsx}"
---

# Senior Frontend Implementation Rules

## Architecture And Boundaries
- Keep components focused and composable with single responsibility.
- Separate view, domain behavior, and data-fetch logic when complexity grows.
- Avoid deeply nested prop chains when context or composition is cleaner.

## State And Data Flow
- Keep local UI state local.
- Shared state should be explicit, predictable, and minimal.
- Prefer derived state over duplicated state.
- Handle loading, empty, and error states explicitly.

## Performance And SEO Semantics
- Use semantic HTML tags for content structure and crawlers.
- Keep Largest Contentful Paint and Cumulative Layout Shift in scope.
- Avoid unnecessary client-side JS and re-renders.
- Optimize media loading and avoid layout jumps.

## Accessibility By Default
- Ensure keyboard interactions for all interactive controls.
- Use proper labels, aria attributes only when needed, and logical tab flow.
- Preserve visible focus indicators.

## Code Quality
- Prefer explicit naming over clever shortcuts.
- Keep functions small and easy to test.
- Add short comments only where logic is non-obvious.
- Avoid broad refactors outside the task scope.

## Delivery Workflow
1. Read the relevant files before modifying architecture.
2. Implement minimal, maintainable changes.
3. Run project checks (lint, tests, build) when available.
4. Summarize behavior changes and potential regressions.

## Testing Expectations
- Add or update tests for logic changes when test infrastructure exists.
- For UI changes, verify interaction states and critical user paths.
- Call out uncovered risk when tests are not feasible.
