---
name: web-accessibility
description: Audit and improve web accessibility following WCAG 2.1 guidelines. Use when the user mentions accessibility, a11y, ARIA, screen readers, keyboard navigation, color contrast, alt text, focus management, or accessible forms. Also use during front-end development to ensure accessible web experiences, or when reviewing HTML for accessibility compliance.
license: MIT
metadata:
  source: https://github.com/addyosmani/web-quality-skills
  author: Addy Osmani
  modifications: Adapted for Open Elements projects
---

# Accessibility (a11y) for web developers

Accessibility guidelines based on [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
and [Lighthouse accessibility audits](https://developer.chrome.com/docs/lighthouse/accessibility/scoring).
The goal of this skill: make content usable by everyone, including people with disabilities.

## WCAG Principles: POUR

| Principle          | Description                                       |
|--------------------|---------------------------------------------------|
| **P**erceivable    | Content can be perceived through different senses |
| **O**perable       | Interface can be operated by all users            |
| **U**nderstandable | Content and interface are understandable          |
| **R**obust         | Content works with assistive technologies         |

## Examples

### Text alternatives

**Images require alt text:**

```html
<!-- ❌ Missing alt -->
<img src="chart.png">

<!-- ✅ Descriptive alt -->
<img src="chart.png" alt="Bar chart showing 40% increase in Q3 sales">

<!-- ✅ Decorative image (empty alt) -->
<img src="decorative-border.png" alt="" role="presentation">

<!-- ✅ Complex image with longer description -->
<figure>
    <img src="infographic.png" alt="2024 market trends infographic"
         aria-describedby="infographic-desc">
    <figcaption id="infographic-desc">
        <!-- Detailed description -->
    </figcaption>
</figure>
```

**Icon buttons need accessible names:**

```html
<!-- ❌ No accessible name -->
<button>
    <svg><!-- menu icon --></svg>
</button>

<!-- ✅ Using aria-label -->
<button aria-label="Open menu">
    <svg aria-hidden="true"><!-- menu icon --></svg>
</button>

<!-- ✅ Using visually hidden text -->
<button>
    <svg aria-hidden="true"><!-- menu icon --></svg>
    <span class="visually-hidden">Open menu</span>
</button>
```

### Additonal examples

more examples will be added soon.

## Testing checklist

### Automated testing with Lighthouse or axe-core

```bash
# Lighthouse accessibility audit
npx lighthouse https://example.com --only-categories=accessibility

# axe-core
npm install @axe-core/cli -g
axe https://example.com
```

## References

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Deque axe Rules](https://dequeuniversity.com/rules/axe/)
- [Web Quality Audit](../web-quality-audit/SKILL.md)