---
description: "Use when designing or updating UI/UX for web-client-mvp pages and components. Covers visual hierarchy, UX writing, responsive behavior, accessibility, and conversion-oriented layout decisions for React/Next.js UI."
name: "UX UI Design System"
applyTo: "{app,components,src}/**/*.{tsx,jsx,css,scss,mdx}"
---

# UX/UI Design Rules

## Experience Goals
- Prioritize clarity, confidence, and low-friction navigation.
- Each screen must have one primary action and clear secondary actions.
- Keep visual and writing decisions aligned with user intent.

## Layout And Visual Hierarchy
- Start mobile-first, then scale to tablet and desktop.
- Keep heading hierarchy semantic and consistent.
- Group related information in meaningful sections with clear labels.
- Use whitespace to separate intent, not decoration.

## UX Writing
- Use professional and clear Spanish (LatAm) by default.
- Prefer concrete wording over abstract marketing phrases.
- CTA labels should be action-first and outcome-aware.
- Error and helper messages must explain next steps.

## Accessibility Baseline
- Use semantic HTML landmarks and heading order.
- Ensure keyboard navigation and visible focus states.
- Do not rely on color alone for meaning.
- Maintain accessible contrast for text and interactive elements.

## Conversion And Content Design
- Keep critical value proposition and CTA above the first major scroll threshold.
- Remove decorative content that does not aid decision-making.
- Use social proof or trust signals only when relevant and truthful.

## Required Deliverables For UI Changes
- Brief rationale: user problem, design decision, expected outcome.
- Updated component states: default, loading, empty, error, success.
- Responsive notes for mobile and desktop behavior.
- Accessibility notes for focus, labels, and semantics.
