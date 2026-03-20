# GymGuy V2 UI Redesign — Design Spec

## Summary

Professional UI polish of GymGuy with a modern dark fitness theme (cyan neon accents), built on a reusable design system that supports white-label customization. Same page structure, same logic — new visual identity.

**Reference:** MuscleWiki (clean, functional, dark, minimal)
**Animation level:** Subtle — smooth transitions, hover effects, scroll fade-ins
**Strategy:** Design System First (Approach A) — create tokens + components, then apply to all pages
**Branch:** `v2-redesign` (main stays untouched)

---

## 1. Color System

All colors defined as CSS custom properties in `src/themes/default.css`. Tailwind reads from these vars. No hardcoded hex values in components.

| Token | CSS Variable | Default Value | Purpose |
|-------|-------------|---------------|---------|
| Background primary | `--bg-primary` | `#0A0A0F` | Page background (near-black with blue tint) |
| Background secondary | `--bg-secondary` | `#12121A` | Cards, nav, elevated surfaces |
| Background tertiary | `--bg-tertiary` | `#1A1A25` | Inputs, hover states |
| Border | `--border` | `#2A2A3A` | Subtle borders |
| Text primary | `--text-primary` | `#F0F0F5` | Main text |
| Text secondary | `--text-secondary` | `#8888A0` | Secondary/muted text |
| Accent | `--accent` | `#00D4FF` | CTAs, links, highlights (cyan neon) |
| Accent glow | `--accent-glow` | `#00D4FF33` | Hover/focus glow |
| Accent surface | `--accent-surface` | `#00D4FF10` | Badge/tag backgrounds |
| Success | `--success` | `#00E676` | Confirmations |
| Warning | `--warning` | `#FFB300` | Alerts |
| Danger | `--danger` | `#FF3D57` | Errors, destructive actions |

### White-label

To customize for another gym: create a new CSS file (e.g., `src/themes/ironworks.css`) overriding the custom properties. Import that file instead of `default.css` in `globals.css`.

### Tailwind Config Migration

The current `tailwind.config.js` has extensive custom colors (primary=red, secondary=black, accent=white, plus energy/strength/cardio/muscle/progress palettes) and custom animations tied to the old theme.

**New tailwind.config.js colors section:**

```js
colors: {
  bg: {
    primary: 'var(--bg-primary)',
    secondary: 'var(--bg-secondary)',
    tertiary: 'var(--bg-tertiary)',
  },
  border: 'var(--border)',
  text: {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
  },
  accent: {
    DEFAULT: 'var(--accent)',
    glow: 'var(--accent-glow)',
    surface: 'var(--accent-surface)',
  },
  success: 'var(--success)',
  warning: 'var(--warning)',
  danger: 'var(--danger)',
}
```

**Remove entirely:** All old color palettes (primary 50-950, secondary 50-950, accent 50-950, energy, strength, cardio, muscle, progress). Remove all custom animations: `animate-motivate-pulse`, `animate-energy-boost`, `animate-glow`, custom keyframes. Remove custom shadows: `shadow-primary-glow`, `shadow-trunkforce`. Remove custom fontFamily entries for Teko.

**Keep:** `borderRadius`, `spacing`, base `fontFamily` (update to Inter + JetBrains Mono), `content` paths.

---

## 2. Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / Headings | Inter | 700-800 | h1-h3, brand text |
| Body | Inter | 400-500 | General text |
| Data / Numbers | JetBrains Mono | 400 | Calculator results, stats, leaderboard numbers |

### Changes from current

- Remove Teko font entirely (condensed sport font — replaced by Inter bold for cleaner look)
- Remove all `font-teko-*` custom classes from globals.css and all pages
- Remove Teko Google Fonts import from `globals.css`
- Add JetBrains Mono via `next/font/google` in `layout.tsx` alongside existing Inter import
- Apply JetBrains Mono class to `<html>` as a CSS variable (e.g., `--font-mono`) for Tailwind's `font-mono`

---

## 3. Component Library

8 components + 1 migration. All in `src/components/ui/`.

### 3.1 `<NavBar>`

Floating pill navigation with real navigation links.

**Props:**
- `logo: string` — path to logo image
- `brandName: string` — displayed brand name

**Structure:**
- Logo + brand name (left)
- Navigation links center: Workouts, Programs, Tools, Leaderboard
- Auth state right: Login button or profile avatar
- Mobile: hamburger button → slide-out drawer
- Styling: `bg-secondary/80` + backdrop-blur + `border`

**Replaces:** `<SimpleNav>` (which had zero navigation links)

**Placement:** NavBar goes in `layout.tsx` as a shared shell — NOT per-page imports. All per-page `<SimpleNav>` imports are removed. Pages that currently have no nav (calculators, about, donate, etc.) automatically get the NavBar via layout.

### 3.2 `<PageHero>`

Hero section for top of each page.

**Props:**
- `badge?: string` — pill badge text (e.g., "Open Source")
- `title: string` — h1 text
- `subtitle?: string` — paragraph below title
- `children?: ReactNode` — CTA buttons or custom content

**Styling:**
- `bg-primary` with subtle gradient to `accent/5%`
- Padding: `pt-32 pb-16 lg:pt-40 lg:pb-20`
- Text centered, max-width constrained

**Replaces:** Inline hero sections repeated across 8+ pages

### 3.3 `<Card>`

General-purpose elevated surface. Replaces inline `bg-gray-900 border border-gray-800 rounded-xl p-8` patterns across all pages.

**Props:**
- `variant?: 'default' | 'interactive' | 'stat'`
- `children: ReactNode`

**Variants:**
- `default` — `bg-secondary` + `border` + `rounded-xl` + `p-6`
- `interactive` — adds hover: border transitions to `accent/30%`, shadow `accent-glow`, cursor pointer
- `stat` — centered layout with large number slot + label

**Styling:**
- Transition: `transition-all duration-200`
- Hover (interactive): `border-[var(--accent)]/30 shadow-[0_0_20px_var(--accent-glow)]`

### 3.4 `<SectionHeader>`

Section title block.

**Props:**
- `badge?: string` — pill badge
- `title: string` — h2
- `subtitle?: string`
- `align?: 'center' | 'left'` (default: center)

**Replaces:** The repeated pattern of badge + h2 + p in every section

### 3.5 `<FormField>`

Form input with integrated label and error state.

**Props:**
- `label: string`
- `id: string`
- `error?: string`

For input mode (default):
- `type?: 'text' | 'number' | 'email' | 'password'`
- All standard `<input>` props spread via `InputHTMLAttributes`

For select mode:
- `as?: 'select'` — renders a `<select>` instead of `<input>`
- `children: ReactNode` — `<option>` elements
- Standard `<select>` props spread via `SelectHTMLAttributes`

**Styling:**
- Label: `text-sm font-medium text-[var(--text-secondary)]` with `htmlFor` linked to `id`
- Input/Select: `bg-[var(--bg-tertiary)] border-[var(--border)] rounded-lg` + focus ring `accent`
- Error: `text-[var(--danger)] text-sm` below input

### 3.6 `<Badge>`

Small pill label.

**Props:**
- `variant?: 'default' | 'success' | 'warning' | 'premium'`
- `children: ReactNode`

**Styling:**
- `default`: `bg-accent-surface text-accent`
- `success`: green tones
- `warning`: amber tones
- `premium`: gradient accent

### 3.7 `<StatCard>`

Number display for metrics.

**Props:**
- `value: string | number`
- `label: string`
- `unit?: string`

**Styling:**
- Value in `JetBrains Mono` at `text-3xl font-bold text-accent`
- Label in `text-sm text-secondary`
- Unit inline with value in `text-lg`

### 3.8 `<CTASection>`

Call-to-action banner.

**Props:**
- `title: string`
- `subtitle?: string`
- `children: ReactNode` — buttons

**Styling:**
- Background: subtle gradient from `accent/10%` to transparent
- Centered text + button row
- Rounded container with padding

### 3.9 `<Button>` Migration

The existing `<Button>` component (`src/components/ui/button.tsx`) uses `class-variance-authority` with 11 variants and 8 sizes, all referencing the old color system.

**Changes:**
- **Keep variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- **Remove variants:** `gradient`, `glass`, `energy`, `strength`, `cardio`, `trunkforce` (theme-specific, no longer relevant)
- **Keep sizes:** `default`, `sm`, `lg`, `xl` — remove `touch-sm`, `touch-lg`, `touch-xl` (redundant, same as regular sizes with min-height already set globally)
- **Update all color references:** `bg-primary` → `bg-accent`, `text-primary-foreground` → `text-bg-primary`, `shadow-primary-glow` → removed, `font-teko-*` → removed
- **Default variant:** `bg-accent text-bg-primary hover:bg-accent/90`
- **Outline variant:** `border-border text-text-primary hover:bg-bg-tertiary`

---

## 4. Page-by-Page Application

### All pages (via layout.tsx)

- `<NavBar>` in `layout.tsx` replaces all per-page `<SimpleNav>` imports
- Footer in `layout.tsx`: remove `font-teko-bold`, `brand-text`, `brand-slogan`, `animate-motivate-pulse`, `shadow-primary-glow`; replace `bg-gray-900` → `bg-bg-secondary`, `border-gray-800` → `border-border`, `text-gray-400` → `text-text-secondary`, `text-primary` → `text-accent`

### Homepage (`page.tsx`)

- Remove `<SimpleNav>` import (now in layout)
- Hero: clean gradient, no pulse/glow animations → `<PageHero>`
- Features: 3x `<Card variant="interactive">` with Lucide icons
- Why section: `<Card variant="stat">` in grid
- Bottom CTA: `<CTASection>`

### Tools index (`tools/page.tsx`)

- Remove `<SimpleNav>` import
- Hero → `<PageHero>`
- Grid: `<Card variant="interactive">` per tool
- Icon colors: all `accent` (remove per-tool color variants)

### Calculators (5 pages: calorie, bmi, macro, heart-rate, 1rm)

- These pages currently have NO nav — they inherit it from layout now
- Inputs: `<FormField>` replacing inline label+input
- Results: `<StatCard>` for each calculated value
- Info sections: `<Card>` for explanations
- Hero → `<PageHero>`

### Statistics (`statistics/page.tsx`)

- Remove `<SimpleNav>` import
- Hero → `<PageHero>`
- Stats display: `<StatCard>` for metrics
- Charts: keep Recharts, update colors to use accent/success tokens

### Programs (`programs/page.tsx`, `programs/[id]/`)

- Remove `<SimpleNav>` imports from both files
- Filters: `<FormField as="select">` in horizontal row
- Program cards: `<Card variant="interactive">` + `<Badge variant="premium">`

### Workouts (`workouts/page.tsx`)

- Currently has no nav — inherits from layout
- Step wizard: keep structure, swap inline styles for components
- Equipment/muscle selection: `<Card variant="interactive">` toggles
- Exercise results: `<Card>` with `<Badge>` for difficulty

### Leaderboard (`leaderboard/page.tsx`)

- Currently has no nav — inherits from layout
- Top 3: row of `<StatCard>` with rank
- Table rows: `bg-secondary` with `hover:bg-tertiary`
- Filters: `<FormField as="select">`

### Profile (`profile/page.tsx`)

- Currently has no nav — inherits from layout
- Settings form: `<FormField>` for each field
- Wrapped in `<Card>`

### Premium (`premium/page.tsx`)

- Currently has no nav — inherits from layout
- Plan cards: `<Card>` with `<Badge variant="premium">`
- Feature lists inside cards

### Auth pages (login, signup)

- Currently have no nav — inherit from layout
- Already have good form structure
- Swap colors to new palette
- Wrap in `<Card>` centered on page

### About, Donate

- Currently have no nav — inherit from layout
- Content sections: `<Card>` for content blocks
- Keep existing copy
- Hero → `<PageHero>`

---

## 5. Files to Modify

### New files

```
src/themes/default.css              — CSS custom properties (color tokens)
src/components/ui/nav-bar.tsx       — NavBar component
src/components/ui/page-hero.tsx     — PageHero component
src/components/ui/card.tsx          — Card component
src/components/ui/section-header.tsx — SectionHeader component
src/components/ui/form-field.tsx    — FormField component
src/components/ui/badge.tsx         — Badge component
src/components/ui/stat-card.tsx     — StatCard component
src/components/ui/cta-section.tsx   — CTASection component
```

### Modified files

```
tailwind.config.js                  — new color system from CSS vars, remove old palettes/animations
src/app/globals.css                 — import theme, remove old custom classes and Teko import
src/app/layout.tsx                  — NavBar in layout, JetBrains Mono font, update footer
src/app/page.tsx                    — apply components, remove SimpleNav import
src/app/tools/page.tsx              — apply components, remove SimpleNav import
src/app/tools/calorie/page.tsx      — FormField + StatCard
src/app/tools/bmi/page.tsx          — FormField + StatCard
src/app/tools/macro/page.tsx        — FormField + StatCard
src/app/tools/heart-rate/page.tsx   — FormField + StatCard
src/app/tools/1rm/page.tsx          — FormField + StatCard
src/app/programs/page.tsx           — apply components, remove SimpleNav import
src/app/programs/[id]/page.tsx      — apply components
src/app/programs/[id]/program-detail-client.tsx — remove SimpleNav import
src/app/statistics/page.tsx         — apply components, remove SimpleNav import
src/app/workouts/page.tsx           — apply components
src/app/leaderboard/page.tsx        — apply components
src/app/profile/page.tsx            — FormField
src/app/premium/page.tsx            — apply components
src/app/about/page.tsx              — apply components
src/app/donate/page.tsx             — apply components
src/app/login/page.tsx              — apply components
src/app/signup/page.tsx             — apply components
src/components/ui/button.tsx        — migrate variants to new color system
src/components/auth/login-form.tsx  — update colors
src/components/auth/signup-form.tsx — update colors
src/components/programs/SimpleProgramCard.tsx — update to new tokens
src/components/programs/SimpleFilters.tsx     — update to new tokens
```

### Deleted files

```
src/components/layout/simple-nav.tsx  — replaced by NavBar in layout
```

---

## 6. What Does NOT Change

- Routing structure (same URLs)
- Supabase queries and data logic
- Auth flow (auth-provider.tsx)
- Calculator logic (lib/calculators.ts)
- Exercise database (lib/exercise-database.ts)
- i18n system
- IndexedDB / localStorage utilities
- Accessibility (htmlFor, aria attributes, skip-to-content)
- All type definitions

---

## 7. Animations

Subtle only:

- **Transitions:** `transition-all duration-200` on interactive elements
- **Hover:** border color shift + glow shadow on cards
- **Focus:** ring with `accent` color
- **Page load:** simple `opacity 0→1` fade on main content (CSS only)
- **No:** parallax, particles, pulse animations, energy-boost, motivate-pulse

---

## 8. Success Criteria

- Build passes with zero errors (lint + types)
- All 13 pages render correctly with new design
- NavBar has working navigation links + mobile hamburger
- No hardcoded color values in components (all via CSS vars)
- Theme can be swapped by changing one CSS import
- Existing accessibility preserved
- No regressions in functionality
- Button component has clean variants without old theme references
