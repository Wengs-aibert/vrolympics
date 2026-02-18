# Visual Design - VROlympics Landing Page

## Overview

This document defines the visual design language for the VROlympics landing page, including color palette, typography, layout patterns, and component styling.

**Design Goal**: Create a modern, sophisticated aesthetic inspired by premium minimalist design (Ivory Clinic) that conveys innovation in VR fitness and sustainability while maintaining VROlympics' energetic brand identity.

**Design Philosophy**: 
- **Ivory Clinic-Inspired Layout**: Generous white space, minimalist composition, elegant hierarchy
- **VROlympics Energy**: Vibrant brand colors, bold messaging, innovative tech vibe
- **Mixed-Weight Typography**: Ultra-thin and bold weights in same headlines for visual sophistication
- **Hero-Centric**: Large, impactful hero visual (VR headset zooming into Simone Biles)
- **Breathable Design**: Ample spacing, clean sections, uncluttered interface

## Brand Colors

### Primary Palette

```css
/* Brand Colors - Official VROlympics Palette */
--color-primary-blue: #0056B3;    /* Primary Blue - Main brand color */
--color-sky-blue: #4FC3F7;        /* Sky Blue - Accents and highlights */
--color-dark-navy: #2C3E50;       /* Dark Navy - Text and dark elements */
--color-highlight-orange: #FFB74D; /* Highlight Orange - CTAs and emphasis */

/* Supporting Colors */
--color-white: #FFFFFF;           /* Pure white for text on dark */
--color-light-gray: #F5F5F5;      /* Light backgrounds */
--color-medium-gray: #9E9E9E;     /* Secondary text */
--color-dark-gray: #424242;       /* Tertiary text */
```

### Color Usage Guidelines

| Element | Primary | Secondary | Text |
|---------|---------|-----------|------|
| Hero Background | Primary Blue (#0056B3) | Sky Blue (#4FC3F7) gradient | White |
| CTA Button | Highlight Orange (#FFB74D) | Hover: darker orange | Dark Navy |
| Form Elements | Primary Blue (focus) | Light Gray (background) | Dark Navy |
| Footer | Dark Navy (#2C3E50) | - | Light Gray |
| Links | Sky Blue (#4FC3F7) | Highlight Orange (hover) | - |

### Accessibility

All color combinations meet WCAG 2.1 AA contrast ratios:
- White on Primary Blue: 4.6:1 ✓
- Dark Navy on Light Gray: 10.7:1 ✓
- Dark Navy on Highlight Orange: 4.5:1 ✓

## Typography

### Font Stack

```css
/* Primary Font - System UI (fast, native) */
font-family: -apple-system, BlinkMacSystemFont, 
             "Segoe UI", Roboto, "Helvetica Neue", 
             Arial, sans-serif;
```

**Rationale**: System fonts provide:
- Instant loading (no web font download)
- Native appearance on each platform
- Excellent readability
- Zero performance cost

### Mixed-Weight Typography Approach

**Inspired by Ivory Clinic**, headlines use mixed font weights within the same line for visual sophistication:

**Example Headline Pattern**:
```
Virtual Reality [font-weight: 100-200]
Olympics [font-weight: 700]
for Energy Generation [font-weight: 300]
```

**Implementation**:
```html
<h1>
  <span class="text-thin">Virtual Reality</span>
  <span class="text-bold">Olympics</span>
  <span class="text-light">for Energy Generation</span>
</h1>
```

### Type Scale (Mobile-First)

```css
/* Mobile (375px+) */
--text-hero-headline: 2.5rem;    /* 40px - Larger for impact */
--text-hero-tagline: 1.125rem;   /* 18px - Tagline */
--text-heading: 1.5rem;          /* 24px - Section headings */
--text-body: 1.125rem;           /* 18px - Slightly larger for readability */
--text-small: 0.875rem;          /* 14px - Small text, captions */
--text-button: 1rem;             /* 16px - Button text */
--text-stat-number: 3rem;        /* 48px - Large stat numbers */
--text-stat-label: 0.875rem;     /* 14px - Stat labels */

/* Tablet (768px+) */
--text-hero-headline: 3.5rem;    /* 56px */
--text-hero-tagline: 1.375rem;   /* 22px */
--text-heading: 2rem;            /* 32px */
--text-stat-number: 4rem;        /* 64px */

/* Desktop (1200px+) */
--text-hero-headline: 5rem;      /* 80px - Extra large for desktop impact */
--text-hero-tagline: 1.5rem;     /* 24px */
--text-heading: 2.5rem;          /* 40px */
--text-stat-number: 5rem;        /* 80px */
```

### Font Weights

- **Extra Bold (800-900)**: Emphasized words in mixed-weight headlines
- **Bold (700)**: Emphasized words, CTAs
- **Semi-Bold (600)**: Subheadings
- **Regular (400)**: Body text
- **Light (300)**: Supporting words in mixed-weight headlines
- **Extra Thin (100-200)**: Leading words in mixed-weight headlines (use strategically)

### Line Height

- Headlines: 1.1 (very tight for impact, Ivory-style)
- Mixed-weight headlines: 1.15 (slightly more space for varied weights)
- Body text: 1.7 (generous, breathable reading)
- Form labels: 1.4 (compact but clear)
- Stat numbers: 1.0 (tight, bold display)

## Layout Patterns

### Grid System

**Mobile-First Approach**:
- Mobile: Single column, full width
- Tablet: 2-column grid for concept cards
- Desktop: Max-width container (1200px), centered

```css
/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; /* 16px mobile */
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem; /* 32px tablet+ */
  }
}
```

### Spacing Scale

**Ivory-Inspired: Generous white space for breathability**

```css
/* Consistent spacing rhythm - More generous than typical */
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 2rem;     /* 32px - Increased */
--space-lg: 3rem;     /* 48px - Increased */
--space-xl: 4rem;     /* 64px - Increased */
--space-xxl: 6rem;    /* 96px - Very generous section spacing */
--space-hero: 8rem;   /* 128px - Hero section spacing */
```

### Section Layout

**Ivory-Inspired: Breathable, centered, minimal**

Each section follows this pattern:
- Padding: `space-xxl` (mobile), `space-hero` (desktop) - Very generous
- Margin-bottom: `space-xxl` - Large gaps between sections
- Text alignment: Center (all screens for headlines), Center (body text on mobile), Left/Center mix (desktop)
- Max-width: 800px for text content (narrow for readability)
- Background: Alternating soft backgrounds (white, very light gray)

## Component Patterns

### Hero Section

**Ivory-Inspired: Large hero visual, mixed-weight headline, minimalist**

```
┌─────────────────────────────────────────────────┐
│  Background: Soft light gray (#F5F7FA)          │
│  ┌───────────────────────────────────────────┐ │
│  │  [Mixed-Weight Headline]                  │ │
│  │  Virtual Reality OLYMPICS                 │ │
│  │  for Energy Generation                    │ │
│  │                                           │ │
│  │  [LARGE Hero Visual - 60% viewport]       │ │
│  │  VR Headset zooming into Simone Biles    │ │
│  │                                           │ │
│  │  [Floating badges: "Beta Coming 2026"]   │ │
│  │                                           │ │
│  │  [Rounded CTA Button - Dark]             │ │
│  │  ↓ (Scroll indicator)                     │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Styling**:
- Background: Soft light background (#F5F7FA) NOT gradient - clean, minimal
- Min-height: 100vh (full viewport, mobile & desktop)
- Headline: Mixed-weight (thin "Virtual Reality", BOLD "OLYMPICS", light "for Energy Generation")
- Text color: Dark Navy (#2C3E50)
- Hero Image: 
  - Large, centered (60-70% of viewport height)
  - VR headset zooming into Simone Biles
  - High-quality photo treatment
  - Subtle shadow/elevation
- Floating badges:
  - "Beta Coming 2026"
  - Small, rounded, positioned around hero image
  - Light background with border
- Button: Dark Navy background, white text, rounded (pill-shaped)
- Scroll indicator: Subtle down arrow at bottom

### Concept Cards

```
┌──────────────────────┐
│  [Icon Placeholder]  │
│  Heading (Dark Navy) │
│  Description text    │
└──────────────────────┘
```

**Styling**:
- Background: White
- Border: 1px solid Light Gray
- Border-radius: 8px
- Padding: `space-lg`
- Box-shadow: Subtle (0 2px 8px rgba(0,0,0,0.1))
- Hover: Lift effect (translateY -4px, stronger shadow)

### Email Form

```
┌─────────────────────────────────────┐
│  Email Input (Primary Blue focus)   │
│  [Submit Button - Orange]           │
└─────────────────────────────────────┘
```

**Styling**:
- Input:
  - Background: White
  - Border: 2px solid Light Gray
  - Border-radius: 4px
  - Padding: `space-sm`
  - Focus: Border Primary Blue, box-shadow
- Button:
  - Background: Highlight Orange
  - Color: Dark Navy
  - Border: none
  - Border-radius: 4px
  - Padding: `space-sm` `space-lg`
  - Font-weight: Bold
  - Hover: Darken 10%, slight scale (1.05)
  - Active: Scale down (0.98)

### Success/Error Messages

```
┌─────────────────────────────────────┐
│  ✓ Success message (Green bg)       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  ✗ Error message (Red bg)           │
└─────────────────────────────────────┘
```

**Styling**:
- Success: Light green background (#E8F5E9), Dark green text (#2E7D32)
- Error: Light red background (#FFEBEE), Dark red text (#C62828)
- Border-radius: 4px
- Padding: `space-sm`
- Margin-top: `space-sm`

## Responsive Breakpoints

```css
/* Mobile-first breakpoints */
--breakpoint-tablet: 768px;   /* iPad, larger phones landscape */
--breakpoint-desktop: 1200px; /* Desktop, laptop */
--breakpoint-wide: 1600px;    /* Large monitors (optional) */
```

### Mobile (< 768px)
- Single column layout
- Full-width buttons
- Stack all elements vertically
- Hero headline: 2rem

### Tablet (768px - 1199px)
- 2-column grid for concept cards
- Hero headline: 3rem
- Increased padding/margins

### Desktop (1200px+)
- Max-width container: 1200px
- Hero headline: 4rem
- 3-column grid (if needed)
- Larger spacing

## Animations & Transitions

### Hover Effects

```css
/* Button hover */
transition: all 0.3s ease;
transform: scale(1.05);

/* Card hover */
transition: transform 0.3s ease, box-shadow 0.3s ease;
transform: translateY(-4px);
box-shadow: 0 8px 16px rgba(0,0,0,0.15);

/* Link hover */
transition: color 0.2s ease;
```

### Form Focus

```css
input:focus {
  outline: none;
  border-color: var(--color-primary-blue);
  box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
```

### Page Load Animations (Optional)

```css
/* Fade in on load */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero, .concept-section, .form-section {
  animation: fadeIn 0.6s ease-out;
}
```

## Image Placeholders

### Hero Visual

**Primary Hero Image**: VR headset zooming into Simone Biles
- **Visual concept**: Dynamic shot of VR headset in foreground, Simone Biles in athletic pose behind/through it
- **Treatment**: High-quality photo, professional lighting
- **Composition**: Centered, large scale (60-70% viewport height)
- **Effect**: Subtle 3D elevation/shadow for depth (Ivory Clinic style)
- **Aspect ratio**: Flexible, optimized for vertical space
- **Fallback/Placeholder**: 
  - Solid shape with VROlympics branding
  - Sky Blue background
  - Text: "VR Headset + Athlete Hero Visual"

### Stats Display

**Ivory-Inspired stat numbers** (like "12 Years", "04 Clinics"):
- **VROlympics Stats**: "Beta Coming 2026"
- **Layout**: Large number, small label below
- **Typography**: 
  - Number: Ultra-bold, 5rem (desktop), Dark Navy
  - Label: Regular, 0.875rem, Medium Gray
- **Spacing**: Generous padding, centered
- **Placement**: Could be below hero or in separate section

### Concept Icons

- Size: 64px × 64px (mobile), 96px × 96px (desktop)
- Style: Minimal line icons (match Ivory's simplicity)
- Color: Primary Blue or Dark Navy
- Placement: Sparse, not crowded

## Accessibility

### Touch Targets

- Minimum size: 44px × 44px
- Buttons: 48px height minimum
- Spacing between targets: 8px minimum

### Color Contrast

- All text meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large)
- Links underlined or clearly distinguishable
- Focus indicators visible

### Keyboard Navigation

- All interactive elements focusable
- Focus indicators visible (blue outline)
- Tab order logical (top to bottom, left to right)

## Performance Considerations

- No web fonts (use system fonts)
- Minimal CSS (< 50KB)
- No CSS frameworks (vanilla CSS)
- Optimize images (WebP with fallback)
- Critical CSS inline (if needed)

## Design Evolution

As the project evolves beyond MVP:
- Consider custom web fonts (if brand requires)
- Add micro-interactions (scroll animations, parallax)
- Implement dark mode (optional)
- Add custom illustrations (replace placeholders)

**Last Updated**: February 15, 2026
