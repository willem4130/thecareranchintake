# The Care Ranch Intake - Design System

**Last Updated:** October 22, 2025
**Reference:** Based on client-provided editorial/magazine style HTML

---

## 🎨 Design Philosophy

**Aesthetic:** Sophisticated editorial/magazine style

- Clean, understated elegance
- Publication-quality feel
- Generous white space
- Subtle, refined interactions
- Trustworthy and professional tone

**Perfect for:** Deep, introspective questionnaire where users share personal reflections

---

## 📐 Color Palette

### Primary Colors

```css
--primary-red: #db2800; /* Vibrant red-orange for CTAs, links, emphasis */
--black: #000000; /* Primary text, headings */
--dark-gray: #333333; /* Secondary text, body copy */
--white: #ffffff; /* Backgrounds, clean space */
```

### UI Colors

```css
--border-light: #e7e7e7; /* Input borders, subtle dividers */
--border-medium: #ccc; /* Stronger borders */
--border-dark: #bdbdbd; /* Navigation separators */
--gray-medium: #666; /* Dropdown text, secondary elements */
--gray-dark: #767676; /* Account dropdown borders */
--gray-very-light: #f7f7f7; /* Background tints */
```

### Interactive States

```css
--hover-red: #db2800; /* Hover state for links */
--focus-underline: #db2800; /* Focus underline color */
--error-red: #e26154; /* Form errors, validation */
--error-bg: #ffeeea; /* Error background tint */
```

### Shadows

```css
--shadow-soft: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
--shadow-medium: 2px 2px 7px 0 rgba(0, 0, 0, 0.2);
--shadow-hover: 1.5px 1.5px 1px rgba(0, 0, 0, 0.2);
```

---

## 🔤 Typography

### Font Families

```css
--font-serif: 'Miller Text', Georgia, serif;
--font-sans: 'Libre Franklin', Helvetica, sans-serif;
--font-mono: 'Courier New', monospace;
```

### Usage Guidelines

- **Serif (Miller Text):** Headings, nav links, body copy, elegant elements
- **Sans-serif (Libre Franklin):** Alert messages, UI elements, forms
- **Default:** Serif for editorial feel

### Font Sizes & Styles

**Navigation**

```css
font-family: 'Miller Text', Georgia, serif;
font-size: 11px;
font-weight: 500;
letter-spacing: 2px;
line-height: 1.36;
text-transform: uppercase;
```

**Body Text**

```css
font-family: 'Miller Text', Georgia, serif;
font-size: 13px;
line-height: 1.5;
letter-spacing: 0.2px;
```

**Headings**

```css
font-family: 'Miller Text', Georgia, serif;
font-size: 16px-24px (scale up for importance);
font-weight: 700;
letter-spacing: 0-1px;
```

**Form Inputs**

```css
font-family: Arial, sans-serif; /* or Libre Franklin */
font-size: 12px;
```

**Buttons/CTAs**

```css
font-family: 'Miller Text', Georgia, serif;
font-size: 13.4px;
font-weight: 700;
text-transform: uppercase;
```

---

## 🧩 Component Patterns

### Buttons

**Primary Button (CTA)**

```css
background: #1f638a;
color: #fff;
font:
  700 13.4px / normal 'Miller Text',
  Georgia,
  serif;
text-transform: uppercase;
border: none;
border-radius: 3px;
padding: 12px;
cursor: pointer;
```

**Hover State**

```css
background: #05a7d4;
```

**Secondary Button**

```css
background: transparent;
color: #000;
border: 1px solid #000;
font:
  700 13px / normal 'Miller Text',
  Georgia,
  serif;
```

### Inputs

**Text Input**

```css
border: 1px solid #e7e7e7;
border-radius: 3px;
font-family: Arial, sans-serif;
font-size: 12px;
height: 42px;
padding: 5px 10px;
width: 100%;
```

**Focus State**

```css
border-color: #999;
outline: none;
```

**Error State**

```css
border: 1px solid #e26154;
```

### Links

**Default Link**

```css
color: #000;
text-decoration: underline;
```

**Hover State**

```css
color: #db2800;
box-shadow: 0 1px 0 0 #db2800;
```

**Navigation Link**

```css
color: #000;
font:
  11px/1.36 'Miller Text',
  Georgia,
  serif;
letter-spacing: 2px;
text-transform: uppercase;
text-decoration: none;
```

**Navigation Hover**

```css
box-shadow: 0 1px 0 0 #000;
```

### Cards/Containers

**White Card**

```css
background-color: #fff;
border-radius: 2px;
padding: 20px;
box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
```

**Gray Background**

```css
background-color: #f7f7f7;
```

### Dropdowns

**Dropdown Link**

```css
color: #666;
font:
  13px/1 'Miller Text',
  Georgia,
  serif;
letter-spacing: 0.2px;
padding: 10.6px 8px;
```

**Hover State**

```css
color: #db2800;
```

---

## 📱 Responsive Breakpoints

```css
--mobile: 640px;
--tablet: 768px;
--desktop: 1180px;
```

**Usage:**

```css
@media screen and (max-width: 640px) {
  /* Mobile */
}
@media screen and (min-width: 768px) {
  /* Tablet+ */
}
@media screen and (min-width: 1180px) {
  /* Desktop */
}
```

---

## 🎭 Interaction Patterns

### Hover Effects

- **Links:** Underline with primary red (#db2800)
- **Buttons:** Slightly lighter background
- **Dropdowns:** Red text color
- **Nav items:** Subtle box-shadow underline

### Focus States

- Remove default outline (`outline: 0`)
- Add custom underline or border color change
- Ensure accessibility with visible focus indicators

### Transitions

```css
transition: opacity 1.5s ease;
transition:
  visibility 0s,
  opacity 0.5s linear;
```

### Animations

- **Fade in:** Subtle opacity animations
- **Hover:** Instant or very quick (0.1-0.2s)
- **Page transitions:** Smooth, gentle

---

## 🎯 Questionnaire-Specific Design

### Progress Timeline

- Horizontal stepper across top of page
- Current step highlighted in red
- Completed steps with checkmarks
- Clean, minimal design with elegant typography

### Question Cards

- White background cards with subtle shadow
- Generous padding (24-32px)
- Clear visual hierarchy
- Serif typography for question text
- Sans-serif for input labels/hints

### Auto-save Indicator

```
Position: Top right or bottom right
Typography: 11px, serif, italic
Colors:
  - Saving: #666 (gray)
  - Saved: #db2800 (red)
  - Failed: #e26154 (error red)
```

### Page Layout

```
Max width: 800px (readable line length)
Padding: 40px on desktop, 20px on mobile
Background: White or very light gray
Typography: Serif for warmth and readability
```

---

## 🔧 Implementation Notes

### Tailwind Configuration

Add to `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#db2800',
        hover: '#c32300',
      },
      editorial: {
        black: '#000000',
        darkGray: '#333333',
        gray: '#666666',
        lightGray: '#e7e7e7',
        border: '#bdbdbd',
      },
      error: {
        DEFAULT: '#e26154',
        light: '#ffeeea',
      },
    },
    fontFamily: {
      serif: ['var(--font-miller)', 'Georgia', 'serif'],
      sans: ['var(--font-libre)', 'Helvetica', 'sans-serif'],
    },
    boxShadow: {
      'soft': '0 2px 4px 0 rgba(0,0,0,.24)',
      'medium': '2px 2px 7px 0 rgba(0,0,0,.2)',
    },
  },
}
```

### Font Loading

Use Next.js built-in font optimization:

```typescript
// app/layout.tsx
import { Georgia } from 'next/font/google';
// or use local Miller Text font files

const millerText = Georgia({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-miller',
});
```

---

## 📚 Component Library Structure

```
src/components/
├── ui/                    # shadcn/ui components (styled)
│   ├── button.tsx        # Editorial-styled buttons
│   ├── input.tsx         # Refined input fields
│   ├── card.tsx          # Container components
│   └── ...
├── questionnaire/
│   ├── QuestionCard.tsx  # Wrapper for questions
│   ├── ProgressTimeline.tsx
│   ├── AutoSaveIndicator.tsx
│   └── questions/
│       ├── ShortTextQuestion.tsx
│       ├── LongTextQuestion.tsx
│       ├── RatingQuestion.tsx
│       └── ...
└── layout/
    ├── PageContainer.tsx
    └── MaxWidthWrapper.tsx
```

---

## ✅ Design Checklist

When building components, ensure:

- [ ] Uses serif typography (Miller Text/Georgia) by default
- [ ] Primary red (#db2800) for CTAs and emphasis
- [ ] Generous white space and padding
- [ ] Subtle hover effects (not flashy)
- [ ] Clean, minimal aesthetic
- [ ] Mobile-responsive
- [ ] Accessibility (focus states, ARIA labels)
- [ ] Consistent with editorial/magazine feel

---

## 🎨 Quick Reference

**Most Common Patterns:**

```tsx
// Page Container
<div className="max-w-3xl mx-auto px-6 py-12 bg-white">

// Section Heading
<h2 className="font-serif text-2xl font-bold mb-6 text-editorial-black">

// Body Text
<p className="font-serif text-sm text-editorial-darkGray leading-relaxed">

// Primary Button
<button className="bg-primary hover:bg-primary-hover text-white font-serif font-bold uppercase px-6 py-3 rounded">

// Input Field
<input className="border border-editorial-lightGray rounded focus:border-editorial-gray px-4 py-3 w-full font-sans text-sm">

// Link
<a className="text-editorial-black hover:text-primary underline font-serif">
```

---

**This design system creates a trustworthy, elegant experience perfect for deep personal reflection.**
