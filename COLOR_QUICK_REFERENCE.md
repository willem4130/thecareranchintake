# Pure Monochrome Color System - Quick Reference

## 🎨 Color Palette At A Glance

### Brand Colors

```
Primary:   #000000 (Black)
Secondary: #404040 (Dark Gray)
Accent:    #666666 (Medium Gray)
```

### Surface Colors

```
Background: #FFFFFF (White)
Surface:    #F5F5F5 (Light Gray)
Card:       #FFFFFF (White)
```

---

## 🚀 Quick Start Examples

### Buttons

```jsx
// Primary button (black background, white text)
<button className="bg-primary text-primary-foreground hover:bg-primary-hover">
  Primary Action
</button>

// Secondary button (dark gray background, white text)
<button className="bg-secondary text-secondary-foreground hover:bg-secondary-hover">
  Secondary Action
</button>

// Outline button (transparent background, black border)
<button className="border border-primary text-primary hover:bg-surface">
  Outline Button
</button>

// Pre-built classes (even easier!)
<button className="btn-primary">Submit</button>
<button className="btn-secondary">Cancel</button>
<button className="btn-outline">Learn More</button>
```

### Inputs

```jsx
// Standard input
<input className="input-base" />

// Error state
<input className="input-base input-error" />

// Success state
<input className="input-base input-success" />
```

### Cards

```jsx
// Standard card
<div className="card-base">
  Card content
</div>

// Elevated card with more shadow
<div className="card-elevated">
  Important content
</div>

// Surface-colored card
<div className="card-surface">
  Subtle background
</div>
```

### Text Hierarchy

```jsx
<h1 className="text-text-primary">Main Heading</h1>
<h2 className="text-text-secondary">Subheading</h2>
<p className="text-text-tertiary">Supporting text</p>
<small className="text-text-disabled">Disabled text</small>
```

### Alerts & Feedback

```jsx
// Success
<div className="alert-success">
  Operation completed successfully!
</div>

// Error
<div className="alert-error">
  An error occurred. Please try again.
</div>

// Warning
<div className="alert-warning">
  Please review before proceeding.
</div>

// Info
<div className="alert-info">
  Here's some helpful information.
</div>
```

### Badges

```jsx
<span className="badge-default">Default</span>
<span className="badge-success">Completed</span>
<span className="badge-error">Failed</span>
<span className="badge-warning">Pending</span>
```

---

## 🎯 Monochrome Scale Usage

Use the mono scale for custom gray shades:

```jsx
// Very dark
<div className="bg-mono-100 text-mono-1000">Dark section</div>

// Medium
<div className="bg-mono-500 text-mono-1000">Medium section</div>

// Light
<div className="bg-mono-950 text-mono-100">Light section</div>

// Borders
<div className="border border-mono-800">Subtle border</div>
<div className="border border-mono-600">Medium border</div>
<div className="border border-mono-400">Strong border</div>
```

**Monochrome Scale:**

- mono-0: Pure black
- mono-100 to mono-900: Grays (10% increments)
- mono-950: Very light gray
- mono-1000: Pure white

---

## 🔄 State Variants

### Interactive States

```jsx
// Hover states
hover: bg - primary - hover;
hover: bg - secondary - hover;
hover: bg - accent - hover;
hover: bg - surface - hover;

// Active states
active: bg - primary - active;
active: bg - secondary - active;
active: bg - accent - active;

// Disabled states
disabled: bg - primary - disabled;
disabled: bg - secondary - disabled;
disabled: cursor - not - allowed;

// Focus states
focus: border - input - focus;
focus: ring - ring;
```

---

## 📦 Pre-built Component Classes

### All Available Classes

**Buttons:**

- `btn-primary` - Black button with white text
- `btn-secondary` - Dark gray button with white text
- `btn-outline` - Transparent with black border

**Inputs:**

- `input-base` - Standard input styling
- `input-error` - Error state (red border)
- `input-success` - Success state (green border)

**Cards:**

- `card-base` - White card with soft shadow
- `card-elevated` - White card with medium shadow
- `card-surface` - Light gray card

**Typography:**

- `text-heading` - Bold serif heading
- `text-body` - Regular body text
- `text-caption` - Small caption text

**Links:**

- `link-base` - Standard underlined link
- `link-nav` - Navigation link with underline on hover

**Badges:**

- `badge-default` - Gray badge
- `badge-success` - Success badge
- `badge-error` - Error badge
- `badge-warning` - Warning badge

**Alerts:**

- `alert-info` - Info alert
- `alert-success` - Success alert
- `alert-warning` - Warning alert
- `alert-error` - Error alert

**Containers:**

- `container-base` - Max-width container with padding

**States:**

- `state-disabled` - Disabled appearance
- `state-loading` - Loading animation

**Auto-save:**

- `autosave-saving` - Saving indicator
- `autosave-saved` - Saved indicator
- `autosave-error` - Error indicator

---

## 🌙 Dark Mode

Add the `dark` class to enable dark mode:

```jsx
<div className="dark">
  {/* All colors automatically invert */}
  <div className="bg-background text-foreground">Content in dark mode</div>
</div>
```

Colors automatically invert:

- Background becomes near-black
- Text becomes off-white
- Primary becomes white
- All other colors adjust accordingly

---

## ✅ Accessibility Quick Check

All color combinations meet WCAG AA standards:

- ✅ Black on white: 21:1 (AAA)
- ✅ Dark gray on white: 10.7:1 (AAA)
- ✅ Medium gray on white: 5.74:1 (AA+)
- ✅ All combinations: >4.5:1 (AA minimum)

---

## 🔧 Custom Styling with CSS Variables

If you need to use CSS variables directly:

```css
/* Brand colors */
background: hsl(var(--primary));
color: hsl(var(--primary-foreground));

/* Surface colors */
background: hsl(var(--surface));

/* Text colors */
color: hsl(var(--text-primary));
color: hsl(var(--text-secondary));

/* Borders */
border-color: hsl(var(--border));

/* Shadows */
box-shadow: var(--shadow-soft);
box-shadow: var(--shadow-medium);
```

---

## 📚 More Information

- **Complete Documentation**: See `COLOR_SYSTEM.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **CSS Variables**: Check `src/styles/globals.css`
- **Tailwind Config**: Check `tailwind.config.ts`

---

## 💡 Tips

1. **Use semantic names** over specific colors (e.g., `bg-primary` not `bg-black`)
2. **Leverage pre-built classes** for consistency
3. **Use the monochrome scale** for custom gray shades
4. **Always include hover states** for interactive elements
5. **Test in dark mode** to ensure proper appearance
6. **Check contrast** when creating custom combinations

---

**Quick Command:**

```bash
# View all color variables
grep "^    --" src/styles/globals.css

# Search for component classes
grep "^\s\s\." src/styles/globals.css
```
