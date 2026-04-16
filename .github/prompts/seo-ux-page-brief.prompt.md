---
agent: seo_ux_frontend_pro
model: GPT-5 (copilot)
tools: [read, search, web, edit, execute]
description: "Generate a complete SEO + organic content + UX/UI page brief in Spanish (LatAm), with optional React/Next.js implementation handoff."
argument-hint: "Page goal, audience, keyword, route, search intent"
---

Use the SEO UX Frontend Pro agent to produce a full page brief from the inputs below, with special attention to organic content opportunities and internal linking.

## Inputs
- Page goal: ${input:page_goal:Main business goal of the page}
- Target audience: ${input:audience:Who this page is for}
- Primary keyword: ${input:primary_keyword:Main keyword to target}
- Secondary topics/entities: ${input:secondary_topics:Comma-separated list}
- Route or URL: ${input:route:/example-route}
- Search intent: ${input:search_intent:informational|commercial|transactional|navigational}
- Content angle: ${input:content_angle:service page|landing page|guide|pillar page|faq|comparison}
- Need code implementation now?: ${input:implement_now:no|yes}

## Required Output
1. Goal and search intent alignment
2. Keyword and entity map
3. Organic content strategy (content angle, supporting topics, FAQ opportunities, internal linking targets)
4. Content architecture (H1-H3)
5. Humanized copy draft (Spanish LatAm, professional and clear)
6. Metadata pack (title, meta description, slug, canonical note, internal links, schema suggestion)
7. UX/UI recommendations (layout hierarchy, CTA strategy, trust blocks, friction reduction)
8. Frontend handoff:
- If implement_now=yes: provide concrete Next.js/React implementation changes
- If implement_now=no: provide implementation roadmap and component structure only
9. Validation checklist (SEO, accessibility, Core Web Vitals)

## Guardrails
- Avoid keyword stuffing and robotic language.
- Prioritize clarity, utility, and conversion intent.
- Keep recommendations realistic for production.
