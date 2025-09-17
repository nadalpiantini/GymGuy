/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors - TrunkForce inspired (Red, Black, White)
        primary: {
          DEFAULT: "#EF4444", // Enhanced red for WCAG AA compliance
          foreground: "#ffffff",
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444", // DEFAULT - WCAG AA compliant
          600: "#DC2626",
          700: "#991B1B",
          800: "#7F1D1D",
          900: "#6B1A1A",
          950: "#450A0A",
        },
        secondary: {
          DEFAULT: "#000000", // TrunkForce Black - Power and Elegance
          foreground: "#ffffff",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#000000", // DEFAULT
        },
        accent: {
          DEFAULT: "#FFFFFF", // TrunkForce White - Pure and Clean
          foreground: "#000000",
          50: "#FFFFFF",
          100: "#F8FAFC",
          200: "#F1F5F9",
          300: "#E2E8F0",
          400: "#CBD5E1",
          500: "#94A3B8",
          600: "#64748B",
          700: "#475569",
          800: "#334155",
          900: "#1E293B",
          950: "#0F172A",
        },
        // Fitness-specific color palette
        energy: {
          DEFAULT: "#FEE75C", // Electric yellow
          50: "#FFFDF4",
          100: "#FFFAE6",
          200: "#FFF3C4",
          300: "#FFEA91",
          400: "#FFDD54",
          500: "#FEE75C", // DEFAULT
          600: "#F3C614",
          700: "#E6A300",
          800: "#CA8B00",
          900: "#A66F00",
          950: "#5C3C00",
        },
        strength: {
          DEFAULT: "#DC2626", // Bold red
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#DC2626", // DEFAULT
          600: "#B91C1C",
          700: "#991B1B",
          800: "#7F1D1D",
          900: "#6B1A1A",
          950: "#450A0A",
        },
        cardio: {
          DEFAULT: "#FB7185", // Cardio pink
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185", // DEFAULT
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
          950: "#4C0519",
        },
        // Muscle group color coding system
        muscle: {
          chest: "#FF6B35", // Orange
          back: "#00C9A7", // Teal
          shoulders: "#7C3AED", // Purple
          arms: "#FB7185", // Pink
          biceps: "#FB7185",
          triceps: "#F472B6",
          legs: "#10B981", // Green
          quads: "#10B981",
          hamstrings: "#059669",
          calves: "#047857",
          glutes: "#06B6D4", // Cyan
          core: "#FEE75C", // Yellow
          abs: "#FEE75C",
          obliques: "#FACC15",
        },
        // Progress and achievement colors
        progress: {
          beginner: "#94A3B8", // Slate
          novice: "#06B6D4", // Cyan
          intermediate: "#10B981", // Green
          advanced: "#F59E0B", // Amber
          expert: "#DC2626", // Red
          elite: "#7C3AED", // Purple
        },
        // Status colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#DC2626",
        info: "#06B6D4",
        // Updated base colors - TrunkForce Dark theme
        muted: {
          DEFAULT: "#334155", // Better contrast for muted elements
          foreground: "#CBD5E1", // WCAG AA compliant on dark backgrounds
        },
        background: "#000000", // TrunkForce Black Background
        foreground: "#FFFFFF", // Better contrast for general text
        card: "#0F172A",
        "card-foreground": "#DC2626",
        border: "#334155", // Improved border visibility
        input: "#1E293B",
        ring: "#3B82F6", // High contrast blue for focus states
      },
      // Enhanced responsive breakpoints for better mobile-first design
      screens: {
        'xs': '475px', // Extra small devices
        'sm': '640px', // Small devices
        'md': '768px', // Medium devices
        'lg': '1024px', // Large devices
        'xl': '1280px', // Extra large devices
        '2xl': '1536px', // 2X large devices
        '3xl': '1920px', // Ultra wide
        // Custom breakpoints for specific use cases
        'mobile': {'max': '639px'}, // Mobile-only
        'tablet': {'min': '640px', 'max': '1023px'}, // Tablet-only
        'desktop': {'min': '1024px'}, // Desktop and up
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "1rem", // For cards and major UI elements
        '2xl': "1.5rem", // For hero sections
        '3xl': "2rem", // For special containers
        pill: "9999px", // For pill buttons
        badge: "0.25rem", // For small badges
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Teko', 'Inter', 'system-ui', 'sans-serif'], // TrunkForce inspired - Teko Bold
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'], // For data display
        teko: ['Teko', 'Inter', 'system-ui', 'sans-serif'], // TrunkForce primary font
      },
      fontSize: {
        // Enhanced typography optimized for fitness data display
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.05em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.05em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        // Fitness-specific font sizes
        'metric': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.05em', fontWeight: '700' }], // For large metrics
        'counter': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '600' }], // For counters
        'badge': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.05em', fontWeight: '600' }], // For badges
        'button': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em', fontWeight: '600' }], // For buttons
      },
      spacing: {
        // Enhanced spacing for mobile-first design and touch targets
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        // Mobile-optimized spacing
        '15': '3.75rem', // Between 14 (3.5rem) and 16 (4rem)
        '17': '4.25rem', // Between 16 and 18
        '22': '5.5rem',  // Between 20 (5rem) and 24 (6rem)
        '26': '6.5rem',  // Between 24 and 28
        '30': '7.5rem',  // Between 28 and 32
        '34': '8.5rem',  // Between 32 and 36
        '38': '9.5rem',  // Between 36 and 40
        '42': '10.5rem', // Between 40 and 44
        '46': '11.5rem', // Between 44 and 48
        '50': '12.5rem', // Between 48 and 52
        // Touch target specific (minimum 44px / 11 * 0.25rem = 2.75rem)
        'touch-sm': '2.75rem', // 44px minimum touch target
        'touch': '3rem',       // 48px comfortable touch target
        'touch-lg': '3.5rem',  // 56px large touch target
        'touch-xl': '4rem',    // 64px extra large touch target
        // Safe area spacing for mobile devices
        'safe-top': 'env(safe-area-inset-top)',
        'safe-right': 'env(safe-area-inset-right)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
      },
      animation: {
        // Enhanced existing animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        
        // Workout tracking specific animations
        'progress-fill': 'progressFill 2s ease-out forwards',
        'progress-pulse': 'progressPulse 1.5s ease-in-out infinite',
        'rep-count': 'repCount 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'weight-increase': 'weightIncrease 1s ease-out',
        'set-complete': 'setComplete 1.2s ease-out',
        'workout-complete': 'workoutComplete 2s ease-out',
        'streak-fire': 'streakFire 1.5s ease-out infinite',
        'achievement-unlock': 'achievementUnlock 2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        
        // Interactive feedback animations
        'button-press': 'buttonPress 0.15s ease-out',
        'button-tap': 'buttonTap 0.1s ease-out',
        'card-lift': 'cardLift 0.3s ease-out',
        'muscle-highlight': 'muscleHighlight 1s ease-in-out',
        'energy-boost': 'energyBoost 1.8s ease-out',
        'power-up': 'powerUp 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        
        // Loading and transition animations
        'skeleton-pulse': 'skeletonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'rubber-band': 'rubberBand 1s ease-out',
        'shake': 'shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'wobble': 'wobble 1s ease-in-out',
        'jello': 'jello 0.9s ease-out',
        
        // Motivational animations
        'motivate-pulse': 'motivatePulse 2s ease-in-out infinite',
        'celebrate': 'celebrate 1.5s ease-out',
        'victory-dance': 'victoryDance 2s ease-in-out',
        'level-up': 'levelUp 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      keyframes: {
        // Enhanced existing keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(220, 38, 38, 0.5)' }, // TrunkForce Red
          '100%': { boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)' },
        },
        
        // Workout tracking keyframes
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width, 100%)' },
        },
        progressPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7', transform: 'scale(1.02)' },
        },
        repCount: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        weightIncrease: {
          '0%': { transform: 'scale(1)', color: 'currentColor' },
          '50%': { transform: 'scale(1.1)', color: 'rgb(16, 185, 129)' },
          '100%': { transform: 'scale(1)', color: 'currentColor' },
        },
        setComplete: {
          '0%': { transform: 'scale(1)', background: 'currentColor' },
          '30%': { transform: 'scale(1.05)', background: 'rgb(16, 185, 129)' },
          '100%': { transform: 'scale(1)', background: 'rgb(16, 185, 129)' },
        },
        workoutComplete: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '0.8' },
          '25%': { transform: 'scale(1.1) rotate(5deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(-5deg)', opacity: '1' },
          '75%': { transform: 'scale(1.1) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        streakFire: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', filter: 'hue-rotate(0deg)' },
          '25%': { transform: 'scale(1.1) rotate(2deg)', filter: 'hue-rotate(10deg)' },
          '50%': { transform: 'scale(1.2) rotate(-2deg)', filter: 'hue-rotate(20deg)' },
          '75%': { transform: 'scale(1.1) rotate(1deg)', filter: 'hue-rotate(10deg)' },
        },
        achievementUnlock: {
          '0%': { opacity: '0', transform: 'scale(0.3) rotate(-10deg)' },
          '30%': { opacity: '1', transform: 'scale(1.2) rotate(5deg)' },
          '60%': { transform: 'scale(0.95) rotate(-2deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        
        // Interactive feedback keyframes
        buttonPress: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.95)' },
        },
        buttonTap: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        cardLift: {
          '0%': { transform: 'translateY(0) scale(1)', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' },
          '100%': { transform: 'translateY(-4px) scale(1.02)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
        },
        muscleHighlight: {
          '0%, 100%': { backgroundColor: 'currentColor', transform: 'scale(1)' },
          '50%': { backgroundColor: 'rgb(220, 38, 38)', transform: 'scale(1.05)' }, // TrunkForce Red
        },
        energyBoost: {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '30%': { transform: 'scale(1.1)', filter: 'brightness(1.2)' },
          '60%': { transform: 'scale(1.05)', filter: 'brightness(1.3)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1)' },
        },
        powerUp: {
          '0%': { opacity: '0.7', transform: 'scale(0.9) translateY(20px)' },
          '50%': { opacity: '1', transform: 'scale(1.05) translateY(-10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        
        // Loading and transition keyframes
        skeletonPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        rubberBand: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '40%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '50%': { transform: 'scale3d(1.15, 0.85, 1)' },
          '65%': { transform: 'scale3d(0.95, 1.05, 1)' },
          '75%': { transform: 'scale3d(1.05, 0.95, 1)' },
          '100%': { transform: 'scale3d(1, 1, 1)' },
        },
        shake: {
          '10%, 90%': { transform: 'translateX(-1px)' },
          '20%, 80%': { transform: 'translateX(2px)' },
          '30%, 50%, 70%': { transform: 'translateX(-4px)' },
          '40%, 60%': { transform: 'translateX(4px)' },
        },
        wobble: {
          '0%': { transform: 'translateX(0%)' },
          '15%': { transform: 'translateX(-25%) rotate(-5deg)' },
          '30%': { transform: 'translateX(20%) rotate(3deg)' },
          '45%': { transform: 'translateX(-15%) rotate(-3deg)' },
          '60%': { transform: 'translateX(10%) rotate(2deg)' },
          '75%': { transform: 'translateX(-5%) rotate(-1deg)' },
          '100%': { transform: 'translateX(0%)' },
        },
        jello: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '40%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '50%': { transform: 'scale3d(0.85, 1.15, 1)' },
          '65%': { transform: 'scale3d(1.05, 0.95, 1)' },
          '75%': { transform: 'scale3d(0.95, 1.05, 1)' },
          '100%': { transform: 'scale3d(1, 1, 1)' },
        },
        
        // Motivational keyframes
        motivatePulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.7)' }, // TrunkForce Red
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(220, 38, 38, 0)' },
        },
        celebrate: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '10%': { transform: 'rotate(-10deg) scale(1.1)' },
          '20%': { transform: 'rotate(10deg) scale(1.1)' },
          '30%': { transform: 'rotate(-10deg) scale(1.1)' },
          '40%': { transform: 'rotate(10deg) scale(1.1)' },
          '50%': { transform: 'rotate(0deg) scale(1.2)' },
          '60%': { transform: 'rotate(0deg) scale(1.1)' },
        },
        victoryDance: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg) scale(1)' },
          '25%': { transform: 'translateY(-10px) rotate(5deg) scale(1.05)' },
          '50%': { transform: 'translateY(-20px) rotate(-5deg) scale(1.1)' },
          '75%': { transform: 'translateY(-10px) rotate(5deg) scale(1.05)' },
        },
        levelUp: {
          '0%': { opacity: '0', transform: 'scale(0.5) translateY(50px)' },
          '20%': { opacity: '1', transform: 'scale(1.2) translateY(-20px)' },
          '40%': { transform: 'scale(0.9) translateY(10px)' },
          '60%': { transform: 'scale(1.1) translateY(-5px)' },
          '80%': { transform: 'scale(0.95) translateY(5px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      boxShadow: {
        // Enhanced existing shadows
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 60px -15px rgba(0, 0, 0, 0.12), 0 25px 25px -5px rgba(0, 0, 0, 0.06)',
        
        // Updated primary glow effects - TrunkForce Red
        'glow': '0 0 20px rgba(220, 38, 38, 0.3), 0 0 40px rgba(220, 38, 38, 0.1)',
        'glow-lg': '0 0 60px rgba(220, 38, 38, 0.4), 0 0 100px rgba(220, 38, 38, 0.2)',
        'glow-xl': '0 0 80px rgba(220, 38, 38, 0.5), 0 0 120px rgba(220, 38, 38, 0.3)',
        
        // Fitness-themed colored shadows - TrunkForce theme
        'primary-glow': '0 4px 25px -5px rgba(220, 38, 38, 0.25), 0 0 20px rgba(220, 38, 38, 0.1)', // TrunkForce Red
        'secondary-glow': '0 4px 25px -5px rgba(0, 0, 0, 0.25), 0 0 20px rgba(0, 0, 0, 0.1)', // TrunkForce Black
        'accent-glow': '0 4px 25px -5px rgba(255, 255, 255, 0.25), 0 0 20px rgba(255, 255, 255, 0.1)', // TrunkForce White
        'energy-glow': '0 4px 25px -5px rgba(254, 231, 92, 0.25), 0 0 20px rgba(254, 231, 92, 0.1)',
        'strength-glow': '0 4px 25px -5px rgba(220, 38, 38, 0.25), 0 0 20px rgba(220, 38, 38, 0.1)',
        'cardio-glow': '0 4px 25px -5px rgba(251, 113, 133, 0.25), 0 0 20px rgba(251, 113, 133, 0.1)',
        
        // Legacy colored shadows (maintained for compatibility)
        'colored-blue': '0 4px 25px -5px rgba(59, 130, 246, 0.25)',
        'colored-green': '0 4px 25px -5px rgba(34, 197, 94, 0.25)',
        'colored-purple': '0 4px 25px -5px rgba(139, 92, 246, 0.25)',
        'colored-orange': '0 4px 25px -5px rgba(251, 146, 60, 0.25)',
        'colored-red': '0 4px 25px -5px rgba(239, 68, 68, 0.25)',
        'colored-yellow': '0 4px 25px -5px rgba(250, 204, 21, 0.25)',
        'colored-pink': '0 4px 25px -5px rgba(236, 72, 153, 0.25)',
        
        // Interaction shadows
        'button-hover': '0 4px 15px -3px rgba(0, 0, 0, 0.15), 0 2px 6px -2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'inner-md': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      // Enhanced gradient color stops for progress and achievements - TrunkForce theme
      gradientColorStops: {
        'primary': '#DC2626',      // TrunkForce Red
        'secondary': '#000000',    // TrunkForce Black
        'accent': '#FFFFFF',       // TrunkForce White
        'energy': '#FEE75C',       // Electric yellow
        'strength': '#DC2626',     // Bold red
        'cardio': '#FB7185',       // Cardio pink
        'success': '#10B981',      // Success green
        'warning': '#F59E0B',      // Warning amber
        'error': '#DC2626',        // Error red
        'info': '#06B6D4',         // Info cyan
      },
      
      // Custom utilities for gym-specific patterns
      maxWidth: {
        'touch': '280px',          // Optimal width for touch interfaces
        'card': '320px',           // Standard card width
        'modal': '480px',          // Modal dialog width
        'form': '400px',           // Form optimal width
      },
      
      minHeight: {
        'touch': '44px',           // Minimum touch target height
        'button': '48px',          // Button minimum height
        'card': '120px',           // Card minimum height
        'hero': '40vh',            // Hero section height
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
      },
      
      zIndex: {
        'dropdown': '1000',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
        'loading': '9999',
      },
      
      // Workout-specific line heights for metrics display
      lineHeight: {
        'metric': '1.1',           // For large metrics/numbers
        'tight': '1.2',            // For compact displays
        'compact': '1.3',          // For data lists
      },
      
      // Custom aspect ratios for fitness content
      aspectRatio: {
        'card': '4/3',             // Standard fitness card ratio
        'progress': '16/9',        // Progress chart ratio
        'avatar': '1/1',           // Profile avatar ratio
        'video': '16/9',           // Exercise video ratio
        'banner': '3/1',           // Banner/hero ratio
      },
    },
  },
  plugins: [],
}
