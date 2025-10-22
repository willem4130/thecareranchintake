# Animation System - Visual Guide

Quick visual reference for understanding when and how to use each animation.

---

## 1. Button & Hover Animations

### Modern Scale

```
BEFORE HOVER:          ON HOVER:              ON CLICK:
┌──────────┐          ┌──────────┐          ┌──────────┐
│  Button  │    →     │  Button  │    →     │  Button  │
└──────────┘          └──────────┘          └──────────┘
                      ↑ Lifts 2px            ↓ Pushes down
                      🔍 Scales 1.02         🔍 Scales 0.98
                      🌑 Shadow grows         🌑 Shadow shrinks
```

**Use for:** Primary buttons, call-to-action buttons, important interactive elements

**Class:** `animate-modern-scale`

**Timing:** 250ms | Modern easing

---

## 2. Entrance Animations

### Slide Up

```
INITIAL STATE:         ANIMATING:            FINAL STATE:
                      ┌──────────┐          ┌──────────┐
                      │ Content  │          │ Content  │
                      └──────────┘          └──────────┘
                           ↑
┌──────────┐               ↑
│ Content  │          Slides up
└──────────┘          + Fades in
(20px down,
 opacity 0)
```

**Use for:** Page content, cards, sections, hero elements

**Classes:**

- `animate-slide-up` (standard)
- `animate-slide-up-delay-100` (100ms delay)
- `animate-slide-up-delay-200` (200ms delay)
- `animate-slide-up-delay-300` (300ms delay)

**Timing:** 500ms | Elegant easing

**Staggered Example:**

```
Item 1  ━━━━━━━━━► (0ms delay)
Item 2    ━━━━━━━━━► (100ms delay)
Item 3      ━━━━━━━━━► (200ms delay)
Item 4        ━━━━━━━━━► (300ms delay)
```

---

## 3. Loading Animations

### Pulse

```
FRAME 1:              FRAME 2:              FRAME 3:
┌──────────┐          ┌──────────┐          ┌──────────┐
│          │    →     │          │    →     │          │
│  ████████ │          │  ████████ │          │  ████████ │
│          │          │          │          │          │
└──────────┘          └──────────┘          └──────────┘
Scale: 1.0            Scale: 1.05           Scale: 1.0
Opacity: 1.0          Opacity: 0.5          Opacity: 1.0
                   ← Infinite loop →
```

**Use for:** Skeleton loaders, loading indicators, placeholder content, waiting states

**Class:** `animate-pulse-loading`

**Timing:** 1500ms | Smooth easing | Infinite

---

## 4. Feedback Animations

### Success Pop

```
FRAME 1:              FRAME 2:              FRAME 3:
                      ┌─┐                   ┌────┐
                      │✓│                   │ ✓  │
                      └─┘                   └────┘
(Scale: 0)            (Scale: 0.5)          (Scale: 1.0)
(Opacity: 0)          (Opacity: 0.7)        (Opacity: 1.0)

                      ↗️ Bouncy!
```

**Use for:** Success messages, checkmarks, confirmations, save indicators

**Class:** `animate-success-pop`

**Timing:** 500ms | Bounce easing (overshoots slightly for emphasis)

---

## 5. Page Transitions

### Fade Cross

```
PAGE EXIT:            TRANSITION:           PAGE ENTER:
┌──────────┐          ┌──────────┐          ┌──────────┐
│ Page A   │    →     │          │    →     │ Page B   │
│          │          │   ░░░    │          │          │
└──────────┘          └──────────┘          └──────────┘
Opacity: 1.0          Opacity: 0.5          Opacity: 1.0
                      (Crossfade)
```

**Use for:** Page navigation, content swapping, modal transitions, route changes

**Classes:**

- `animate-fade-in` (fade in)
- `animate-fade-out` (fade out)
- `transition-page` (smooth opacity transition)

**Timing:** 300ms | Ease-in-out

---

## 6. Micro-interactions

### Toggle Slide

```
OFF STATE:            TRANSITION:           ON STATE:
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│ ●           │   →   │   ●         │   →   │           ● │
└─────────────┘       └─────────────┘       └─────────────┘
translateX: 0         translateX: 10px      translateX: 20px
```

**Use for:** Toggle switches, checkboxes, settings, preferences, on/off states

**Class:** `animate-toggle-slide` + `active` class when enabled

**Timing:** 200ms | Modern easing

---

## Utility Animations

### Hover Scale (Simple)

```
hover-scale-sm:  scale(1.02)  - Subtle
hover-scale-md:  scale(1.05)  - Noticeable
hover-scale-lg:  scale(1.10)  - Prominent
```

### Hover Lift (Simple)

```
hover-lift-sm:   translateY(-2px)  - Subtle elevation
hover-lift-md:   translateY(-4px)  - Clear elevation
```

### Combined Utilities

```
transition-transform-smooth    - Smooth transform transitions
transition-opacity-smooth      - Smooth opacity transitions
transition-all-smooth         - Transform + opacity together
```

---

## Animation Timing Chart

```
Micro (200ms)     ━━
Button (250ms)    ━━━
Transition (300ms)━━━━
Feedback (500ms)  ━━━━━━━
Entrance (500ms)  ━━━━━━━
Loading (1500ms)  ━━━━━━━━━━━━━━━━━━
                  |__________________|
                  Fast ← → → → Slow
```

---

## Easing Curves Visual

```
Modern (cubic-bezier(0.4, 0, 0.2, 1)):
    ╱━━━━
   ╱
  ╱
 ╱
Start → End (Smooth acceleration, gentle deceleration)

Elegant (cubic-bezier(0.16, 1, 0.3, 1)):
      ━━━
    ╱╱
  ╱╱
 ╱
Start → End (Slow start, strong acceleration)

Smooth (cubic-bezier(0.4, 0, 0.6, 1)):
   ╱━━━━━
  ╱
 ╱
Start → End (Very smooth, gentle)

Bounce (cubic-bezier(0.34, 1.56, 0.64, 1)):
    ⟋━┓
   ╱  ┃
  ╱   ┃
 ╱    ┗━
Start → End (Overshoots then settles - bouncy!)
```

---

## Common Combinations

### Interactive Card

```
Base:     White background, shadow
Hover:    Lift 2px + grow shadow
Active:   Push down slightly

Classes:  transition-all-smooth hover-lift-sm hover:shadow-lg
```

### Staggered List Entrance

```
Item 1: ━━━━━━━► (Slide up, 0ms)
Item 2:   ━━━━━━━► (Slide up, 100ms delay)
Item 3:     ━━━━━━━► (Slide up, 200ms delay)
Item 4:       ━━━━━━━► (Slide up, 300ms delay)
```

### Button with Feedback

```
1. Idle:     animate-modern-scale (ready for interaction)
2. Click:    Scale down (active state)
3. Loading:  animate-pulse-loading (processing)
4. Success:  animate-success-pop (confirmation)
```

### Modal Appearance

```
1. Backdrop:   animate-fade-in (background darkens)
2. Content:    animate-success-pop (modal pops in)
3. Exit:       animate-fade-out (everything fades away)
```

---

## Decision Tree

```
What are you animating?

├─ Button/Link
│  └─> animate-modern-scale
│
├─ Content appearing on page load
│  └─> animate-slide-up (+ delay variants for lists)
│
├─ Loading/Waiting state
│  └─> animate-pulse-loading
│
├─ Success/Confirmation
│  └─> animate-success-pop
│
├─ Page/Route change
│  └─> animate-fade-in / animate-fade-out
│
├─ Toggle/Switch
│  └─> animate-toggle-slide
│
└─ Custom hover effect
   ├─> transition-transform-smooth + hover-scale-*
   └─> transition-transform-smooth + hover-lift-*
```

---

## Performance Zones

```
🟢 GREEN (60fps guaranteed):
   - transform: translate, scale, rotate
   - opacity
   ✓ All our animations use these!

🟡 YELLOW (May cause jank):
   - box-shadow (use sparingly)
   - filter: blur()

🔴 RED (Avoid animating):
   - width, height
   - margin, padding
   - top, left, right, bottom
   - border-width
```

---

## Accessibility

```
Normal Motion User:
Button ━━━━━━━━━━━━━━━━━> (250ms smooth animation)

Reduced Motion User:
Button ━> (0.01ms, essentially instant)

                        ↓
              (Automatically handled!)
              (No extra code needed!)
```

All animations respect `prefers-reduced-motion` automatically.

---

## Class Name Patterns

```
animate-*              Core animation (auto-plays)
animate-*-delay-*      Staggered delays
transition-*-smooth    Smooth transitions (manual trigger)
hover-*                Hover-only effects
```

---

## When to Use Each

| Animation Type | Use Case         | Don't Use For        |
| -------------- | ---------------- | -------------------- |
| Modern Scale   | Buttons, CTAs    | Large content blocks |
| Slide Up       | Content reveals  | Navigation changes   |
| Pulse          | Loading states   | Success feedback     |
| Success Pop    | Confirmations    | Page entrances       |
| Fade Cross     | Page transitions | Button hovers        |
| Toggle Slide   | Switches         | Complex interactions |

---

## Quick Copy-Paste

```tsx
// Button
<button className="animate-modern-scale">Click</button>

// Entrance
<div className="animate-slide-up">Content</div>

// Loading
<div className="animate-pulse-loading">Loading...</div>

// Success
<div className="animate-success-pop">✓ Saved</div>

// Fade
<div className="animate-fade-in">Page</div>

// Toggle
<span className="animate-toggle-slide active">Switch</span>

// Hover card
<div className="transition-all-smooth hover-lift-sm">Card</div>
```

---

See **ANIMATION_SYSTEM.md** for complete documentation
See **ANIMATION_QUICK_REFERENCE.md** for cheat sheet
See **ANIMATION_EXAMPLES.tsx** for copy-paste components
