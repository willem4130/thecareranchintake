# Animation System - Quick Reference

## Cheat Sheet

### 1. Buttons & Interactive Elements

```tsx
className = 'animate-modern-scale';
```

Modern hover effect with lift and scale. Perfect for primary buttons.

---

### 2. Page/Component Entrance

```tsx
className = 'animate-slide-up';
className = 'animate-slide-up-delay-100'; // Staggered
```

Elegant slide-up with fade for content reveals.

---

### 3. Loading States

```tsx
className = 'animate-pulse-loading';
```

Gentle infinite pulse for skeletons and loading indicators.

---

### 4. Success Feedback

```tsx
className = 'animate-success-pop';
```

Bouncy scale animation for confirmations and success messages.

---

### 5. Page Transitions

```tsx
className = 'animate-fade-in';
className = 'animate-fade-out';
className = 'transition-page';
```

Simple cross-fade for smooth page transitions.

---

### 6. Toggle Switches

```tsx
className="animate-toggle-slide"
className={isActive ? "active" : ""}
```

Smooth slide for toggle switches and interactive controls.

---

## Common Patterns

### Interactive Button

```tsx
<button className="animate-modern-scale bg-primary text-white px-6 py-3 rounded-lg">
  Click Me
</button>
```

### Card with Hover

```tsx
<div className="transition-all-smooth hover-lift-sm hover:shadow-lg">Card Content</div>
```

### Staggered List

```tsx
{
  items.map((item, i) => (
    <div key={i} className={`animate-slide-up-delay-${i * 100}`}>
      {item}
    </div>
  ));
}
```

### Loading Skeleton

```tsx
<div className="animate-pulse-loading bg-gray-200 h-4 w-full rounded" />
```

### Success Message

```tsx
<div className="animate-success-pop bg-green-100 p-4 rounded">✓ Success!</div>
```

---

## Utility Classes

### Hover Effects

```tsx
hover - scale - sm; // scale(1.02)
hover - scale - md; // scale(1.05)
hover - scale - lg; // scale(1.1)
hover - lift - sm; // translateY(-2px)
hover - lift - md; // translateY(-4px)
```

### Transitions

```tsx
transition - transform - smooth; // Smooth transform
transition - opacity - smooth; // Smooth opacity
transition - all - smooth; // Combined
```

---

## Tailwind Custom Values

### Durations

```tsx
duration - button; // 250ms
duration - entrance; // 500ms
duration - loading; // 1500ms
duration - feedback; // 500ms
duration - transition; // 300ms
duration - micro; // 200ms
```

### Easing

```tsx
ease - modern; // cubic-bezier(0.4, 0, 0.2, 1)
ease - elegant; // cubic-bezier(0.16, 1, 0.3, 1)
ease - smooth; // cubic-bezier(0.4, 0, 0.6, 1)
ease - bounce; // cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## Performance Tips

✓ Use transform & opacity (GPU-accelerated)
✗ Avoid animating width, height, margin, padding
✓ All animations respect prefers-reduced-motion
✓ will-change applied strategically

---

## Files Modified

- `/src/styles/globals.css` - Animation system implementation
- `/tailwind.config.ts` - Tailwind animation config
- `/ANIMATION_SYSTEM.md` - Complete documentation
