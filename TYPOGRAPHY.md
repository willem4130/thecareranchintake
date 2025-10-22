# Typography System Documentation

## Font Pairing: Playfair Display + Source Sans 3

**Description:** Elegant serif + clean sans - perfect for editorial and content-focused applications.

### Font Details

**Heading Font: Playfair Display**

- Weight: 700 (Bold)
- Use: All headings (h1-h6)
- Character: Elegant, high-contrast serif with sophisticated appearance

**Body Font: Source Sans 3**

- Weights: 400 (Regular), 600 (Semibold)
- Use: Body text, UI elements, labels
- Character: Clean, readable sans-serif with excellent legibility

### Google Fonts Integration

Fonts are loaded via Next.js font optimization in `/src/app/layout.tsx`:

```typescript
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-sans',
  display: 'swap',
});
```

## Typography Scale

### Font Sizes (rem units for scalability)

| Variable           | Size     | px   | Usage                  |
| ------------------ | -------- | ---- | ---------------------- |
| `--font-size-xs`   | 0.75rem  | 12px | Small labels, captions |
| `--font-size-sm`   | 0.875rem | 14px | Secondary text         |
| `--font-size-base` | 1rem     | 16px | Body text              |
| `--font-size-lg`   | 1.125rem | 18px | Large body text        |
| `--font-size-xl`   | 1.25rem  | 20px | Small headings         |
| `--font-size-2xl`  | 1.5rem   | 24px | h6, h5                 |
| `--font-size-3xl`  | 1.875rem | 30px | h4                     |
| `--font-size-4xl`  | 2.25rem  | 36px | h3                     |
| `--font-size-5xl`  | 3rem     | 48px | h2                     |
| `--font-size-6xl`  | 3.75rem  | 60px | h1                     |

### Responsive Typography

Mobile adjustments (< 768px):

- `--font-size-6xl-mobile`: 2.5rem (40px) - h1
- `--font-size-5xl-mobile`: 2rem (32px) - h2
- `--font-size-4xl-mobile`: 1.75rem (28px) - h3

### Line Heights

| Variable                | Value | Usage            |
| ----------------------- | ----- | ---------------- |
| `--line-height-tight`   | 1.2   | Headings         |
| `--line-height-snug`    | 1.375 | Subheadings      |
| `--line-height-normal`  | 1.5   | Body text        |
| `--line-height-relaxed` | 1.625 | Large body text  |
| `--line-height-loose`   | 1.75  | Spacious reading |

### Letter Spacing

| Variable                  | Value    | Usage            |
| ------------------------- | -------- | ---------------- |
| `--letter-spacing-tight`  | -0.025em | Large headings   |
| `--letter-spacing-normal` | 0        | Default          |
| `--letter-spacing-wide`   | 0.025em  | Small headings   |
| `--letter-spacing-wider`  | 0.05em   | UI elements      |
| `--letter-spacing-widest` | 0.1em    | Uppercase labels |

### Font Weights

| Variable                 | Value | Font             | Usage             |
| ------------------------ | ----- | ---------------- | ----------------- |
| `--font-weight-normal`   | 400   | Source Sans 3    | Regular body text |
| `--font-weight-semibold` | 600   | Source Sans 3    | Emphasis, labels  |
| `--font-weight-bold`     | 700   | Playfair Display | Headings          |

## Usage Examples

### CSS Variables

Use CSS variables directly in your styles:

```css
.my-heading {
  font-size: var(--font-size-4xl);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}
```

### Tailwind Classes

#### Font Families

```jsx
<h1 className="font-serif">Heading with Playfair Display</h1>
<p className="font-sans">Body text with Source Sans 3</p>
```

#### Font Sizes

```jsx
<p className="text-xs-custom">Extra small text</p>
<p className="text-base-custom">Base body text</p>
<h1 className="text-6xl-custom">Display heading</h1>
```

#### Line Heights

```jsx
<h2 className="leading-tight-custom">Tight heading</h2>
<p className="leading-relaxed-custom">Relaxed body text</p>
```

#### Letter Spacing

```jsx
<h1 className="tracking-tight">Large heading with tight spacing</h1>
<span className="tracking-widest uppercase">UPPERCASE LABEL</span>
```

#### Font Weights

```jsx
<p className="font-normal-custom">Regular text</p>
<strong className="font-semibold-custom">Semibold text</strong>
<h1 className="font-bold-custom">Bold heading</h1>
```

### Utility Classes

The system includes pre-built utility classes for common typography patterns:

#### Heading Classes

```jsx
<h1 className="heading-display">Display Heading</h1>
<h1 className="heading-1">Heading 1</h1>
<h2 className="heading-2">Heading 2</h2>
<h3 className="heading-3">Heading 3</h3>
<h4 className="heading-4">Heading 4</h4>
<h5 className="heading-5">Heading 5</h5>
<h6 className="heading-6">Heading 6</h6>
```

#### Body Text Classes

```jsx
<p className="body-large">Large body text (18px)</p>
<p className="body-base">Base body text (16px)</p>
<p className="body-small">Small body text (14px)</p>
```

#### Label Classes

```jsx
<label className="label-large">Large Label</label>
<label className="label-base">Base Label</label>
<label className="label-small">Small Label</label>
```

#### Caption & Special Text

```jsx
<span className="caption">Small caption text</span>
<span className="text-uppercase-spaced">UPPERCASE SPACED</span>
<span className="text-editorial-serif">Editorial serif style</span>
<span className="text-editorial-sans">Editorial sans style</span>
```

## HTML Element Defaults

All HTML heading and text elements have default styles applied:

### Headings (h1-h6)

- Font: Playfair Display (serif)
- Weight: 700 (bold)
- Color: Foreground color
- Line height: Tight (1.2)
- Responsive sizing on mobile

### Body Text (p)

- Font: Source Sans 3 (sans)
- Weight: 400 (regular)
- Line height: Relaxed (1.625)

### Links (a)

- Inherits color
- Underlined by default
- Hover: Primary color

### Strong/Bold (strong, b)

- Font weight: 600 (semibold)

### Lists (ul, ol)

- Line height: Relaxed (1.625)

### Code (code, pre)

- Monospace font stack
- Background: Muted color
- Proper styling for inline and block code

## Best Practices

### 1. Font Weight Usage

- Limit to 2-3 weights maximum per typeface
- Playfair Display: Only 700 (headings)
- Source Sans 3: 400 (body), 600 (emphasis)

### 2. Hierarchy

- Establish clear visual hierarchy with size and weight
- Use Playfair Display for headings
- Use Source Sans 3 for everything else

### 3. Line Length

- Keep body text between 45-75 characters per line
- Use the `editorial-container` class (max-width: 48rem) for optimal reading

### 4. Responsive Typography

- All sizes use rem units for scalability
- Headings automatically scale down on mobile
- Test at different viewport sizes

### 5. Accessibility

- Maintain WCAG contrast ratios
- Use semantic HTML elements
- Ensure readable font sizes (minimum 16px for body)

### 6. Performance

- Fonts use `display: swap` for optimal loading
- Next.js automatically optimizes font loading
- Only necessary weights are loaded

## Fallback Fonts

### Serif Stack (Playfair Display)

```
'var(--font-playfair)', Georgia, Cambria, 'Times New Roman', serif
```

### Sans Stack (Source Sans 3)

```
'var(--font-source-sans)', -apple-system, BlinkMacSystemFont, 'Segoe UI',
Roboto, Helvetica, Arial, sans-serif
```

System fonts are provided as fallbacks to ensure proper rendering even if web fonts fail to load.

## File Locations

- **Font Loading:** `/src/app/layout.tsx`
- **CSS Variables:** `/src/styles/globals.css` (lines 68-117)
- **Base Styles:** `/src/styles/globals.css` (lines 143-271)
- **Utility Classes:** `/src/styles/globals.css` (lines 575-744)
- **Tailwind Config:** `/tailwind.config.ts`

## Example Implementation

```jsx
import React from 'react';

export default function TypographyShowcase() {
  return (
    <div className="editorial-container">
      {/* Display Heading */}
      <h1 className="heading-display mb-4">Welcome to The Care Ranch</h1>

      {/* Large body text */}
      <p className="body-large mb-6">
        This is an example of large body text using Source Sans 3. It's perfect for lead paragraphs
        and important content.
      </p>

      {/* Heading 2 */}
      <h2 className="heading-2 mb-3">Leadership Retreat Information</h2>

      {/* Regular body text */}
      <p className="body-base mb-4">
        Regular body text provides excellent readability for longer form content. The Source Sans 3
        font family ensures clear, comfortable reading at all sizes.
      </p>

      {/* Labels and small text */}
      <label className="label-base block mb-2">Email Address</label>

      <span className="caption text-muted-foreground">
        We'll never share your email with anyone else.
      </span>
    </div>
  );
}
```

## Support

For questions or issues with the typography system, refer to:

- This documentation file
- `/src/styles/globals.css` for CSS implementation
- `/tailwind.config.ts` for Tailwind configuration
- Google Fonts documentation: https://fonts.google.com
