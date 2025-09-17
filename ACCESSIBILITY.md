# GymGuy Accessibility Guide

## Overview
GymGuy is committed to making fitness accessible to everyone. Our application follows WCAG 2.1 Level AA standards to ensure all users, including those using assistive technologies, can fully utilize our platform.

## Implemented Accessibility Features

### 1. Color Contrast
- ✅ Enhanced primary color from `#DC2626` to `#EF4444` for WCAG AA compliance
- ✅ Improved text contrast on dark backgrounds
- ✅ Better visibility for form inputs and error states
- ✅ High contrast focus indicators using blue (`#3B82F6`)

### 2. Keyboard Navigation
- ✅ Skip to main content link for screen reader users
- ✅ Proper focus management with visible focus indicators
- ✅ Keyboard shortcuts (Alt+S to skip to main content)
- ✅ Tab order follows logical reading order
- ✅ Focus trapping in modals and dialogs

### 3. Screen Reader Support
- ✅ Semantic HTML with proper heading hierarchy
- ✅ ARIA labels for interactive elements
- ✅ Form field descriptions and error announcements
- ✅ Live regions for dynamic content updates
- ✅ Proper landmark roles (navigation, main, footer)

### 4. Touch Targets
- ✅ Minimum 44px touch targets for all interactive elements
- ✅ Adequate spacing between clickable items
- ✅ Touch-optimized button sizes

### 5. Forms
- ✅ Associated labels with form controls
- ✅ Autocomplete attributes for better user experience
- ✅ Clear error messages with proper announcement
- ✅ Required field indicators with ARIA attributes
- ✅ Field validation feedback for screen readers

### 6. Responsive Design
- ✅ Mobile-first approach
- ✅ Text remains readable when zoomed to 200%
- ✅ No horizontal scrolling at standard zoom levels
- ✅ Flexible layouts that adapt to different screen sizes

## Testing Tools

### Development Testing
The project includes automated accessibility testing tools:

```bash
# Run ESLint with accessibility rules
npm run lint

# Manual testing in browser console
window.testAccessibility() # Test entire page
window.testAccessibility('.specific-selector') # Test specific component
```

### Installed Tools
- **@axe-core/react**: Runtime accessibility testing in development
- **eslint-plugin-jsx-a11y**: Static analysis of JSX for accessibility issues

### Using the Accessibility Testing Component
```tsx
import { AccessibilityTesting, useAccessibilityAudit } from '@/lib/accessibility-testing'

// Add to your app layout for automatic testing in development
<AccessibilityTesting />

// Manual audit hook
const { runAudit } = useAccessibilityAudit()
const results = await runAudit()
```

## Accessibility Utilities

The `src/lib/a11y.ts` file provides helpful utilities:

- `focusElement()`: Programmatically focus an element
- `trapFocus()`: Trap focus within a container
- `useSkipNavigation()`: Enable skip navigation shortcuts
- `announce()`: Announce messages to screen readers
- `useKeyboardNavigation()`: Handle arrow key navigation
- `useLiveRegion()`: Announce dynamic content changes
- `useEscapeKey()`: Handle escape key interactions
- `prefersReducedMotion()`: Check user's motion preferences
- `getContrastRatio()`: Calculate WCAG contrast ratios

## Best Practices for Developers

### 1. Images
Always include descriptive alt text:
```tsx
<img src="workout.jpg" alt="Person performing a bench press exercise" />
```

### 2. Buttons
Use semantic button elements with clear labels:
```tsx
<Button aria-label="Save workout">
  <SaveIcon aria-hidden="true" />
  Save
</Button>
```

### 3. Forms
Provide clear labels and error messages:
```tsx
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby="email-error"
/>
{hasError && (
  <div id="email-error" role="alert">
    Please enter a valid email address
  </div>
)}
```

### 4. Dynamic Content
Use live regions for updates:
```tsx
<div role="status" aria-live="polite">
  {loading ? 'Loading workouts...' : `${count} workouts found`}
</div>
```

### 5. Color Usage
Never rely solely on color to convey information. Always provide text labels or icons.

## Testing Checklist

Before deploying changes, ensure:

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Form errors are announced to screen readers
- [ ] Images have appropriate alt text
- [ ] Color contrast meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- [ ] Touch targets are at least 44x44 pixels
- [ ] Page is usable when zoomed to 200%
- [ ] No ESLint accessibility warnings
- [ ] Tested with keyboard navigation only
- [ ] Tested with screen reader (NVDA, JAWS, or VoiceOver)

## Continuous Improvement

We continuously work to improve accessibility. If you find any accessibility issues:

1. Check existing GitHub issues
2. Create a new issue with the label `accessibility`
3. Include steps to reproduce and assistive technology used
4. Suggest improvements if possible

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Accessibility Statement

GymGuy is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

### Conformance Status
We aim to conform to WCAG 2.1 Level AA standards. This means our content is:
- **Perceivable**: Information and UI components are presentable in ways users can perceive
- **Operable**: UI components and navigation are operable via keyboard
- **Understandable**: Information and UI operation are understandable
- **Robust**: Content is robust enough for interpretation by assistive technologies

For questions or feedback about accessibility, please contact us through GitHub issues.