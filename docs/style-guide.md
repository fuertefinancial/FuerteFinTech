# Fuerte Design System - Implementation Guide

## Quick Start

Include the following CSS files in your HTML:

```html
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/base.css">
<link rel="stylesheet" href="styles/animations.css">
<link rel="stylesheet" href="styles/components.css">
```

## Core Narrative Implementation

Every element should reinforce the "Harnessing Chaos, Engineering Alpha" narrative:

1. **Initial State**: Elements appear chaotic, volatile
2. **Transition**: Smooth transformation showing control
3. **Final State**: Ordered, structured, refined

## Color Usage

### Primary Actions
```html
<!-- Use Fuerte Blue for primary CTAs -->
<button class="btn btn-primary">Start Analysis</button>
```

### Risk/Volatility Indicators
```html
<!-- Use Volcanic Red for market volatility -->
<div class="badge badge-danger">High Volatility</div>
```

### Success States
```html
<!-- Use Metallic Silver for refined outputs -->
<div class="text-success gradient-metallic">Alpha Generated</div>
```

## Typography Implementation

### Headlines
```html
<!-- Hero headlines with dramatic impact -->
<h1 class="animate-chaos-to-order gradient-metallic">
    FUERTE FINANCIAL TECHNOLOGIES
</h1>
```

### Body Text
```html
<!-- Clear, readable content -->
<p class="text-lg">
    Transform market chaos into structured returns through 
    advanced AI technology.
</p>
```

### Data Display
```html
<!-- Monospace for technical data -->
<code class="text-primary">algorithm.efficiency = 0.873</code>
```

## Animation Patterns

### Entry Animations
```html
<!-- Elements enter with chaos-to-order transformation -->
<div class="card animate-chaos-to-order delay-200">
    <h3>Market Analysis</h3>
</div>
```

### Hover States
```html
<!-- Subtle energy on interaction -->
<button class="btn btn-primary hover-energy">
    Process Data
</button>
```

### Scroll Reveals
```html
<!-- Content reveals as user scrolls -->
<section class="scroll-reveal">
    <h2>Our Technology</h2>
</section>
```

### Staggered Animations
```html
<!-- Multiple elements with delays -->
<div class="animate-chaos-to-order">First</div>
<div class="animate-chaos-to-order delay-200">Second</div>
<div class="animate-chaos-to-order delay-400">Third</div>
```

## Component Patterns

### Glass Cards
```html
<div class="card glass hover-energy">
    <div class="card-header">
        <h4 class="card-title">Portfolio Performance</h4>
        <span class="badge badge-primary">Live</span>
    </div>
    <div class="metric">+24.7%</div>
    <div class="label">Monthly Return</div>
</div>
```

### Data Visualization Cards
```html
<div class="card card-data">
    <div class="metric gradient-metallic">$1.2M</div>
    <div class="label">Assets Under Management</div>
    <div class="progress">
        <div class="progress-bar" style="width: 75%;"></div>
    </div>
</div>
```

### Form Inputs
```html
<div class="form-group">
    <label class="form-label">Investment Amount</label>
    <div class="input-group">
        <span class="input-icon">$</span>
        <input type="number" class="form-input" placeholder="10,000">
    </div>
</div>
```

### Loading States
```html
<!-- Orbital loader for processing -->
<div class="loader">
    <div class="loader-orbit"></div>
</div>

<!-- Chaos loader for market analysis -->
<div class="loader-chaos">
    <span></span>
    <span></span>
    <span></span>
</div>
```

## Special Effects

### Particle Background
```html
<section class="hero-section chaos-field">
    <!-- Automatic particle animation -->
</section>
```

### Data Grid Background
```html
<section class="section data-grid">
    <!-- Structured grid overlay -->
</section>
```

### Glitch Text
```html
<h3 class="glitch-text" data-text="VOLATILITY">
    VOLATILITY
</h3>
```

### Energy Borders
```html
<div class="card energy-border">
    <!-- Animated gradient border -->
</div>
```

## JavaScript Integration

### Scroll Animations
```javascript
// Initialize scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});
```

### Dynamic Chaos Variables
```javascript
// Set random variables for chaos animations
element.style.setProperty('--random-x', Math.random() * 2 - 1);
element.style.setProperty('--random-y', Math.random() * 2 - 1);
element.style.setProperty('--random-r', Math.random() * 2 - 1);
```

### Parallax Effects
```javascript
// Update parallax on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    document.documentElement.style.setProperty('--scroll-y', scrollY);
});
```

## Responsive Design

All components are mobile-first and responsive:

```css
/* Container automatically adjusts */
.container {
    /* 640px → 768px → 1024px → 1280px → 1536px */
}

/* Typography scales with viewport */
h1 {
    font-size: clamp(var(--text-4xl), 5vw, var(--text-7xl));
}
```

## Accessibility

### Focus States
All interactive elements have clear focus indicators:

```html
<button class="btn btn-primary">
    <!-- Automatic focus ring on keyboard navigation -->
</button>
```

### Reduced Motion
Respect user preferences:

```css
/* Animations disabled for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
    /* All animations become instant */
}
```

### Color Contrast
- White text on Deep Space Black: 20.4:1 ratio ✓
- Deep Space Black on Fuerte Blue: 8.3:1 ratio ✓
- All combinations meet WCAG AAA standards

## Performance Guidelines

1. **Use CSS transforms** for animations (GPU-accelerated)
2. **Lazy load** heavy visual effects
3. **Debounce** scroll event handlers
4. **Preload** critical fonts
5. **Minimize** DOM manipulations

## Common Patterns

### Hero Section
```html
<section class="hero-section chaos-field">
    <div class="container">
        <h1 class="animate-chaos-to-order gradient-metallic">
            Heading
        </h1>
        <p class="animate-chaos-to-order delay-200">
            Subheading
        </p>
        <button class="btn btn-primary btn-lg animate-chaos-to-order delay-400">
            Call to Action
        </button>
    </div>
</section>
```

### Feature Grid
```html
<div class="demo-grid">
    <div class="card scroll-reveal">Feature 1</div>
    <div class="card scroll-reveal delay-100">Feature 2</div>
    <div class="card scroll-reveal delay-200">Feature 3</div>
</div>
```

### Modal Dialog
```html
<div class="modal-overlay" id="modal">
    <div class="modal">
        <h3>Modal Title</h3>
        <p>Modal content...</p>
        <button class="btn btn-primary">Confirm</button>
    </div>
</div>
```

## Best Practices

1. **Consistency**: Always use design system classes
2. **Semantic HTML**: Use appropriate HTML elements
3. **Progressive Enhancement**: Core functionality works without JS
4. **Performance**: Optimize images and animations
5. **Testing**: Test across devices and browsers

Remember: Every pixel should tell the story of transforming chaos into order. 