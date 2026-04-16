---
description: "Use when doing pre-release QA for frontend pages. Covers SEO metadata validity, accessibility smoke checks, and Core Web Vitals risk review before shipping."
name: "Pre Release SEO A11Y Vitals QA"
applyTo: "{app,components,src,public}/**/*.{ts,tsx,js,jsx,mdx,html}"
---

# Pre Release QA Checklist

Run this checklist before merging or deploying UX/content/frontend changes.

## 1) SEO Validation
- Confirm one clear H1 aligned to page intent.
- Validate title and meta description for uniqueness and clarity.
- Verify canonical strategy if page variants exist.
- Confirm internal links use descriptive anchor text.
- Ensure structured data exists only when semantically correct.

## 2) Accessibility Smoke Checks
- Keyboard-only navigation reaches key interactions.
- Focus indicators are visible and logical.
- Form fields have explicit labels and actionable error messages.
- Images have meaningful alt text when informative.
- Contrast is sufficient for text and controls.

## 3) Core Web Vitals Risk Review
- LCP candidate is prioritized and not blocked by unnecessary scripts.
- CLS risks are mitigated (reserved media dimensions, stable layout).
- Interaction responsiveness risks are minimized (avoid heavy main-thread work).
- JS payload and client-render cost are proportionate to page value.

## 4) UX And Conversion Sanity
- Primary CTA is visible, specific, and outcome-oriented.
- Above-the-fold content states value and next action clearly.
- Loading, empty, error, and success states are coherent.
- Copy remains professional, clear, and humanized Spanish (LatAm).

## Output Requirement In PR/Chat Summary
- SEO pass/fail notes
- Accessibility pass/fail notes
- Core Web Vitals risks and mitigations
- Open risks that should block release
