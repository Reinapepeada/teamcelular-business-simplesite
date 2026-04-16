---
description: "Use when reviewing SEO/content pages before publishing. Covers on-page SEO, internal linking, semantic structure, and content quality checks."
name: "SEO Content QA"
applyTo: "{app,components,src,public}/**/*.{ts,tsx,js,jsx,mdx,html,md}"
---

# SEO Content QA

## Content And Intent
- Confirm the page matches one primary search intent.
- Check that the angle is specific and not duplicative of nearby pages.
- Verify the content answers the user question early.

## On-Page SEO
- Confirm one clear H1 and a logical H2-H3 structure.
- Validate title tag, meta description, and slug for clarity.
- Check canonical usage if the page has variants or filters.
- Ensure internal links use descriptive anchor text.

## Organic Content Quality
- Make sure the copy sounds natural in Spanish (LatAm).
- Remove filler, repetition, and keyword stuffing.
- Add FAQ content only when it resolves real friction.
- Confirm topical entities and supporting sections are relevant.

## Accessibility And Readability
- Use semantic HTML and proper heading order.
- Ensure text is scannable on mobile.
- Check contrast, focus states, and meaningful alt text.

## Output
- Pass/fail for intent, SEO, readability, and accessibility.
- List blockers that should be fixed before publishing.
- Note any internal link opportunities or missing supporting content.