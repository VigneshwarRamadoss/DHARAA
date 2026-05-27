# DHARAA — UI/UX Design Brief
## Premium Jewelry E-Commerce Experience
**Version:** 2.0 | **Date:** May 2026 | **Classification:** Production Blueprint

---

## 0. Design Philosophy

DHARAA is not a marketplace. It is a **destination**. Every pixel must communicate one truth: *handcrafted jewelry, thoughtfully presented.* The design philosophy draws from the Rocksbox playbook — editorial warmth, generous breathing room, and restrained luxury — while speaking directly to Indian women who want beauty without pretension and quality without inflated price tags.

The aesthetic: **warm minimalism with editorial confidence.**

---

## 1. Brand Identity System

### 1.1 Brand Positioning
- **Name:** DHARAA (Sanskrit: "Earth" / "Flow")
- **Tagline:** Everyday Accessories, Thoughtfully Crafted
- **Tone of Voice:** Warm, confident, intimate. Not corporate. Not over-designed. Feels like a friend who has incredible taste.
- **Emotional Promise:** "I deserve beautiful things that fit my real life."

### 1.2 Visual Personality
- Luxurious but accessible
- Earthy, warm, never cold or clinical
- Feminine without being girlish
- Handcrafted without looking rustic

---

## 2. Color System

### 2.1 Primary Palette

| Token | Hex | Role |
|---|---|---|
| Brand Black | `#212121` | Primary text, headings, nav, structural elements — dominant |
| Accent Gold | `#AB8C52` | Premium tags, category badges, fine jewelry indicators |
| Pure White | `#FFFFFF` | Page background, card surfaces, text on dark |

### 2.2 Accent Palette

| Token | Hex | Role |
|---|---|---|
| Sale Orange | `#FC5927` | CTAs, promotional banners, sale indicators — use sparingly |
| Rose Mauve | `#E39B9B` | Secondary accents, featured collection highlights |
| Deep Red | `#DC5656` | Alerts, wishlist active state, emphasis |

### 2.3 Neutral Scale

| Token | Hex | Role |
|---|---|---|
| Cream Soft | `#FCFBF9` | Section backgrounds, subtle surface differentiation |
| Warm Off-White | `#FAF7F2` | Secondary backgrounds, dividers |
| Natural Beige | `#F3ECE0` | Footer region, tertiary backgrounds |
| Slate Gray | `#708090` | Secondary text, metadata, price labels |
| Neutral Warm | `#A49C8B` | Captions, placeholders, disabled states |
| Warm Border | `#D1CDC4` | Input borders, card dividers, structural edges |

### 2.4 Semantic Colors

| State | Color | Usage |
|---|---|---|
| Success | `#AB8C52` (gold) | Order confirmed, verified status |
| Warning | `#FC5927` (orange) | Low stock, limited-time offer |
| Error | `#DC5656` (deep red) | Form validation errors |
| Info | `#E39B9B` (rose) | Featured collection highlights |

### 2.5 Usage Rules
- **Never** introduce colors outside this palette
- `#FC5927` orange is **reserved** for time-sensitive, sale, or promotional contexts only
- `#AB8C52` gold signals premium — use for badges and category identifiers
- Background surfaces must always use warm neutrals, never cool grays
- Maintain minimum **4.5:1 contrast ratio** (WCAG AA) at all times

---

## 3. Typography System

### 3.1 Font Stack

| Font | Role | Fallback |
|---|---|---|
| **Superior Title** (serif) | Display headlines, section titles, editorial content | `Georgia, serif` |
| **TTCommonsPro** (sans-serif) | Body copy, navigation, buttons, metadata, forms | `-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif` |

### 3.2 Type Scale

| Role | Font | Size | Weight | Line Height | Usage |
|---|---|---|---|---|---|
| Display / Hero | Superior Title | 51.75px | 300 | 62.1px | Hero headline, campaign messaging |
| H1 | Superior Title | 48px | 300 | 57.6px | Page-level section titles |
| H2 | Superior Title | 36px | 300 | 43.2px | Subsections, collection names |
| H3 | TTCommonsPro | 16px | 400 | 16px | Card titles, product names |
| Body Large | TTCommonsPro | 16px | 400 | 19.2px | Primary body copy, product descriptions |
| Body | TTCommonsPro | 14px | 400 | 16.8px | Standard text, footer links |
| Caption | TTCommonsPro | 11px | 400 | 13.2px | Metadata, badges, nav labels |
| XSmall | TTCommonsPro | 10px | 400 | 12px | Price metadata, fine print |

### 3.3 Typography Rules
- Serif **only** for headings 24px and above
- Body copy **always** in TTCommonsPro
- Headline weight is always **300** (light) — conveys editorial refinement
- Body weight is always **400** — never bold in descriptive copy
- All typography aligns to **4px baseline grid**
- Never mix serif and sans-serif at the same size in a text block

---

## 4. Component Design Specifications

### 4.1 Buttons

#### Primary CTA Button
```
Background:    #FFFFFF
Text:          #212121
Border:        2px solid #212121
Padding:       16px 32px
Border Radius: 0px (sharp corners, always)
Font:          TTCommonsPro, 11px, weight 700, uppercase
Min Height:    44px (touch target compliance)
─────────────────────────────────────────────
Hover:         Background #212121, Text #FFFFFF
Active:        Box Shadow inset 0 2px 4px rgba(0,0,0,0.2)
```

#### Sale / Promotional CTA Button
```
Background:    #FC5927
Text:          #FFFFFF
Border:        0px
Padding:       16px 32px
Border Radius: 0px
Font:          TTCommonsPro, 11px, weight 700, uppercase
Min Height:    44px
─────────────────────────────────────────────
Hover:         Background #E84E1F, Box Shadow 0 4px 8px rgba(252,89,39,0.3)
```

#### Secondary / Filter Button
```
Background:    transparent
Text:          #212121
Border:        1px solid #D1CDC4
Padding:       12px 20px
Border Radius: 0px
Font:          TTCommonsPro, 11px, weight 400
─────────────────────────────────────────────
Hover:         Border 1px solid #212121, Background #FCFBF9
Active:        Border 2px solid #212121
```

#### Ghost / Link Button
```
Background:    transparent
Text:          #AB8C52 or #FC5927
Border:        0px
Padding:       8px 0px
Font:          TTCommonsPro, 11px, weight 400
─────────────────────────────────────────────
Hover:         Text underline 1px solid, color darkens 10%
```

#### Badge (Category / Status Tag)
```
Background:    #AB8C52
Text:          #FFFFFF
Padding:       6px 12px
Border Radius: 0px
Font:          TTCommonsPro, 10px, weight 700, uppercase
Letter Spacing: 0.05em
No hover state (static label)
```

---

### 4.2 Product Card

```
┌─────────────────────────────┐
│                             │  ← Full-width 1:1 image
│         [IMAGE]             │     object-fit: cover
│                             │     loading="lazy"
│                    [♡]      │  ← Wishlist toggle, top-right
├─────────────────────────────┤
│ Product Name                │  ← TTCommonsPro 14px weight 400 #212121
│ Category Badge              │  ← Gold badge 10px
│ ₹ 149                       │  ← TTCommonsPro 11px weight 400 #708090
│ [Add to Cart]               │  ← Ghost button, appears on hover
└─────────────────────────────┘

Card Container:
  Background:    #FFFFFF
  Border:        1px solid #F3ECE0
  Border Radius: 0px
  Box Shadow:    none (flat by default)
  Padding:       0px (image flush to edge)
  Text Padding:  16px

Hover State:
  transform: scale(1.02)
  transition: 0.2s ease
  Box Shadow: 0px 2px 4px rgba(0,0,0,0.05)
```

### 4.3 Category Filter Pills
```
Default:
  Background:    transparent
  Text:          #212121
  Border:        1px solid #D1CDC4
  Padding:       12px 24px
  Border Radius: 0px
  Font:          TTCommonsPro 11px weight 400

Active:
  Background:    #212121
  Text:          #FFFFFF
  Border:        1px solid #212121

Hover (non-active):
  Background:    #FCFBF9
  Border:        1px solid #212121
```

### 4.4 Form Inputs
```
Default:
  Background:    #FFFFFF
  Border:        1px solid #D1CDC4
  Padding:       12px 16px
  Border Radius: 0px
  Font:          TTCommonsPro 14px weight 400 #212121
  Placeholder:   #A49C8B

Focus:
  Border:        2px solid #212121
  Outline:       none
  Box Shadow:    0 0 0 3px rgba(33,33,33,0.08)

Error:
  Border:        2px solid #DC5656
  
Textarea:
  Min Height:    100px
  Resize:        vertical
```

### 4.5 Drawer (Cart / Wishlist)
```
Container:
  Width:         420px (desktop) / 100vw (mobile)
  Background:    #FFFFFF
  Box Shadow:    -8px 0 24px rgba(0,0,0,0.12)
  
Overlay:
  Background:    rgba(0,0,0,0.4)
  Backdrop-blur: 2px

Entry Animation:
  x: 100% → 0
  Duration: 300ms
  Easing:   spring (damping: 25, stiffness: 200)
```

### 4.6 Header
```
Height:            64px (mobile) / 80px (desktop)
Position:          fixed, top 0, full width
z-index:           50

Default:
  Background:    rgba(255,255,255,0.95)
  Border-bottom: 1px solid #F3ECE0

Scrolled:
  Backdrop-filter: blur(12px)
  Box Shadow:    0px 4px 8px rgba(0,0,0,0.06)

Logo:
  Font: Superior Title 24px weight 300 #212121
  Letter-spacing: 0.15em

Nav Links:
  Font: TTCommonsPro 11px weight 400 uppercase #212121
  Letter-spacing: 0.08em
  Hover: color #FC5927
  Active: color #FC5927
```

---

## 5. Layout & Spacing System

### 5.1 Container
```
Max Width:     1400px
Auto-centered: margin 0 auto

Desktop (1200px+):  padding 0 80px
Tablet (768–1199px): padding 0 40px
Mobile (<768px):    padding 0 20px
```

### 5.2 Grid System
```
Product Grid:
  Desktop:  4 columns, 20px gap
  Tablet:   2–3 columns, 16px gap
  Mobile:   2 columns, 12px gap

Category Cards:
  Desktop:  4 columns equal width
  Tablet:   2 columns
  Mobile:   1 column full width

Checkout:
  Desktop:  2 columns: form (60%) / sidebar (40%)
  Mobile:   1 column, sidebar below form
```

### 5.3 Spacing Scale
```
Section vertical spacing:  60px (desktop) / 40px (tablet) / 32px (mobile)
Card internal padding:     16px
Grid gap (products):       20px (desktop) / 12px (mobile)
Between sections:          52px–60px
Nav item spacing:          20px horizontal
Input field spacing:       16px vertical between fields
```

### 5.4 Whitespace Philosophy
Whitespace is the primary luxury signal. Every layout decision should ask: "Does this element have room to breathe?" Product photography must never feel crowded. A section with generous vertical padding communicates value; a cramped section feels cheap.

---

## 6. Iconography

- **Library:** Lucide React
- **Default Size:** 20px (desktop) / 18px (mobile)
- **Stroke Width:** 1.5px (refined, not heavy)
- **Color:** Inherits text color (`currentColor`)
- **Touch Targets:** All icon buttons minimum 44×44px

Key icons:
- `Search` → search modal trigger
- `Heart` → wishlist (filled: `#DC5656`, empty: `#212121`)
- `ShoppingBag` → cart icon
- `Menu` → mobile hamburger
- `X` → close drawers/modals
- `ChevronLeft/Right` → image gallery navigation
- `Plus / Minus` → quantity controls
- `Check` → payment selection indicator

---

## 7. Animation & Motion Design

### 7.1 Motion Principles
- Animations serve **purpose**, not decoration
- Duration: 150–400ms for UI responses; 600–900ms for page-level reveals
- Never animate more than 2 properties simultaneously on mobile
- `prefers-reduced-motion` must be respected: wrap all Framer Motion in a check

### 7.2 Animation Library
All animations implemented via **Framer Motion 12**

### 7.3 Standard Patterns

| Pattern | Config | Usage |
|---|---|---|
| Page section reveal | `initial: {opacity:0, y:30} → animate: {opacity:1, y:0}` | Every section on homepage |
| Scroll-triggered | `whileInView + viewport: {once:true}` | Product grids, category cards |
| Staggered grid | `transition: {delay: index * 0.08}` | Product card cascades |
| Card hover lift | `whileHover: {scale:1.02, y:-2}` | Product cards |
| Button press | `whileTap: {scale:0.97}` | All clickable buttons |
| Float animation | `animate: {y:[0,-8,0], repeat:Infinity, duration:3}` | Hero decorative elements |
| Drawer slide | `x: "100%" → 0, spring: {damping:25, stiffness:200}` | Cart / wishlist drawers |
| Modal fade | `opacity: 0→1, scale: 0.97→1, duration:200ms` | Search modal overlay |
| PreLoader exit | `opacity: 1→0, duration:600ms, delay:1500ms` | App first load |
| Hero text reveal | `y:40→0, opacity:0→1, stagger each word` | Hero headline |

### 7.4 Parallax Zones (see Parallax.md for full spec)
- Hero background image: `y: [0%, 30%]` on scroll
- Floating badge cards in hero: offset scroll speed
- Category cards: subtle depth shift on mouse move (desktop only)

---

## 8. Page-by-Page Design Specifications

### 8.1 Homepage Hero

```
Layout:         Full viewport (100vh)
Background:     High-quality product photography, full bleed
Overlay:        Linear gradient rgba(0,0,0,0.2) → rgba(0,0,0,0.5)
Content:        Center-left aligned on desktop, centered on mobile

Elements:
  Pre-headline: "New Collection 2026" — TTCommonsPro 11px gold badge
  Headline:     "Everyday Accessories,\nThoughtfully Crafted"
                Superior Title 51.75px weight 300 #FFFFFF
  Subline:      TTCommonsPro 16px weight 400 #FFFFFF opacity 0.85
  CTAs:         Primary (white/black) + Ghost (white outline)
  
  Stats row:    3 floating stat cards
    "5000+ Customers" | "500+ Products" | "4.9 ★ Rating"
    Background: rgba(255,255,255,0.12), backdrop-blur, sharp corners
    
  Floating badges: Absolute positioned
    "Premium Quality 💎" → top-right area
    "Fast Delivery 🚚"   → bottom-left area
    Animation: gentle float loop

Scroll Indicator:
  Animated chevron-down
  Position: bottom center
  Animation: bounce loop
```

### 8.2 Featured Categories Section

```
Layout:         4-column grid (desktop), 2×2 (tablet), 1-column (mobile)
Background:     #FAF7F2

Each Card:
  Aspect Ratio: 4:3
  Image:        Category photography, full bleed
  Overlay:      Gradient dark bottom third
  Icon:         40px emoji or SVG, centered
  Title:        Superior Title 24px weight 300 #212121
  Description:  TTCommonsPro 14px #708090
  
Hover:
  Card lifts: translateY(-4px)
  Box Shadow: 0px 8px 16px rgba(0,0,0,0.1)
  Transition: 300ms ease
```

### 8.3 Product Grid (Shop / Homepage)

```
Section Header:
  Title:       Superior Title 36px weight 300 #212121
  Subtitle:    TTCommonsPro 14px #708090
  Alignment:   Left-aligned (editorial style, not centered)

Category Filters:
  Layout:      Horizontal scrollable row (mobile), flex wrap (desktop)
  Height:      48px touch targets on mobile
  
Grid:
  Desktop:     4 columns, 20px gap
  Tablet:      3 columns, 16px gap
  Mobile:      2 columns, 12px gap
  
Empty State:
  Illustration: Subtle gold ring icon
  Copy:         "No pieces found in this collection yet."
  CTA:          "View All" → resets to 'all' category
```

### 8.4 Deals Banner

```
Layout:         Full-width, min-height 320px
Background:     #212121 (dark, high contrast)
Accent:         #FC5927 floating price tags

Left side:
  Badge:        "LIMITED TIME" gold badge
  Headline:     Superior Title 48px weight 300 #FFFFFF
                "Under ₹99 Deals"
  Sub:          TTCommonsPro 16px rgba(255,255,255,0.7)
  CTA:          Sale orange button

Right side:
  Floating price tags: "₹59" and "₹89"
  Animation: gentle float + rotation
  Background: rgba(252,89,39,0.15) ring shapes
```

### 8.5 Checkout Page

```
Layout:         2-column desktop (form 60% / sidebar 40%)
                1-column mobile (stacked)
Background:     #FAF7F2

Form Sections:
  Each section has:
    - Section number badge (gold, 1/2/3)
    - Section title: Superior Title 24px
    - Divider line: 1px #D1CDC4
    
  OTP Input:
    - 4 individual input boxes (not continuous)
    - Size: 56px × 64px each
    - Active: border 2px solid #212121
    - Filled: background #FAF7F2
    
Payment Cards:
  Width:        48% each (desktop), 100% stacked (mobile)
  Border:       2px solid transparent
  Selected:     Border 2px solid #212121, background #FCFBF9
  Checkmark:    #212121, top-right corner

Sidebar:
  Position:     sticky top 24px
  Background:   #FFFFFF
  Border:       1px solid #F3ECE0
  Padding:      24px
  
  Line items:
    Thumbnail:  48×48px, 1:1, object-fit cover
    Name:       TTCommonsPro 14px #212121
    Qty:        TTCommonsPro 11px #708090
    Price:      TTCommonsPro 14px weight 600 #212121 (right-aligned)
```

---

## 9. Mobile-First Design Rules

### 9.1 Breakpoints
```
Mobile:  < 768px  → 1-2 column, 20px padding, hamburger nav
Tablet:  768–1199px → 2-3 column, 40px padding, condensed nav
Desktop: 1200–1399px → 4 column, 60–80px padding, full nav
Wide:    1400px+ → max 1400px container, centered
```

### 9.2 Mobile-Specific Rules
- All touch targets minimum **44×44px**
- Spacing between interactive elements minimum **8px**
- Category filter row: horizontal scroll with `-webkit-overflow-scrolling: touch`
- Product grid: 2 columns on mobile (not 1 — keeps the grid feel, reduces scroll)
- Hero headline: reduce to 32px on mobile (20% reduction)
- Drawers: full-width on mobile (`100vw`)
- Floating hero badges: hide on mobile (simplify visual hierarchy)
- Checkout sidebar: moves below form on mobile

---

## 10. Accessibility Standards

| Standard | Requirement | Implementation |
|---|---|---|
| Color Contrast | 4.5:1 minimum (AA) | Brand Black on warm neutrals passes |
| Touch Targets | 44×44px minimum | All buttons, icons enforced |
| Focus States | Visible, `2px solid #212121` | All interactive elements |
| Keyboard Nav | Full tab order | Escape closes modals/drawers |
| Screen Reader | Semantic HTML | `<main>`, `<nav>`, `<footer>`, `<section>` |
| Image Alt Text | Descriptive | All product images require alt |
| Form Labels | Linked via `htmlFor` | All inputs labeled |
| Error Messages | Inline, visible | Below each invalid field |
| ARIA | Drawers, modals | `aria-modal`, `aria-label` on icon buttons |
| Motion | Respect `prefers-reduced-motion` | Framer Motion config wrapper |

---

## 11. Design Do's and Don'ts

### Do
- Use `#212121` as default text — no exceptions for readability
- Apply sharp corners (`0px`) everywhere — it's the brand's geometric signature
- Maintain `60px` vertical section spacing — breathing room = perceived luxury
- Use warm neutrals for all backgrounds — never cool grays
- Gold badge on premium / category items — consistent signal of quality
- Serif only for headlines ≥ 24px — maintain the editorial split
- Product photography as the hero — UI supports it, never competes

### Don't
- Don't use `#FC5927` orange outside sale/promo contexts
- Don't round button or card corners — no border-radius on primary elements
- Don't center-align body copy — left-aligned text is more editorial
- Don't add drop shadows to product cards by default — flat is the rule
- Don't use bold weight in headline type — weight 300 is the luxury signal
- Don't introduce new colors — palette is complete
- Don't stack more than 2 CTAs side-by-side on mobile
- Don't reduce padding below `12px` on any interactive element
