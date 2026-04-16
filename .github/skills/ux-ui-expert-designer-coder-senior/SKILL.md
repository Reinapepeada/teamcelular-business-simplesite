---
name: ux-ui-expert-designer-coder-senior
description: "Senior UX/UI expert designer and coder workflow for React/Next.js product work. Use when designing pages, improving conversion UX, creating high-fidelity UI direction, and implementing production-ready frontend with accessibility, SEO, and Core Web Vitals checks. Keywords: ux, ui, design system, wireframe, interaction design, frontend architecture, nextjs, react, accessibility, seo, conversion, responsive design."
argument-hint: "Feature/page goal, target users, constraints, and current route or component"
user-invocable: true
---

# Senior UX/UI Expert Designer Coder

## What This Skill Produces
A complete design-to-code delivery flow that turns product goals into:
- UX strategy and screen structure
- Strong visual direction and component behavior
- Production-ready frontend implementation guidance
- Pre-release quality validation across accessibility, SEO, performance, and conversion

## When To Use
Use this skill when you need one or more of the following:
- Design or redesign a page, module, or critical feature flow
- Improve UX clarity, adoption, or conversion outcomes
- Translate UX/UI decisions into maintainable React/Next.js code
- Perform a senior review before release for quality and risk reduction

## Required Inputs
Collect these first before proposing solutions:
- Business goal and success metric (what must improve)
- Primary user type and top user intent
- Current route/component and constraints (API, deadlines, brand, legal)
- Device priorities (mobile-first, desktop-heavy, mixed)
- Existing design system constraints (if any)

If inputs are missing, ask focused questions and proceed with explicit assumptions.

## Workflow

### 1) Frame The Problem
- Define the user problem in one sentence.
- Define one primary action and up to two secondary actions.
- Translate the business goal into measurable UX outcomes.

Completion check:
- Problem, target user, and primary action are all explicit.

### 2) Map The UX Flow
- Outline the full user path from entry to success state.
- Identify friction points, decision moments, and potential abandonment points.
- Specify required states: default, loading, empty, error, success.

Decision branch:
- If task complexity is low, keep one clear path and minimal options.
- If complexity is high, split into progressive steps with clear progress cues.

Completion check:
- User can reach the primary outcome with minimal cognitive load.

### 3) Define Information Architecture
- Structure content into meaningful sections with clear headings.
- Keep one dominant hierarchy above the first major scroll threshold.
- Place trust signals and evidence near commitment points.

Decision branch:
- If page intent is transactional, prioritize proof, pricing, and CTA clarity.
- If page intent is informational, prioritize comprehension and scannability.

Completion check:
- Headings, section order, and CTA placement match user intent.

### 4) Design Interaction And States
- Define interaction patterns for forms, selections, filters, and confirmations.
- Write helper and error text that explains what to do next.
- Ensure keyboard access and focus behavior for each interactive element.

Decision branch:
- If a choice is high risk, add confirmation and explain consequences.
- If repeated input is expected, optimize with defaults and sensible shortcuts.

Completion check:
- Each interaction has clear affordance, feedback, and recovery path.

### 5) Set Visual Direction
- Define typography scale, spacing rhythm, and contrast strategy.
- Use deliberate color semantics (action, warning, success, neutral).
- Avoid generic layouts; build distinct visual hierarchy that supports task success.

Decision branch:
- If an established design system exists, extend existing tokens and patterns.
- If no design system exists, define minimal reusable primitives before scaling.

Completion check:
- Visual hierarchy is obvious on both mobile and desktop.

### 6) Translate To Frontend Architecture
- Split solution into composable components with single responsibility.
- Keep local state local; make shared state explicit and minimal.
- Separate rendering concerns from business/data logic when complexity grows.

Decision branch:
- If data dependencies are unstable, isolate adapters and normalize payloads.
- If SEO relevance is high, prioritize semantic HTML and metadata readiness.

Completion check:
- Component boundaries are clear and maintainable.

### 7) Implement With Quality Defaults
- Use semantic HTML and accessible labels.
- Prevent layout shifts by reserving media and dynamic container space.
- Avoid unnecessary re-renders and oversized client bundles.
- Add tests for critical logic and interaction paths where infrastructure exists.

Completion check:
- Implementation is production-ready, readable, and testable.

### 8) Run Release Gates
Run this gate before sign-off:
- SEO: one clear H1, valid metadata, meaningful internal linking, valid schema when applicable.
- Accessibility: keyboard navigation, focus visibility, labels, contrast, non-color-only meaning.
- Core Web Vitals risk: LCP candidate prioritized, CLS mitigated, responsiveness protected.
- UX conversion: value proposition clear, CTA specific, state transitions coherent.

Completion check:
- No critical blocker in SEO, accessibility, performance, or conversion path.

## Output Format
Return work in this order:
1. Problem framing and success metric
2. UX flow and friction map
3. IA and section hierarchy
4. Interaction/state specification
5. Visual direction notes
6. Frontend component and state architecture
7. QA gate results and open risks
8. Implementation plan with priority order

## Quality Standards
- Prioritize clarity over decorative complexity.
- Make design decisions traceable to user intent and business goals.
- Keep copy concrete, concise, and action-oriented.
- Preserve maintainability and avoid broad refactors outside scope.
- Explicitly call out assumptions, risks, and unresolved dependencies.
