# GymGuy Tailwind Configuration Usage Guide

## Overview

Your enhanced Tailwind configuration provides a comprehensive design system optimized for gym/fitness applications with energetic colors, mobile-first design patterns, and workout-specific UI components.

## 🎨 Color System

### Core Brand Colors

#### Primary - Energetic Orange-Red (`#FF6B35`)
```html
<!-- Perfect for main CTAs, primary buttons, and key actions -->
<button class="bg-primary text-primary-foreground hover:bg-primary/80">
  Start Workout
</button>

<!-- With glow effects -->
<div class="shadow-primary-glow bg-primary-100 text-primary-900">
  Active workout indicator
</div>
```

#### Secondary - Motivating Teal (`#00C9A7`)
```html
<!-- For secondary actions, progress indicators -->
<div class="bg-secondary-500 text-white rounded-lg">
  Progress: 75%
</div>

<div class="border-l-4 border-secondary-400 bg-secondary-50 p-4">
  Achievement unlocked!
</div>
```

#### Accent - Power Purple (`#7C3AED`)
```html
<!-- For special features, premium content -->
<span class="bg-accent text-accent-foreground px-3 py-1 rounded-pill text-badge">
  PRO
</span>
```

### Fitness-Specific Colors

#### Energy - Electric Yellow (`#FEE75C`)
```html
<!-- For motivational elements, energy boosts -->
<div class="bg-energy-400 text-energy-900 animate-energy-boost">
  🔥 You're on fire! 5 day streak!
</div>
```

#### Strength - Bold Red (`#DC2626`)
```html
<!-- For strength training, heavy lifting -->
<div class="bg-strength-100 border-strength-400 border-l-4">
  💪 Strength Training
</div>
```

#### Cardio - Pink (`#FB7185`)
```html
<!-- For cardio activities, heart rate -->
<div class="bg-cardio-100 text-cardio-900 shadow-cardio-glow">
  ❤️ Target Heart Rate Zone
</div>
```

### Muscle Group Color Coding

```html
<!-- Chest exercises -->
<div class="bg-muscle-chest text-white">Bench Press</div>

<!-- Back exercises -->
<div class="bg-muscle-back text-white">Pull-ups</div>

<!-- Legs exercises -->
<div class="bg-muscle-legs text-white">Squats</div>

<!-- Core exercises -->
<div class="bg-muscle-core text-black">Planks</div>
```

### Progress Level Colors

```html
<!-- User progress indicators -->
<span class="bg-progress-beginner text-white">Beginner</span>
<span class="bg-progress-intermediate text-white">Intermediate</span>
<span class="bg-progress-advanced text-white">Advanced</span>
<span class="bg-progress-elite text-white">Elite</span>
```

## 📱 Mobile-First Design

### Touch Targets

```html
<!-- Minimum 44px touch targets (WCAG compliant) -->
<button class="min-h-touch w-touch flex items-center justify-center">
  ✓
</button>

<!-- Comfortable touch targets -->
<button class="min-h-touch-lg w-touch-lg rounded-xl">
  Add Set
</button>

<!-- Large touch targets for primary actions -->
<button class="min-h-touch-xl w-full rounded-xl bg-primary text-primary-foreground">
  Complete Workout
</button>
```

### Safe Areas (for devices with notches)

```html
<!-- Respect device safe areas -->
<div class="pt-safe pb-safe px-safe">
  <div class="min-h-screen-safe">
    <!-- Content that respects safe areas -->
  </div>
</div>
```

### Enhanced Spacing

```html
<!-- Mobile-optimized spacing -->
<div class="space-y-15 p-17">
  <div class="mb-22">Section title</div>
  <div class="space-y-26">Content blocks</div>
</div>
```

## ⚡ Workout-Specific Animations

### Progress Animations

```html
<!-- Progress bar with fill animation -->
<div class="w-full bg-muted rounded-full h-4">
  <div 
    class="bg-primary h-4 rounded-full animate-progress-fill"
    style="--progress-width: 65%"
  ></div>
</div>

<!-- Pulsing progress indicator -->
<div class="animate-progress-pulse bg-secondary rounded-full w-8 h-8"></div>
```

### Rep Counter Animations

```html
<!-- Animated rep counter -->
<div class="text-metric font-mono animate-rep-count">
  12
</div>

<!-- Weight increase celebration -->
<div class="text-counter animate-weight-increase">
  +5 lbs!
</div>
```

### Achievement Animations

```html
<!-- Set completion -->
<div class="animate-set-complete bg-success text-white p-4 rounded-lg">
  Set 3/3 Complete! ✓
</div>

<!-- Workout completion -->
<div class="animate-workout-complete text-center">
  <h2 class="text-metric">Workout Complete!</h2>
  <div class="text-lg">🎉 Great job!</div>
</div>

<!-- Achievement unlock -->
<div class="animate-achievement-unlock bg-energy shadow-energy-glow p-6 rounded-2xl">
  <h3>New Achievement!</h3>
  <p>First 10K steps! 👟</p>
</div>

<!-- Streak fire animation -->
<div class="animate-streak-fire text-2xl">
  🔥 7 Day Streak!
</div>
```

### Interactive Feedback

```html
<!-- Button press feedback -->
<button class="active:animate-button-press bg-primary text-white">
  Log Exercise
</button>

<!-- Card lift on hover -->
<div class="hover:animate-card-lift cursor-pointer bg-white rounded-xl p-4 shadow-soft">
  Exercise card
</div>

<!-- Muscle group highlight -->
<div class="animate-muscle-highlight bg-muscle-chest rounded-lg p-2">
  Chest muscles activated
</div>
```

### Motivational Animations

```html
<!-- Motivational pulse -->
<button class="animate-motivate-pulse bg-primary text-white">
  Push Yourself!
</button>

<!-- Celebration animation -->
<div class="animate-celebrate text-4xl">🎉</div>

<!-- Victory dance -->
<div class="animate-victory-dance text-6xl">💪</div>

<!-- Level up animation -->
<div class="animate-level-up bg-accent text-white p-8 rounded-2xl">
  Level Up! You're now Intermediate!
</div>
```

## 📊 Typography for Fitness Data

### Specialized Font Sizes

```html
<!-- Large metrics (weight, reps, time) -->
<div class="text-metric font-mono text-primary">
  225 lbs
</div>

<!-- Counters (sets, reps) -->
<div class="text-counter font-semibold">
  3 / 4 sets
</div>

<!-- Badges and labels -->
<span class="text-badge uppercase tracking-wider bg-secondary text-white px-2 py-1 rounded-badge">
  COMPLETE
</span>

<!-- Button text -->
<button class="text-button bg-primary text-white px-6 py-3 rounded-lg">
  Start Timer
</button>
```

### Data Display Layouts

```html
<!-- Metrics grid -->
<div class="grid grid-cols-2 gap-4">
  <div class="text-center">
    <div class="text-metric text-primary">185</div>
    <div class="text-sm text-muted-foreground">lbs</div>
  </div>
  <div class="text-center">
    <div class="text-metric text-secondary">12</div>
    <div class="text-sm text-muted-foreground">reps</div>
  </div>
</div>

<!-- Compact data list -->
<div class="space-y-2">
  <div class="flex justify-between leading-compact">
    <span>Bench Press</span>
    <span class="text-counter">3×12 @ 185 lbs</span>
  </div>
  <div class="flex justify-between leading-compact">
    <span>Squats</span>
    <span class="text-counter">3×10 @ 205 lbs</span>
  </div>
</div>
```

## 🎯 Enhanced Shadows & Effects

### Fitness-Themed Glows

```html
<!-- Primary action with glow -->
<button class="bg-primary text-white shadow-primary-glow hover:shadow-glow-lg">
  Begin Workout
</button>

<!-- Energy boost effect -->
<div class="bg-energy shadow-energy-glow animate-energy-boost">
  Power Up!
</div>

<!-- Strength indicator -->
<div class="bg-strength shadow-strength-glow">
  💪 Heavy Set
</div>

<!-- Cardio zone -->
<div class="bg-cardio shadow-cardio-glow">
  ❤️ Cardio Zone
</div>
```

### Interactive Shadows

```html
<!-- Button hover effects -->
<button class="shadow-medium hover:shadow-button-hover transition-shadow">
  Log Exercise
</button>

<!-- Card interactions -->
<div class="shadow-soft hover:shadow-card-hover transition-shadow duration-300">
  Workout card
</div>

<!-- Inner shadows for inputs -->
<input class="shadow-inner-sm focus:shadow-inner-md" />
```

## 🏗️ Layout Utilities

### Content Width Constraints

```html
<!-- Touch-optimized forms -->
<form class="max-w-form mx-auto space-y-4">
  <input class="w-full min-h-button" />
  <button class="w-full min-h-button">Submit</button>
</form>

<!-- Card layouts -->
<div class="max-w-card min-h-card bg-white rounded-xl p-4">
  Exercise card content
</div>

<!-- Modal dialogs -->
<div class="max-w-modal bg-white rounded-2xl p-6">
  Modal content
</div>
```

### Z-Index Management

```html
<!-- Layered UI components -->
<div class="z-dropdown">Dropdown menu</div>
<div class="z-modal">Modal overlay</div>
<div class="z-toast">Toast notification</div>
<div class="z-loading">Loading spinner</div>
```

### Aspect Ratios

```html
<!-- Exercise cards -->
<div class="aspect-card bg-white rounded-lg overflow-hidden">
  <img src="exercise.jpg" class="w-full h-full object-cover" />
</div>

<!-- Progress charts -->
<div class="aspect-progress bg-muted rounded-lg">
  <canvas>Progress chart</canvas>
</div>

<!-- Video content -->
<div class="aspect-video bg-black rounded-lg overflow-hidden">
  <video controls class="w-full h-full">Exercise demo</video>
</div>

<!-- Profile avatars -->
<div class="aspect-avatar w-16 bg-primary rounded-full overflow-hidden">
  <img src="avatar.jpg" class="w-full h-full object-cover" />
</div>
```

## 🏃‍♂️ Complete Component Examples

### Workout Card

```html
<div class="max-w-card bg-white rounded-xl shadow-soft hover:shadow-card-hover transition-all duration-300 overflow-hidden">
  <div class="aspect-card bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
    <h3 class="text-xl font-semibold mb-2">Push Day</h3>
    <p class="text-primary-100">Chest, Shoulders, Triceps</p>
  </div>
  <div class="p-4 space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-sm text-muted-foreground">Duration</span>
      <span class="text-counter">45 min</span>
    </div>
    <div class="flex items-center justify-between">
      <span class="text-sm text-muted-foreground">Exercises</span>
      <span class="text-counter">8</span>
    </div>
    <button class="w-full min-h-button bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/80 transition-colors">
      Start Workout
    </button>
  </div>
</div>
```

### Progress Ring

```html
<div class="relative w-32 h-32">
  <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="8" class="text-muted-200" />
    <circle 
      cx="50" cy="50" r="40" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="8" 
      stroke-linecap="round"
      class="text-primary animate-progress-fill"
      style="stroke-dasharray: 251.2; stroke-dashoffset: 75.36; --progress-width: 70%"
    />
  </svg>
  <div class="absolute inset-0 flex items-center justify-center">
    <span class="text-metric text-primary">70%</span>
  </div>
</div>
```

### Exercise Set Tracker

```html
<div class="bg-white rounded-xl shadow-soft p-6 space-y-4">
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-semibold">Bench Press</h3>
    <span class="text-badge bg-muscle-chest text-white px-2 py-1 rounded-badge">
      CHEST
    </span>
  </div>
  
  <div class="space-y-3">
    <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
      <span class="text-sm">Set 1</span>
      <div class="flex items-center space-x-4">
        <span class="text-counter">185 lbs × 12</span>
        <div class="w-6 h-6 bg-success rounded-full flex items-center justify-center animate-set-complete">
          <span class="text-xs text-white">✓</span>
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
      <span class="text-sm">Set 2</span>
      <div class="flex items-center space-x-4">
        <span class="text-counter">185 lbs × 10</span>
        <div class="w-6 h-6 bg-success rounded-full flex items-center justify-center animate-set-complete">
          <span class="text-xs text-white">✓</span>
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-between p-3 bg-primary-50 border-2 border-primary rounded-lg animate-progress-pulse">
      <span class="text-sm font-medium">Set 3</span>
      <div class="flex items-center space-x-4">
        <span class="text-counter">? lbs × ?</span>
        <button class="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs">
          +
        </button>
      </div>
    </div>
  </div>
</div>
```

### Achievement Toast

```html
<div class="fixed top-4 right-4 z-toast max-w-sm animate-achievement-unlock">
  <div class="bg-energy shadow-energy-glow rounded-xl p-4 text-energy-900">
    <div class="flex items-start space-x-3">
      <div class="text-2xl animate-celebrate">🏆</div>
      <div>
        <h4 class="font-semibold">Achievement Unlocked!</h4>
        <p class="text-sm mt-1">Completed 50 workouts</p>
      </div>
    </div>
  </div>
</div>
```

## 🚀 Performance Tips

1. **Use CSS Custom Properties**: The progress animations support CSS custom properties for dynamic values
2. **Combine Animations**: Layer multiple animations for rich interactions
3. **Respect Reduced Motion**: Always test with `prefers-reduced-motion`
4. **Mobile Performance**: The touch targets are optimized for mobile performance
5. **Color Contrast**: All color combinations meet WCAG AA contrast requirements

## 🔧 Customization

To customize further, edit the `tailwind.config.js` file:
- Add more muscle group colors to the `muscle` object
- Create new progress levels in the `progress` object  
- Add custom animations in the `keyframes` section
- Extend spacing for specific touch target needs

This design system provides everything you need for a modern, accessible, and motivating fitness application!