import { useEffect, useRef } from 'react';

/**
 * Accessibility utilities for GymGuy application
 * Provides helpers for keyboard navigation, focus management, and screen reader support
 */

// Focus management
export const focusElement = (element: HTMLElement | null) => {
  if (element) {
    element.focus();
  }
};

export const trapFocus = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  container.addEventListener('keydown', handleTab);
  return () => container.removeEventListener('keydown', handleTab);
};

// Skip navigation hook
export const useSkipNavigation = () => {
  useEffect(() => {
    const handleSkip = (e: KeyboardEvent) => {
      // Alt + S to skip to main content
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
          (main as HTMLElement).tabIndex = -1;
          (main as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleSkip);
    return () => document.removeEventListener('keydown', handleSkip);
  }, []);
};

// Announce to screen readers
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Keyboard navigation hook
export const useKeyboardNavigation = (items: HTMLElement[], orientation: 'horizontal' | 'vertical' = 'vertical') => {
  const currentIndex = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const currentItemIndex = items.findIndex(item => item === activeElement);

      if (currentItemIndex === -1) return;

      let nextIndex = currentItemIndex;
      const isHorizontal = orientation === 'horizontal';

      switch (e.key) {
        case 'ArrowDown':
          if (!isHorizontal) {
            e.preventDefault();
            nextIndex = (currentItemIndex + 1) % items.length;
          }
          break;
        case 'ArrowUp':
          if (!isHorizontal) {
            e.preventDefault();
            nextIndex = (currentItemIndex - 1 + items.length) % items.length;
          }
          break;
        case 'ArrowRight':
          if (isHorizontal) {
            e.preventDefault();
            nextIndex = (currentItemIndex + 1) % items.length;
          }
          break;
        case 'ArrowLeft':
          if (isHorizontal) {
            e.preventDefault();
            nextIndex = (currentItemIndex - 1 + items.length) % items.length;
          }
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = items.length - 1;
          break;
      }

      if (nextIndex !== currentItemIndex && items[nextIndex]) {
        items[nextIndex].focus();
        currentIndex.current = nextIndex;
      }
    };

    items.forEach(item => {
      item.addEventListener('keydown', handleKeyDown);
    });

    return () => {
      items.forEach(item => {
        item.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, [items, orientation]);

  return currentIndex.current;
};

// ARIA IDs generator
export const generateId = (prefix: string) => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Focus visible polyfill check
export const supportsFocusVisible = () => {
  try {
    document.querySelector(':focus-visible');
    return true;
  } catch {
    return false;
  }
};

// Live region hook for dynamic content
export const useLiveRegion = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  useEffect(() => {
    if (message) {
      announce(message, priority);
    }
  }, [message, priority]);
};

// Escape key handler
export const useEscapeKey = (handler: () => void, isActive = true) => {
  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handler();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handler, isActive]);
};

// Reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// High contrast mode detection
export const prefersHighContrast = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
};

// Touch device detection
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// WCAG contrast ratio calculator
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string) => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0;

    const [r, g, b] = rgb.map(val => {
      const channel = parseInt(val) / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

// Check if contrast meets WCAG standards
export const meetsWCAG = (
  contrastRatio: number,
  level: 'AA' | 'AAA' = 'AA',
  largeText = false
): boolean => {
  if (level === 'AA') {
    return largeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
  }
  return largeText ? contrastRatio >= 4.5 : contrastRatio >= 7;
};

// Debounced announcement for rapid updates
let announceTimeout: NodeJS.Timeout;
export const debounceAnnounce = (message: string, delay = 500, priority: 'polite' | 'assertive' = 'polite') => {
  clearTimeout(announceTimeout);
  announceTimeout = setTimeout(() => {
    announce(message, priority);
  }, delay);
};

// Focus restoration after modal/drawer close
export const useFocusRestore = () => {
  const previousFocus = useRef<HTMLElement | null>(null);

  const saveFocus = () => {
    previousFocus.current = document.activeElement as HTMLElement;
  };

  const restoreFocus = () => {
    if (previousFocus.current) {
      previousFocus.current.focus();
    }
  };

  return { saveFocus, restoreFocus };
};

// Roving tabindex for menu items
export const useRovingTabIndex = (items: HTMLElement[]) => {
  const activeIndex = useRef(0);

  useEffect(() => {
    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === activeIndex.current ? '0' : '-1');
    });
  }, [items, activeIndex]);

  const setActive = (index: number) => {
    if (index >= 0 && index < items.length) {
      activeIndex.current = index;
      items[index].focus();
    }
  };

  return { activeIndex: activeIndex.current, setActive };
};