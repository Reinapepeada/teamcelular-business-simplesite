---
agent: seo_ux_frontend_pro
model: GPT-5 (copilot)
tools: [read, search, web, edit, execute]
description: "Generate an SEO + organic content brief for an article, guide, or pillar page in Spanish (LatAm)."
argument-hint: "Topic, primary keyword, audience, intent, route"
---

Use the SEO UX Frontend Pro agent to produce a content brief focused on organic visibility and reader usefulness.

## Inputs
- Topic: ${input:topic:Main article or guide topic}
- Target audience: ${input:audience:Who the content is for}
- Primary keyword: ${input:primary_keyword:Main keyword to target}
- Secondary topics/entities: ${input:secondary_topics:Comma-separated list}
- Search intent: ${input:search_intent:informational|commercial|transactional|navigational}
- Route or URL: ${input:route:/example-route}
- Content depth: ${input:depth:brief|standard|pillar}

## Required Output
1. Goal and search intent alignment
2. Keyword and entity map
3. Organic content strategy (angle, supporting sections, FAQ opportunities, internal linking targets)
4. Content outline (H1-H3)
5. Humanized copy draft (Spanish LatAm, professional and clear)
6. Metadata pack (title, meta description, slug, canonical note, schema suggestion)
7. UX writing and CTA notes
8. Validation checklist (SEO, readability, accessibility)

## Guardrails
- Avoid keyword stuffing and generic filler.
- Prefer clarity, usefulness, and topical authority.
- Link to existing repo documentation when relevant instead of repeating it.