# Animation System Documentation

Complete animation utilities for smooth, performant, and accessible interactions.

## Quick Reference

### CSS Variables (CSS Custom Properties)

```css
/* Duration Variables */
--duration-button: 250ms --duration-entrance: 500ms --duration-loading: 1500ms
  --duration-feedback: 500ms --duration-transition: 300ms --duration-micro: 200ms
  /* Easing Variables */ --ease-modern: cubic-bezier(0.4, 0, 0.2, 1)
  --ease-elegant: cubic-bezier(0.16, 1, 0.3, 1) --ease-smooth: cubic-bezier(0.4, 0, 0.6, 1)
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1) --ease-inout: ease-in-out;
```

---

## Animation Categories

### 1. Button & Hover Animations

**Modern Scale** - Smooth lift + scale for modern SaaS feel

**CSS Class:** `animate-modern-scale`

**Specifications:**

- Duration: 250ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Hover: translateY(-2px) scale(1.02) + shadow
- Active: translateY(0) scale(0.98)

**Usage Example:**

```tsx
<button className="animate-modern-scale bg-primary text-white px-6 py-3 rounded">Click Me</button>
```

**Tailwind Utilities:**

```tsx
// Use with custom transition timing
<button className="transition-transform duration-button ease-modern hover:scale-105">
  Custom Button
</button>
```

---

### 2. Entrance Animations

**Slide Up** - Elegant reveal from bottom with fade

**CSS Classes:**

- `animate-slide-up` - Standard entrance
- `animate-slide-up-delay-100` - 100ms delay
- `animate-slide-up-delay-200` - 200ms delay
- `animate-slide-up-delay-300` - 300ms delay

**Specifications:**

- Duration: 500ms
- Easing: cubic-bezier(0.16, 1, 0.3, 1)
- From: translateY(20px), opacity: 0
- To: translateY(0), opacity: 1

**Usage Example:**

```tsx
<div className="animate-slide-up">
  <h1>Welcome!</h1>
</div>;

{
  /* Staggered entrance animations */
}
<div className="space-y-4">
  <div className="animate-slide-up">First Item</div>
  <div className="animate-slide-up-delay-100">Second Item</div>
  <div className="animate-slide-up-delay-200">Third Item</div>
  <div className="animate-slide-up-delay-300">Fourth Item</div>
</div>;
```

---

### 3. Loading Animations

**Pulse** - Gentle pulsing for skeleton loading and waiting states

**CSS Class:** `animate-pulse-loading`

**Specifications:**

- Duration: 1500ms
- Easing: cubic-bezier(0.4, 0, 0.6, 1)
- Animation: scale(1) → scale(1.05) → scale(1)
- Opacity: 1 → 0.5 → 1
- Infinite: true

**Usage Example:**

```tsx
{
  /* Skeleton loading */
}
<div className="animate-pulse-loading bg-gray-200 h-10 rounded" />;

{
  /* Loading indicator */
}
<div className="animate-pulse-loading">
  <p>Loading...</p>
</div>;
```

---

### 4. Feedback Animations

**Success Pop** - Bouncy scale for success confirmations

**CSS Class:** `animate-success-pop`

**Specifications:**

- Duration: 500ms
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1) - Bounce effect
- From: scale(0), opacity: 0
- To: scale(1), opacity: 1

**Usage Example:**

```tsx
{
  /* Success checkmark */
}
<div className="animate-success-pop">
  <CheckIcon className="text-green-500" />
</div>;

{
  /* Success message */
}
<div className="animate-success-pop bg-green-100 p-4 rounded">✓ Saved successfully!</div>;
```

---

### 5. Page Transition Animations

**Fade Cross** - Simple cross-fade for page transitions

**CSS Classes:**

- `animate-fade-in` - Fade in animation
- `animate-fade-out` - Fade out animation
- `transition-page` - Smooth opacity transition

**Specifications:**

- Duration: 300ms
- Easing: ease-in-out
- Exit: opacity: 1 → 0
- Enter: opacity: 0 → 1

**Usage Example:**

```tsx
{
  /* Simple fade transition */
}
<div className="animate-fade-in">
  <PageContent />
</div>;

{
  /* With React/Next.js transitions */
}
<div className="transition-page">{content}</div>;
```

---

### 6. Micro-interaction Animations

**Toggle Slide** - Smooth toggle switch animation

**CSS Class:** `animate-toggle-slide`

**Specifications:**

- Duration: 200ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Animation: translateX(0) → translateX(20px)

**Usage Example:**

```tsx
{
  /* Toggle switch */
}
<button
  className={`relative w-12 h-6 bg-gray-300 rounded-full ${isEnabled ? 'bg-blue-500' : ''}`}
  onClick={() => setIsEnabled(!isEnabled)}
>
  <span
    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full animate-toggle-slide ${
      isEnabled ? 'active' : ''
    }`}
  />
</button>;
```

---

## Utility Classes

### Transform Transitions

**Smooth Transform:** `transition-transform-smooth`

- Smooth transform transitions with modern easing
- Duration: 250ms

**Usage:**

```tsx
<div className="transition-transform-smooth hover:scale-105">Hover to scale</div>
```

### Opacity Transitions

**Smooth Opacity:** `transition-opacity-smooth`

- Smooth opacity transitions
- Duration: 300ms

**Usage:**

```tsx
<div className="transition-opacity-smooth hover:opacity-50">Hover to fade</div>
```

### Combined Transitions

**All Smooth:** `transition-all-smooth`

- Combines transform and opacity transitions
- Optimized with will-change

**Usage:**

```tsx
<div className="transition-all-smooth hover:scale-105 hover:opacity-80">
  Smooth combined effects
</div>
```

### Scale on Hover

- `hover-scale-sm` - scale(1.02)
- `hover-scale-md` - scale(1.05)
- `hover-scale-lg` - scale(1.1)

**Usage:**

```tsx
<div className="transition-transform-smooth hover-scale-md">Hover to scale</div>
```

### Lift on Hover

- `hover-lift-sm` - translateY(-2px)
- `hover-lift-md` - translateY(-4px)

**Usage:**

```tsx
<div className="transition-transform-smooth hover-lift-sm shadow-lg">Hover to lift</div>
```

---

## Tailwind Utility Classes

### Custom Duration Classes

Use with `duration-*`:

```tsx
duration - button; // 250ms
duration - entrance; // 500ms
duration - loading; // 1500ms
duration - feedback; // 500ms
duration - transition; // 300ms
duration - micro; // 200ms
```

### Custom Easing Classes

Use with `ease-*`:

```tsx
ease - modern; // cubic-bezier(0.4, 0, 0.2, 1)
ease - elegant; // cubic-bezier(0.16, 1, 0.3, 1)
ease - smooth; // cubic-bezier(0.4, 0, 0.6, 1)
ease - bounce; // cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Example Combinations

```tsx
{
  /* Custom button animation */
}
<button className="transition-all duration-button ease-modern hover:scale-105">Custom</button>;

{
  /* Custom entrance */
}
<div className="transition-all duration-entrance ease-elegant">Content</div>;
```

---

## Accessibility

### Reduced Motion Support

All animations automatically respect `prefers-reduced-motion` settings:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are reduced to near-instant (0.01ms) */
  /* will-change optimizations are disabled */
}
```

This ensures users who prefer reduced motion have a comfortable experience.

---

## Performance Best Practices

### Hardware-Accelerated Properties

All animations use GPU-accelerated properties:

- `transform` (scale, translate, rotate)
- `opacity`

Avoid animating:

- `width`, `height`, `margin`, `padding` (causes layout shifts)
- `top`, `left`, `right`, `bottom` (use transform instead)

### Will-Change Optimization

Applied strategically on interactive elements:

```css
.animate-modern-scale {
  will-change: transform;
}
```

Automatically disabled for reduced-motion users.

---

## Common Patterns

### Interactive Button

```tsx
<button className="animate-modern-scale bg-primary text-white px-6 py-3 rounded-lg">
  Primary Action
</button>
```

### Card with Hover Effect

```tsx
<div className="transition-all-smooth hover-lift-sm hover:shadow-lg bg-white p-6 rounded-lg">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

### Staggered List Entrance

```tsx
<ul>
  {items.map((item, index) => (
    <li key={item.id} className={`animate-slide-up-delay-${index * 100}`}>
      {item.name}
    </li>
  ))}
</ul>
```

### Loading Skeleton

```tsx
<div className="space-y-3">
  <div className="animate-pulse-loading h-4 bg-gray-200 rounded w-3/4" />
  <div className="animate-pulse-loading h-4 bg-gray-200 rounded w-1/2" />
  <div className="animate-pulse-loading h-4 bg-gray-200 rounded w-2/3" />
</div>
```

### Success Notification

```tsx
{
  showSuccess && (
    <div className="animate-success-pop bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      <span className="inline-block mr-2">✓</span>
      Success! Your changes have been saved.
    </div>
  );
}
```

### Toggle Switch

```tsx
<button
  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
    enabled ? 'bg-blue-600' : 'bg-gray-200'
  }`}
  onClick={() => setEnabled(!enabled)}
>
  <span
    className={`inline-block h-4 w-4 transform rounded-full bg-white animate-toggle-slide ${
      enabled ? 'active' : ''
    }`}
  />
</button>
```

---

## Implementation Files

### Main Files

- `/src/styles/globals.css` - Keyframes, utility classes, and CSS variables
- `/tailwind.config.ts` - Tailwind animation configuration

### Key Sections in globals.css

1. CSS Variables (`:root`)
2. Keyframe Definitions
3. Animation Utility Classes (@layer utilities)
4. Accessibility (prefers-reduced-motion)

---

## Testing Checklist

- [ ] Animations run at 60fps on target devices
- [ ] Reduced motion preference is respected
- [ ] No layout shifts during animations
- [ ] Animations feel natural and not jarring
- [ ] Loading states are clear and not distracting
- [ ] Hover effects provide clear feedback
- [ ] Entrance animations don't delay critical content
- [ ] Mobile performance is acceptable

---

## Browser Support

All animations use standard CSS properties with excellent browser support:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

---

## Migration Guide

### From Existing Animations

Replace old animation classes:

```tsx
// Before
<div className="transition-all duration-300 hover:scale-105">

// After
<button className="animate-modern-scale">
  or
<div className="transition-transform-smooth hover-scale-md">
```

### Adding to Existing Components

Simply add the appropriate class:

```tsx
// Add hover effect
<button className="existing-classes animate-modern-scale">

// Add entrance animation
<section className="existing-classes animate-slide-up">
```
