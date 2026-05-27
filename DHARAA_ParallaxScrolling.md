# DHARAA — Parallax Scrolling Design Specification
## Award-Winning Scroll Experience Blueprint
**Version:** 2.0 | **Date:** May 2026 | **Classification:** Production Blueprint

---

## 0. Philosophy

Parallax is not a gimmick for DHARAA — it is the mechanism through which the brand's premium positioning is *felt*, not just seen. Every depth layer, every scroll-triggered reveal, every kinetic float must reinforce the same message: this jewelry is beautiful, it moves with you, and the act of browsing it should feel like turning the pages of a high-fashion editorial.

**Three Parallax Principles:**
1. **Subtlety is sophistication.** Excessive motion signals amateur work. Every effect is calibrated to stay in the peripheral awareness of the shopper, not demand center stage.
2. **Purpose before performance.** Every moving element guides the eye toward product photography and CTAs.
3. **Performance is non-negotiable.** All scroll effects run on the GPU via `will-change: transform` and `transform: translateY()`. No `top`/`bottom` positioning on animated elements.

---

## 1. Technical Foundation

### 1.1 Implementation Stack

```
Primary:   Framer Motion 12 (useScroll + useTransform)
Secondary: CSS custom properties for scroll position (where Framer is overkill)
Fallback:  CSS-only transitions for reduced-motion users
```

### 1.2 Core Hooks (Framer Motion)

```tsx
// Global scroll progress
const { scrollY, scrollYProgress } = useScroll();

// Section-scoped scroll
const ref = useRef(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]  // enter viewport → exit viewport
});

// Transform scroll to motion value
const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
```

### 1.3 GPU Optimisation Rules

```css
/* Apply to ALL parallax elements */
.parallax-element {
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
  transform: translateZ(0); /* Force GPU layer */
}
```

### 1.4 Reduced Motion Compliance

```tsx
// Wrap ALL motion effects
import { useReducedMotion } from 'framer-motion';

const prefersReduced = useReducedMotion();

// In component:
const y = useTransform(
  scrollYProgress,
  [0, 1],
  prefersReduced ? ["0%", "0%"] : ["0%", "30%"]  // static if reduced
);
```

### 1.5 Performance Budget

| Effect Type | Max Elements Active | Target FPS |
|---|---|---|
| Background parallax | 1 per viewport | 60fps |
| Floating elements | 4 max on screen | 60fps |
| Scroll-reveal animations | Unlimited (GPU-composited) | 60fps |
| Mouse-tracking parallax | 1 per section | 60fps |
| Particle/shimmer effects | None (too heavy) | N/A |

---

## 2. Section-by-Section Parallax Specification

---

### 2.1 PreLoader → Page Reveal

**Type:** Opacity + Scale exit transition

```tsx
// PreLoader component
const variants = {
  visible: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

// Page content reveal
const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.5, duration: 0.5, ease: "easeOut" }
  }
};
```

**Visual Effect:** Brand logo breathes (scale 1.0 → 1.04 loop) while loading, then the entire preloader fades and scales down as the page blooms up.

---

### 2.2 Hero Section — Primary Parallax

**Type:** Background image parallax + foreground depth layers

```
Depth Stack (front to back):
  Z-Layer 5 (fastest): Floating badges ["Premium Quality 💎", "Fast Delivery 🚚"]
  Z-Layer 4:           Hero text + CTAs + stats
  Z-Layer 3:           Foreground gradient overlay
  Z-Layer 2:           Secondary decorative shape
  Z-Layer 1 (slowest): Background product photography
```

#### Background Layer (Slowest — Classic Parallax)
```tsx
const heroRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end start"]
});

// Background moves at 40% of scroll speed (parallax effect)
const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

// Opacity fades as user scrolls away
const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);

<motion.div
  style={{
    y: bgY,
    scale: bgScale,
    opacity: bgOpacity,
    willChange: 'transform',
  }}
  className="absolute inset-0 hero-bg-image"
/>
```

#### Text Layer (Medium — Slight upward drift)
```tsx
const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

<motion.div style={{ y: textY, opacity: textOpacity }}>
  {/* Hero headline, subline, CTAs */}
</motion.div>
```

#### Floating Badge Cards (Fastest — Diverge on scroll)
```tsx
// "Premium Quality 💎" — drifts UP faster
const badge1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

// "Fast Delivery 🚚" — drifts DOWN slower
const badge2Y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

// Both: continuous float animation (independent of scroll)
const floatAnimation = {
  y: [0, -10, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
};
```

#### Scroll Indicator (Bounce + Fade on Scroll)
```tsx
const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

// Independent bounce animation
animate={{ y: [0, 8, 0] }}
transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
```

#### Hero Stat Cards (Staggered Entrance on Load)
```tsx
const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.8 + i * 0.15, duration: 0.5 }
  })
};
// Custom: i = 0, 1, 2 for the three stat cards
```

---

### 2.3 Featured Categories Section

**Type:** Scroll-reveal stagger + 3D mouse-tracking tilt (desktop only)

#### Scroll-Triggered Stagger Reveal
```tsx
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

// On each card:
<motion.div
  variants={cardVariants}
  custom={index}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
/>
```

#### Mouse-Track 3D Tilt (Desktop Only)
```tsx
// Per card — tracks cursor position relative to card center
const [rotateX, setRotateX] = useState(0);
const [rotateY, setRotateY] = useState(0);

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (window.innerWidth < 1024) return; // Desktop only
  const rect = e.currentTarget.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = (e.clientX - centerX) / (rect.width / 2);
  const deltaY = (e.clientY - centerY) / (rect.height / 2);
  setRotateX(-deltaY * 6);  // Max 6deg tilt
  setRotateY(deltaX * 6);
};

const handleMouseLeave = () => {
  setRotateX(0);
  setRotateY(0);
};

<motion.div
  style={{
    rotateX,
    rotateY,
    transformStyle: "preserve-3d",
    perspective: 1000,
  }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
/>
```

#### Category Card Image Zoom on Hover
```tsx
// Image inside the card zooms independently
<motion.img
  whileHover={{ scale: 1.06 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
/>
```

---

### 2.4 Best Sellers / Product Grid Section

**Type:** Scroll-triggered cascade reveal

```tsx
// Section header text reveal
const headerVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Product cards stagger cascade
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

<motion.div
  variants={gridVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
  {products.map(product => (
    <motion.div key={product.id} variants={itemVariants}>
      <ProductCard product={product} />
    </motion.div>
  ))}
</motion.div>
```

---

### 2.5 Deals Banner Section

**Type:** Parallax price tags + scroll-reveal reveal + shimmer

```tsx
const bannerRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: bannerRef,
  offset: ["start end", "end start"]
});

// Left content slides in from left
const contentX = useTransform(scrollYProgress, [0, 0.4], [-60, 0]);
const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

// Floating price tag "₹59" — drift upward
const tag1Y = useTransform(scrollYProgress, [0, 1], ["20px", "-30px"]);
const tag1Rotate = useTransform(scrollYProgress, [0, 1], [-8, -2]);

// Floating price tag "₹89" — drift downward
const tag2Y = useTransform(scrollYProgress, [0, 1], ["-10px", "25px"]);
const tag2Rotate = useTransform(scrollYProgress, [0, 1], [5, 12]);

// Decorative ring shapes — counter-rotate
const ring1Rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
const ring2Rotate = useTransform(scrollYProgress, [0, 1], [0, -30]);
```

#### Shimmer Line (CSS Only)
```css
/* Animated gold shimmer sweep across "Under ₹99" headline */
.deals-headline::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(171, 140, 82, 0.3),
    transparent
  );
  animation: shimmer 3s infinite 2s;
}

@keyframes shimmer {
  0%   { left: -100%; }
  100% { left: 200%; }
}
```

---

### 2.6 About Page

**Type:** Scroll-reveal reveals + decorative shape parallax

```tsx
// Brand story text: word-by-word reveal
const wordVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 }
};

// Animated decorative circle — slow rotation
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
/>

// Pulsing shape
<motion.div
  animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
/>

// Values grid: 2×2 stagger
// Reveal from bottom with 120ms between each card
```

---

### 2.7 Footer

**Type:** Upward scroll-reveal + logo fade

```tsx
const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
  }
};
```

---

## 3. Micro-Interaction Parallax Effects

### 3.1 Product Card Hover (All Grids)
```tsx
<motion.div
  whileHover={{
    y: -4,
    transition: { duration: 0.25, ease: "easeOut" }
  }}
  whileTap={{ scale: 0.98 }}
>
  {/* Inner image zooms independently */}
  <motion.img
    whileHover={{ scale: 1.04 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  />
</motion.div>
```

### 3.2 Button Press Feedback
```tsx
// All primary and sale buttons
whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
whileHover={{ scale: 1.01 }}
```

### 3.3 Wishlist Heart Toggle
```tsx
// Fill animation: empty → filled red
const heartVariants = {
  unliked: { scale: 1, fill: "none" },
  liked: {
    scale: [1, 1.3, 1],
    fill: "#DC5656",
    transition: {
      scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
      fill: { duration: 0.15 }
    }
  }
};
```

### 3.4 Category Filter Tab Switch
```tsx
// Animated underline/background slides between tabs
// Using Framer Motion layoutId for shared element animation

<motion.div
  layoutId="activeTabBg"
  className="absolute inset-0 bg-brand-black"
  style={{ borderRadius: 0 }}
  transition={{ type: "spring", damping: 30, stiffness: 300 }}
/>
```

### 3.5 Cart Counter Badge
```tsx
// Bounces when item added to cart
<motion.span
  key={cartCount}  // re-mounts on change → triggers animation
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", damping: 10, stiffness: 300 }}
>
  {cartCount}
</motion.span>
```

### 3.6 OTP Input Auto-Advance
```tsx
// Each digit box: fills green → auto-advances focus
// Visual: border animates from #D1CDC4 → #212121 as each digit is entered
// On complete: all boxes flash gold (#AB8C52) for 400ms
const completedAnimation = {
  borderColor: ["#212121", "#AB8C52", "#212121"],
  transition: { duration: 0.4, times: [0, 0.5, 1] }
};
```

### 3.7 Add to Cart Success Animation
```tsx
// Brief: item "flies" toward cart icon (simplified: icon pulse)
// Cart icon in header: scale pulse on add
<motion.div
  animate={cartItemAdded ? { scale: [1, 1.3, 1] } : {}}
  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
/>
```

---

## 4. Scroll Progress Indicator

For long product pages and the checkout form, a subtle linear progress bar at the top:

```tsx
// Global scroll progress bar (under header)
const { scrollYProgress } = useScroll();

<motion.div
  className="scroll-progress-bar"
  style={{
    scaleX: scrollYProgress,
    transformOrigin: "left",
    background: "linear-gradient(90deg, #AB8C52, #FC5927)",
    height: "2px",
    position: "fixed",
    top: "64px", // Below header
    left: 0,
    right: 0,
    zIndex: 49,
  }}
/>
```

---

## 5. Mobile Parallax Adaptation

On mobile, parallax effects are **reduced but not removed** — the goal is a premium feel without battery drain or jank.

| Effect | Desktop | Mobile |
|---|---|---|
| Hero background parallax | Full depth (40% drift) | Reduced (15% drift) |
| Floating badge cards | Full float + drift | Static position (no scroll drift) |
| Category card 3D tilt | Enabled on mouse move | Disabled entirely |
| Product grid stagger | 80ms delay between cards | 40ms delay (faster, less intrusive) |
| Scroll progress bar | Visible | Hidden |
| Deals banner price tags | Full drift | Subtle (8px range) |
| Section reveals | Full (40px y travel) | Reduced (20px y travel) |

```tsx
// Detection hook
const { isMobile } = useMobile(); // existing hook in codebase

const parallaxY = isMobile
  ? useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  : useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
```

---

## 6. Section Transition System

Between sections, use **crossfade overlap** — sections don't hard-cut, they breathe into each other.

```css
/* Each section has a bottom fade into the next */
.section-hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent, #FAF7F2);
  pointer-events: none;
}
```

And via scroll:
```tsx
// Section opacity fades as the next section scrolls into view
const sectionOpacity = useTransform(
  scrollYProgress,
  [0.85, 1],
  [1, 0]
);
```

---

## 7. Implementation Checklist

### Pre-Development
- [ ] Install Framer Motion 12: `npm install framer-motion`
- [ ] Add `will-change: transform` to all animated elements
- [ ] Set up `useReducedMotion()` global wrapper
- [ ] Configure `useScroll` with section refs, not window (for precision)

### Hero Section
- [ ] Background image parallax (`useTransform` on `scrollYProgress`)
- [ ] Text layer drift (`y: 0% → 20%`)
- [ ] Badge cards float animation loop
- [ ] Badge cards scroll drift (diverging directions)
- [ ] Scroll indicator bounce + fade
- [ ] Stat cards stagger entrance on load

### Homepage Sections
- [ ] Category cards: scroll-reveal stagger cascade
- [ ] Category cards: 3D mouse-tilt (desktop only)
- [ ] Product grid: `staggerChildren` 70ms cascade
- [ ] Deals banner: price tag drift + content slide
- [ ] Deals banner: shimmer CSS animation on headline

### Global Interactions
- [ ] Product card hover: lift + image zoom
- [ ] Button press: `whileTap` scale
- [ ] Wishlist heart: spring scale + fill transition
- [ ] Category filter: `layoutId` animated tab indicator
- [ ] Cart badge: re-mount spring bounce on count change
- [ ] Scroll progress bar (top of viewport, under header)

### Mobile Optimisation
- [ ] Reduce parallax magnitudes by 60% on mobile
- [ ] Disable 3D mouse-tilt on < 1024px
- [ ] Reduce stagger delay on mobile (40ms vs 80ms)
- [ ] Hide scroll progress bar on mobile

### Testing
- [ ] Test at 60fps: Chrome DevTools → Performance → record scroll
- [ ] Verify `prefers-reduced-motion` disables all transforms
- [ ] Test on mid-range Android device (real device, not simulator)
- [ ] Check no layout shift (CLS) from parallax initial positions
- [ ] Verify `once: true` on all `whileInView` — no re-animation on scroll up
