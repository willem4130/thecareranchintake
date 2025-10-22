# Typography Quick Reference

## Font Stack

```tsx
// Headings: Playfair Display (weight: 700)
className = 'font-serif';

// Body: Source Sans 3 (weights: 400, 600)
className = 'font-sans';
```

## Heading Classes

```tsx
<h1 className="heading-display">60px Display</h1>
<h1 className="heading-1">48px Heading 1</h1>
<h2 className="heading-2">36px Heading 2</h2>
<h3 className="heading-3">30px Heading 3</h3>
<h4 className="heading-4">24px Heading 4</h4>
<h5 className="heading-5">20px Heading 5</h5>
<h6 className="heading-6">18px Heading 6</h6>
```

## Body Text Classes

```tsx
<p className="body-large">18px Large body</p>
<p className="body-base">16px Regular body</p>
<p className="body-small">14px Small body</p>
```

## Label & UI Classes

```tsx
<label className="label-large">16px Large label</label>
<label className="label-base">14px Base label</label>
<label className="label-small">12px Small label</label>
<span className="caption">12px Caption</span>
```

## Font Weights

```tsx
className = 'font-normal-custom'; // 400 - Source Sans 3 Regular
className = 'font-semibold-custom'; // 600 - Source Sans 3 Semibold
className = 'font-bold-custom'; // 700 - Playfair Display Bold
```

## Font Sizes

```tsx
className = 'text-xs-custom'; // 12px
className = 'text-sm-custom'; // 14px
className = 'text-base-custom'; // 16px
className = 'text-lg-custom'; // 18px
className = 'text-xl-custom'; // 20px
className = 'text-2xl-custom'; // 24px
className = 'text-3xl-custom'; // 30px
className = 'text-4xl-custom'; // 36px
className = 'text-5xl-custom'; // 48px
className = 'text-6xl-custom'; // 60px
```

## Line Heights

```tsx
className = 'leading-tight-custom'; // 1.2
className = 'leading-snug-custom'; // 1.375
className = 'leading-normal-custom'; // 1.5
className = 'leading-relaxed-custom'; // 1.625
className = 'leading-loose-custom'; // 1.75
```

## Letter Spacing

```tsx
className = 'tracking-tight'; // -0.025em
className = 'tracking-normal'; // 0
className = 'tracking-wide'; // 0.025em
className = 'tracking-wider'; // 0.05em
className = 'tracking-widest'; // 0.1em
```

## Special Styles

```tsx
className = 'text-uppercase-spaced'; // Uppercase + wide spacing
className = 'text-editorial-serif'; // Playfair Display bold
className = 'text-editorial-sans'; // Source Sans 3 regular
```

## CSS Variables

```css
/* Font Sizes */
--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-base: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-2xl: 1.5rem; /* 24px */
--font-size-3xl: 1.875rem; /* 30px */
--font-size-4xl: 2.25rem; /* 36px */
--font-size-5xl: 3rem; /* 48px */
--font-size-6xl: 3.75rem; /* 60px */

/* Line Heights */
--line-height-tight: 1.2;
--line-height-snug: 1.375;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 1.75;

/* Letter Spacing */
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;

/* Font Weights */
--font-weight-normal: 400;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

## Common Patterns

### Page Heading

```tsx
<h1 className="heading-display mb-6">Page Title</h1>
```

### Section Heading

```tsx
<h2 className="heading-2 mb-4">Section Title</h2>
```

### Lead Paragraph

```tsx
<p className="body-large mb-6">Lead paragraph text that introduces content.</p>
```

### Body Content

```tsx
<p className="body-base mb-4">Regular paragraph text for main content.</p>
```

### Form Label

```tsx
<label className="label-base block mb-2">Field Label</label>
```

### Helper Text

```tsx
<span className="caption text-muted-foreground">Helper or supplementary information.</span>
```

### Button Text

```tsx
<button className="font-sans font-semibold-custom text-sm">Click Me</button>
```

## Responsive Behavior

Headings automatically scale on mobile (< 768px):

- Display: 60px → 40px
- H1: 48px → 32px
- H2: 36px → 28px

## Best Practices

1. **Use semantic HTML** - h1-h6, p, strong, etc.
2. **Playfair for headings** - All h1-h6 elements
3. **Source Sans for body** - Paragraphs, UI, labels
4. **Limit weights** - Only 400, 600, 700 across both fonts
5. **Rem units** - All sizes use rem for scalability
6. **System fallbacks** - Both fonts have proper fallback stacks

## Files Modified

- `/src/app/layout.tsx` - Font loading
- `/src/styles/globals.css` - CSS variables & styles
- `/tailwind.config.ts` - Tailwind config
- `/src/components/TypographyExample.tsx` - Example component
- `/TYPOGRAPHY.md` - Full documentation

---

**Font Pairing:** Playfair Display (headings) + Source Sans 3 (body)
**Google Fonts URL:** https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+3:wght@400;600&display=swap
