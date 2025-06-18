# Fuerte Design System
## Visual & Narrative Identity Guide

### Core Narrative: "Harnessing Chaos, Engineering Alpha"

The Fuerte brand embodies the transformation of market chaos into structured returns through advanced AI technology. This narrative permeates every visual and interactive element of our digital presence.

---

## 🎨 Color System

### Primary Palette

#### Deep Space Black
- **Hex**: `#0A0A10`
- **RGB**: `10, 10, 16`
- **Usage**: Primary background, creating premium atmosphere
- **Represents**: The infinite potential of the digital realm

#### Fuerte Blue
- **Hex**: `#00BFFF`
- **RGB**: `0, 191, 255`
- **Usage**: Key interactions, headlines, positive data visualizations
- **Represents**: Intelligence, precision, technology, control

#### Volcanic Red
- **Hex**: `#FF3300`
- **RGB**: `255, 51, 0`
- **Usage**: Market volatility visualizations, risk indicators
- **Represents**: Chaos, volatility, raw market forces

### Secondary Palette

#### Metallic Silver
- **Hex**: `#C0C0C0`
- **RGB**: `192, 192, 192`
- **Usage**: Output elements, premium accents
- **Represents**: Refined value, tangible alpha

#### Neutral Gray Dark
- **Hex**: `#333333`
- **RGB**: `51, 51, 51`
- **Usage**: UI components, secondary elements

#### Neutral Gray Medium
- **Hex**: `#808080`
- **RGB**: `128, 128, 128`
- **Usage**: Borders, disabled states

#### Pure White
- **Hex**: `#FFFFFF`
- **RGB**: `255, 255, 255`
- **Usage**: Body text on dark backgrounds
- **Represents**: Clarity, trust

### Color Usage Guidelines

```css
/* CSS Custom Properties */
:root {
  --color-deep-space: #0A0A10;
  --color-fuerte-blue: #00BFFF;
  --color-volcanic-red: #FF3300;
  --color-metallic-silver: #C0C0C0;
  --color-neutral-dark: #333333;
  --color-neutral-medium: #808080;
  --color-pure-white: #FFFFFF;
  
  /* Semantic Colors */
  --color-background: var(--color-deep-space);
  --color-primary: var(--color-fuerte-blue);
  --color-danger: var(--color-volcanic-red);
  --color-success: var(--color-metallic-silver);
  --color-text-primary: var(--color-pure-white);
  --color-text-secondary: var(--color-neutral-medium);
}
```

---

## 📝 Typography System

### Font Hierarchy

#### Display/Hero (H1)
- **Font**: Custom geometric sans-serif (fallback: 'Space Grotesk', 'TT Fors')
- **Weight**: 700 (Bold)
- **Size**: 48-72px (responsive)
- **Letter-spacing**: -0.02em
- **Usage**: Hero headlines, major section titles

#### Headings (H2-H3)
- **Font**: Same as H1
- **Weight**: 600 (Semi-bold)
- **H2 Size**: 36-48px
- **H3 Size**: 24-32px
- **Letter-spacing**: -0.01em

#### Body Text
- **Font**: 'Inter', system-ui, sans-serif
- **Weight**: 400 (Regular), 500 (Medium)
- **Size**: 16-18px
- **Line-height**: 1.6
- **Usage**: Paragraphs, descriptions

#### UI Text
- **Font**: 'Inter', system-ui, sans-serif
- **Weight**: 500 (Medium)
- **Size**: 14-16px
- **Usage**: Buttons, labels, navigation

#### Data/Code
- **Font**: 'Fira Code', 'Source Code Pro', monospace
- **Weight**: 400 (Regular)
- **Size**: 14-16px
- **Usage**: Data tables, code snippets, technical specs

### Typography CSS

```css
/* Font Face Declarations */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap');

/* Typography Scale */
:root {
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 2rem;      /* 32px */
  --text-4xl: 2.5rem;    /* 40px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 4rem;      /* 64px */
  --text-7xl: 4.5rem;    /* 72px */
}
```

---

## 🎬 Motion Language

### Core Principle: Chaos to Order

All animations follow the narrative of transforming chaotic movement into structured, predictable patterns.

### Animation Principles

1. **Entry Animations**: Elements start with high-frequency noise, transitioning through angular movements to stable states
2. **Hover States**: Subtle energy that stabilizes, with color shifts from neutral to Fuerte Blue
3. **Scroll Animations**: Parallax layers with staggered reveal timing
4. **Data Visualizations**: Particle systems transitioning from chaotic to organized states

### Animation Implementation

```css
/* Base Transition */
.fuerte-transition {
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Chaos to Order Animation */
@keyframes chaosToOrder {
  0% {
    transform: translate(
      calc(var(--random-x) * 20px),
      calc(var(--random-y) * 20px)
    ) rotate(calc(var(--random-r) * 30deg));
    opacity: 0.7;
  }
  50% {
    transform: translate(
      calc(var(--random-x) * 5px),
      calc(var(--random-y) * 5px)
    ) rotate(calc(var(--random-r) * 5deg));
  }
  100% {
    transform: translate(0, 0) rotate(0);
    opacity: 1;
  }
}

/* Hover Energy */
@keyframes subtleEnergy {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-1px); }
  75% { transform: translateX(1px); }
}
```

---

## 🎯 Visual Metaphors

### The Transformation Process

1. **Input (Chaos)**: Red lightning, erratic particles
2. **Processing (Intelligence)**: Blue geometric forms, structured grids
3. **Output (Alpha)**: Silver/chrome spirals, ordered streams

### Implementation Examples

#### Hero Section
- Background: Particle field transitioning from red chaos to blue order
- Headline: Appears with angular reveal, stabilizing into position
- CTA: Pulses with controlled energy

#### Data Dashboards
- Charts animate from volatile red lines to smoothed blue trends
- Numbers count up with decreasing volatility
- Grid structures emerge from chaos

#### Navigation
- Menu items reveal with staggered timing
- Hover states show controlled energy
- Active states lock into orbital positions

---

## 🔧 Component Specifications

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--color-fuerte-blue);
  color: var(--color-deep-space);
  padding: 16px 32px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-base);
  border: none;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-primary:hover::before {
  width: 300px;
  height: 300px;
}
```

### Cards

#### Data Card
```css
.data-card {
  background: rgba(10, 10, 16, 0.8);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 8px;
  padding: 24px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.data-card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, 
    var(--color-volcanic-red), 
    var(--color-fuerte-blue)
  );
  border-radius: 8px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s;
}

.data-card:hover::after {
  opacity: 1;
}
```

---

## 📐 Grid & Spacing

### Spacing Scale
```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
}
```

### Container Widths
```css
:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}
```

---

## 🎭 Visual Effects

### Glassmorphism
```css
.glass-effect {
  background: rgba(10, 10, 16, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 191, 255, 0.1);
}
```

### Glow Effects
```css
.glow-blue {
  box-shadow: 
    0 0 20px rgba(0, 191, 255, 0.5),
    0 0 40px rgba(0, 191, 255, 0.3),
    0 0 60px rgba(0, 191, 255, 0.1);
}

.glow-red {
  box-shadow: 
    0 0 20px rgba(255, 51, 0, 0.5),
    0 0 40px rgba(255, 51, 0, 0.3),
    0 0 60px rgba(255, 51, 0, 0.1);
}
```

### Metallic Gradient
```css
.metallic-text {
  background: linear-gradient(
    135deg,
    #C0C0C0 0%,
    #FFFFFF 50%,
    #C0C0C0 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 🚀 Implementation Guidelines

1. **Consistency**: Every element reinforces the chaos-to-order narrative
2. **Performance**: GPU-accelerated animations using transform and opacity
3. **Accessibility**: Reduced-motion alternatives for all animations
4. **Responsiveness**: Graceful scaling across all devices
5. **Brand Voice**: Powerful, controlled, and sophisticated interactions

This design system is the foundation for creating a digital experience that doesn't just tell investors about Fuerte's capabilities—it demonstrates them through every pixel and interaction. 