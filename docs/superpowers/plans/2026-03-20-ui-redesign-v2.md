# GymGuy V2 UI Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish GymGuy's frontend with a modern dark fitness theme (cyan neon accents) using a design-system-first approach with white-label support.

**Architecture:** CSS custom properties define all design tokens in a single theme file. Tailwind config reads from these vars. 8 new UI components replace inline patterns across 13 pages. NavBar moves to layout.tsx as shared shell.

**Tech Stack:** Next.js 14, Tailwind CSS 3, Inter + JetBrains Mono (next/font), class-variance-authority, Lucide React

**Spec:** `docs/superpowers/specs/2026-03-20-ui-redesign-v2-design.md`

> **Warning:** The app will be visually broken between Task 1 and Task 9. Do NOT attempt visual testing until all migration tasks are complete. Build checks in intermediate tasks only verify compilation, not visual correctness.

---

## Task 1: Theme Foundation — CSS Tokens + Tailwind Config

**Files:**
- Create: `src/themes/default.css`
- Modify: `tailwind.config.js`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create theme file**

Create `src/themes/default.css`:

```css
:root {
  --bg-primary: #0A0A0F;
  --bg-secondary: #12121A;
  --bg-tertiary: #1A1A25;
  --border: #2A2A3A;
  --text-primary: #F0F0F5;
  --text-secondary: #8888A0;
  --accent: #00D4FF;
  --accent-glow: rgba(0, 212, 255, 0.2);
  --accent-surface: rgba(0, 212, 255, 0.06);
  --success: #00E676;
  --warning: #FFB300;
  --danger: #FF3D57;
}
```

- [ ] **Step 2: Rewrite tailwind.config.js**

Replace the entire `theme.extend` section. Keep `content` paths. New config:

- `colors`: map to CSS vars (bg.primary, bg.secondary, bg.tertiary, border, text.primary, text.secondary, accent with DEFAULT/glow/surface, success, warning, danger)
- `fontFamily`: sans → Inter, mono → JetBrains Mono. Remove `display` and `teko` entries.
- `borderRadius`: keep existing values
- `screens`: keep existing values
- Keep `spacing`, `fontSize`, `zIndex`, `maxWidth`, `minHeight`, `aspectRatio`, `lineHeight`
- Remove ALL: old color palettes (primary, secondary, accent, energy, strength, cardio, muscle, progress), all custom animations/keyframes, all boxShadow entries, gradientColorStops, backdropBlur
- Add one shadow: `'accent-glow': '0 0 20px var(--accent-glow)'`
- Add one animation: `'fade-in': 'fadeIn 0.3s ease-out'` with keyframe

- [ ] **Step 3: Rewrite globals.css**

- Remove Teko Google Fonts import (line 1)
- Import theme: `@import '../themes/default.css';`
- Update `body`: `bg-[var(--bg-primary)] text-[var(--text-primary)]`
- Update scrollbar: track `bg-[var(--bg-secondary)]`, thumb `bg-[var(--accent)]`
- Update focus-visible: ring color `ring-[var(--accent)]`, offset `ring-offset-[var(--bg-primary)]`
- Update skip-to-content: `bg-[var(--accent)]`
- Update inputs: `text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]`
- Remove ALL: `.font-teko*`, `.brand-text`, `.brand-slogan`, `.shadow-*-glow`, `.bg-gradient-*`, `.animate-in*`, `.animate-card-lift`, `.animate-muscle-highlight`, `.animate-motivate-pulse`, `.animate-energy-boost`, `.animate-set-complete`, `.animate-float`, `.animate-glow`
- Remove ALL old keyframes (fadeInUp, fadeIn, slideIn*, scaleIn, bounce, float, glow, animate-in*, animate-card-lift, animate-muscle-highlight, animate-motivate-pulse, animate-energy-boost, animate-set-complete, animate-float)
- Keep: `.sr-only`, `.skip-to-content`, `.line-clamp-3`, `.animate-spin`, reduced-motion media query, high-contrast media query, print styles

- [ ] **Step 4: Update layout.tsx fonts**

- Keep `Inter` import from `next/font/google`
- Add `JetBrains_Mono` import from `next/font/google` with `subsets: ['latin'], variable: '--font-mono'`
- Apply both font variables to `<html>` className: `${inter.className} ${jetbrainsMono.variable}`

- [ ] **Step 5: Verify build**

Run: `cd ~/Dev/GymGuy && npx next build 2>&1 | tail -5`
Expected: Build will have lint/type warnings from pages still using old classes — that's fine at this stage. The CSS/config foundation must compile without errors.

- [ ] **Step 6: Commit**

```bash
git add src/themes/default.css tailwind.config.js src/app/globals.css src/app/layout.tsx
git commit -m "feat(v2): theme foundation — CSS tokens, tailwind config, fonts"
```

---

## Task 2: Core Components — Badge, Card, StatCard, SectionHeader

**Files:**
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/stat-card.tsx`
- Create: `src/components/ui/section-header.tsx`

- [ ] **Step 1: Create Badge component**

`src/components/ui/badge.tsx` — uses cva with variants: default (accent surface/text), success, warning, premium. Renders as `<span>` with rounded-full pill styling, `px-3 py-1 text-xs font-medium`.

- [ ] **Step 2: Create Card component**

`src/components/ui/card.tsx` — uses cva with variants: default (`bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6`), interactive (adds `cursor-pointer hover:border-[var(--accent)]/30 hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-200`), stat (adds `text-center`). Renders as `<div>`. Accepts `className` for overrides.

- [ ] **Step 3: Create StatCard component**

`src/components/ui/stat-card.tsx` — props: `value`, `label`, `unit?`. Wraps in Card. Value in `font-mono text-3xl font-bold text-[var(--accent)]`. Label in `text-sm text-[var(--text-secondary)]`. Unit inline with value.

- [ ] **Step 4: Create SectionHeader component**

`src/components/ui/section-header.tsx` — props: `badge?`, `title`, `subtitle?`, `align?`. Renders optional Badge pill, h2, optional p. Text alignment from `align` prop (default center).

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/badge.tsx src/components/ui/card.tsx src/components/ui/stat-card.tsx src/components/ui/section-header.tsx
git commit -m "feat(v2): core components — Badge, Card, StatCard, SectionHeader"
```

---

## Task 3: Form Components — FormField, PageHero, CTASection

**Files:**
- Create: `src/components/ui/form-field.tsx`
- Create: `src/components/ui/page-hero.tsx`
- Create: `src/components/ui/cta-section.tsx`

- [ ] **Step 1: Create FormField component**

`src/components/ui/form-field.tsx` — props: `label`, `id`, `error?`, `as?: 'select'`, plus input/select HTML attributes spread. Renders `<label htmlFor={id}>` + `<input>` or `<select>` based on `as` prop. Input styling: `w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200`. Error shown below in `text-[var(--danger)] text-sm mt-1`.

- [ ] **Step 2: Create PageHero component**

`src/components/ui/page-hero.tsx` — props: `badge?`, `title`, `subtitle?`, `children?`. Section with `bg-[var(--bg-primary)]` + subtle gradient overlay. Badge as `<Badge>` component. H1 in `text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)]`. Subtitle in `text-xl text-[var(--text-secondary)]`. Padding `pt-32 pb-16 lg:pt-40 lg:pb-20`. Children slot for CTA buttons.

- [ ] **Step 3: Create CTASection component**

`src/components/ui/cta-section.tsx` — props: `title`, `subtitle?`, `children`. Section with gradient background from `accent/10%` to transparent. Centered text. Children slot for buttons. Rounded container with generous padding `py-16 lg:py-24`.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/form-field.tsx src/components/ui/page-hero.tsx src/components/ui/cta-section.tsx
git commit -m "feat(v2): form components — FormField, PageHero, CTASection"
```

---

## Task 4: NavBar + Button Migration + Layout Update

**Files:**
- Create: `src/components/ui/nav-bar.tsx`
- Modify: `src/components/ui/button.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx` (strip SimpleNav import only — full rewrite in Task 5)
- Modify: `src/app/tools/page.tsx` (strip SimpleNav import only)
- Modify: `src/app/programs/page.tsx` (strip SimpleNav import only)
- Modify: `src/app/programs/[id]/program-detail-client.tsx` (strip SimpleNav import only)
- Modify: `src/app/statistics/page.tsx` (strip SimpleNav import only)
- Delete: `src/components/layout/simple-nav.tsx`

- [ ] **Step 1: Create NavBar component**

`src/components/ui/nav-bar.tsx` — `'use client'`. Props: `logo`, `brandName`. Fixed floating pill with backdrop-blur. Desktop: logo+name left, nav links center (Workouts, Programs, Tools, Leaderboard), auth right (Login button or profile icon using `useAuth()`). Mobile: logo left, hamburger right → slide drawer with all links. Styling: `bg-[var(--bg-secondary)]/80 backdrop-blur-md border border-[var(--border)] rounded-xl`. Links: `text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors`. Active detection via `usePathname()`.

- [ ] **Step 2: Migrate Button component**

Rewrite `src/components/ui/button.tsx`:
- Base classes: keep structure, update `ring-offset-black` → `ring-offset-[var(--bg-primary)]`, `ring-blue-500` → `ring-[var(--accent)]`
- Remove `font-teko-medium`, `font-teko-bold` from all variants
- Keep variants: `default` (`bg-[var(--accent)] text-[var(--bg-primary)] hover:bg-[var(--accent)]/90`), `destructive` (`bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90`), `outline` (`border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]`), `secondary` (`bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]`), `ghost` (`hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]`), `link` (`text-[var(--accent)] underline-offset-4 hover:underline`)
- Remove variants: `gradient`, `glass`, `energy`, `strength`, `cardio`, `trunkforce`
- Keep sizes: `default`, `sm`, `lg`, `xl`, `icon`
- Remove sizes: `touch`, `touch-lg`, `icon-lg`
- Remove all shadow references

- [ ] **Step 3: Update layout.tsx**

- Remove `SimpleNav` import
- Add `NavBar` import, place inside body before `<main>`: `<NavBar logo="/images/ponteroca-logo.jpg" brandName="GymGuy" />`
- Update footer: replace all `bg-gray-900` → `bg-[var(--bg-secondary)]`, `border-gray-800` → `border-[var(--border)]`, `text-gray-400` → `text-[var(--text-secondary)]`, `text-primary` → `text-[var(--accent)]`. Remove all `font-teko-bold`, `brand-text`, `brand-slogan`, `animate-motivate-pulse`, `shadow-primary-glow` classes. Update copyright brand styling to use `font-extrabold text-[var(--accent)]`.
- Remove `Image` import if only used in old nav (check first — it's also used in footer logo)

- [ ] **Step 4: Strip SimpleNav from all pages that import it**

In these 5 files, remove the `import SimpleNav from '@/components/layout/simple-nav'` line AND remove `<SimpleNav />` from the JSX (NavBar is now in layout.tsx, so these pages need nothing):
- `src/app/page.tsx`
- `src/app/tools/page.tsx`
- `src/app/programs/page.tsx`
- `src/app/programs/[id]/program-detail-client.tsx`
- `src/app/statistics/page.tsx`

- [ ] **Step 5: Delete simple-nav.tsx**

```bash
rm src/components/layout/simple-nav.tsx
```

- [ ] **Step 6: Verify build compiles**

Run: `cd ~/Dev/GymGuy && npx next build 2>&1 | grep -E "✓|Failed|Error"`
Expected: Compiles successfully. Pages still have old color classes but Tailwind silently skips unknown utilities — no build error.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/nav-bar.tsx src/components/ui/button.tsx src/app/layout.tsx src/app/page.tsx src/app/tools/page.tsx src/app/programs/page.tsx src/app/programs/\[id\]/program-detail-client.tsx src/app/statistics/page.tsx
git rm src/components/layout/simple-nav.tsx
git commit -m "feat(v2): NavBar + Button migration + layout shell"
```

---

## Task 5: Migrate Homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite homepage**

- Remove `SimpleNav` import and usage
- Replace inline hero section with `<PageHero badge="Open Source • Self-Hostable" title="Build Your Perfect Workout" subtitle="...">`
- Replace feature cards with `<Card variant="interactive">` using Lucide icons
- Replace "Why GymGuy" section with `<SectionHeader>` + `<Card>` grid
- Replace bottom CTA with `<CTASection>`
- Replace all old color classes: `text-primary` → `text-[var(--accent)]`, `bg-gray-900` → `bg-[var(--bg-secondary)]`, `text-gray-400` → `text-[var(--text-secondary)]`, `border-gray-800` → `border-[var(--border)]`
- Remove all old animation classes: `animate-in`, `animate-in-delay-*`, `animate-motivate-pulse`, `animate-energy-boost`, `animate-glow`, `shadow-primary-glow`
- Remove all `font-teko-*` and `brand-text` classes
- Button variants: `variant="trunkforce"` → remove variant (use default), `variant="glass"` → `variant="outline"`

- [ ] **Step 2: Verify page renders**

Run: `cd ~/Dev/GymGuy && npx next build 2>&1 | grep -E "✓|Failed"`

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(v2): migrate homepage to new design system"
```

---

## Task 6: Migrate Tools Pages

**Files:**
- Modify: `src/app/tools/page.tsx`
- Modify: `src/app/tools/calorie/page.tsx`
- Modify: `src/app/tools/bmi/page.tsx`
- Modify: `src/app/tools/macro/page.tsx`
- Modify: `src/app/tools/heart-rate/page.tsx`
- Modify: `src/app/tools/1rm/page.tsx`

- [ ] **Step 1: Migrate tools index page**

- Remove `SimpleNav` import
- Hero → `<PageHero>`
- Tool cards → `<Card variant="interactive">` with uniform `text-[var(--accent)]` icon color (remove per-tool color variants)
- `<SectionHeader>` for section titles
- CTA → `<CTASection>`
- Replace all old color/animation classes

- [ ] **Step 2: Migrate 5 calculator pages**

For each calculator page (calorie, bmi, macro, heart-rate, 1rm):
- Add `<PageHero>` at top
- Replace inline `<label>` + `<input>` patterns with `<FormField>`
- Replace result number displays with `<StatCard>`
- Wrap info/explanation blocks in `<Card>`
- Replace all old color classes with new tokens
- Remove `font-teko-*` classes

- [ ] **Step 3: Verify build**

Run: `cd ~/Dev/GymGuy && npx next build 2>&1 | grep -E "✓|Failed"`

- [ ] **Step 4: Commit**

```bash
git add src/app/tools/
git commit -m "feat(v2): migrate tools pages (index + 5 calculators)"
```

---

## Task 7: Migrate Programs + Statistics

**Files:**
- Modify: `src/app/programs/page.tsx`
- Modify: `src/app/programs/[id]/page.tsx`
- Modify: `src/app/programs/[id]/program-detail-client.tsx`
- Modify: `src/app/statistics/page.tsx`
- Modify: `src/components/programs/SimpleProgramCard.tsx`
- Modify: `src/components/programs/SimpleFilters.tsx`

- [ ] **Step 1: Migrate programs pages**

- SimpleNav imports already removed in Task 4
- Hero → `<PageHero>`
- Update `programs/[id]/page.tsx` "not found" fallback: `bg-black` → `bg-[var(--bg-primary)]`, `text-white` → `text-[var(--text-primary)]`
- Filters → `<FormField as="select">`
- Program cards → `<Card variant="interactive">` + `<Badge variant="premium">`
- Update SimpleProgramCard and SimpleFilters to use new tokens
- Replace all old color/font classes

- [ ] **Step 2: Migrate statistics page**

- Remove `SimpleNav` import
- Hero → `<PageHero>`
- Stats → `<StatCard>` for metrics
- Update Recharts colors to use accent/success vars
- Replace all old color/font classes

- [ ] **Step 3: Verify build**

Run: `cd ~/Dev/GymGuy && npx next build 2>&1 | grep -E "✓|Failed"`

- [ ] **Step 4: Commit**

```bash
git add src/app/programs/ src/app/statistics/ src/components/programs/
git commit -m "feat(v2): migrate programs + statistics pages"
```

---

## Task 8: Migrate Workouts + Leaderboard

**Files:**
- Modify: `src/app/workouts/page.tsx`
- Modify: `src/app/leaderboard/page.tsx`
- Verify: `src/components/ui/youtube-video.tsx` (check for old theme classes, update if needed)

- [ ] **Step 1: Migrate workouts page**

- Hero/header → `<PageHero>`
- Equipment/muscle selection → `<Card variant="interactive">` toggleable cards
- Exercise results → `<Card>` with `<Badge>` for difficulty
- Form inputs → `<FormField>`
- Replace all old color/font classes
- Preserve all workout logic (state, Supabase queries, exercise database)

- [ ] **Step 2: Migrate leaderboard page**

- Hero → `<PageHero>`
- Top 3 display → row of `<StatCard>` with rank numbers
- Table rows → `bg-[var(--bg-secondary)]` with `hover:bg-[var(--bg-tertiary)]`
- Period/scope filters → `<FormField as="select">`
- Replace all old color/font classes

- [ ] **Step 3: Verify build**

Run: `cd ~/Dev/GymGuy && npx next build 2>&1 | grep -E "✓|Failed"`

- [ ] **Step 4: Commit**

```bash
git add src/app/workouts/ src/app/leaderboard/
git commit -m "feat(v2): migrate workouts + leaderboard pages"
```

---

## Task 9: Migrate Remaining Pages

**Files:**
- Modify: `src/app/profile/page.tsx`
- Modify: `src/app/premium/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/donate/page.tsx`
- Modify: `src/app/login/page.tsx`
- Modify: `src/app/signup/page.tsx`
- Modify: `src/components/auth/login-form.tsx`
- Modify: `src/components/auth/signup-form.tsx`

- [ ] **Step 1: Migrate profile page**

- Settings form fields → `<FormField>`
- Wrap in `<Card>`
- Add `<PageHero>`
- Replace old color classes

- [ ] **Step 2: Migrate premium page**

- Plan cards → `<Card>` with `<Badge variant="premium">`
- Feature lists inside cards
- FAQ items in `<Card>`
- Replace old color/font classes

- [ ] **Step 3: Migrate about + donate pages**

- Content sections → `<Card>`
- Hero → `<PageHero>`
- Replace old color/font classes

- [ ] **Step 4: Migrate auth pages + forms**

- Login/signup pages: wrap content in `<Card>`, center on page
- Update login-form.tsx: replace `bg-gray-900` → `bg-[var(--bg-tertiary)]`, `border-gray-600` → `border-[var(--border)]`, `text-white` → `text-[var(--text-primary)]`, `text-blue-400` → `text-[var(--accent)]`, `focus:ring-blue-500` → `focus:ring-[var(--accent)]`
- Same updates for signup-form.tsx

- [ ] **Step 5: Verify build**

Run: `cd ~/Dev/GymGuy && npx next build 2>&1 | grep -E "✓|Failed"`

- [ ] **Step 6: Commit**

```bash
git add src/app/profile/ src/app/premium/ src/app/about/ src/app/donate/ src/app/login/ src/app/signup/ src/components/auth/
git commit -m "feat(v2): migrate profile, premium, about, donate, auth pages"
```

---

## Task 10: Final Verification + Cleanup

**Files:**
- All files in the project

- [ ] **Step 1: Full lint check**

Run: `cd ~/Dev/GymGuy && npx next lint 2>&1`
Expected: Zero errors. Fix any that appear.

- [ ] **Step 2: Full build check**

Run: `cd ~/Dev/GymGuy && npx next build 2>&1`
Expected: `✓ Compiled successfully`, `✓ Generating static pages`, zero errors.

- [ ] **Step 3: Grep for old theme remnants**

```bash
cd ~/Dev/GymGuy
grep -r "font-teko" src/ --include="*.tsx" --include="*.ts" --include="*.css"
grep -r "brand-text\|brand-slogan" src/ --include="*.tsx" --include="*.css"
grep -r "shadow-primary-glow\|shadow-energy-glow\|shadow-cardio-glow" src/ --include="*.tsx" --include="*.css"
grep -r "animate-motivate-pulse\|animate-energy-boost" src/ --include="*.tsx" --include="*.css"
grep -r "bg-primary\b" src/ --include="*.tsx" | grep -v "bg-\[var"
grep -r "text-primary\b" src/ --include="*.tsx" | grep -v "text-\[var"
```

Expected: Zero matches for any of these. If found, fix them.

- [ ] **Step 4: Verify no hardcoded colors in components**

```bash
grep -rn "#[0-9A-Fa-f]\{6\}" src/components/ --include="*.tsx"
```

Expected: Zero matches (all colors should use CSS vars).

- [ ] **Step 5: Verify theme swappability**

Temporarily change `--accent` in `default.css` to `#FF6B35` (orange). Run `npx next dev`, confirm accent color changes everywhere. Revert.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat(v2): final cleanup and verification"
```
