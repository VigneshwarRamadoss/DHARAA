# Design System Inspired by Rocksbox

## 1. Visual Theme & Atmosphere

Rocksbox embodies luxurious minimalism with warm sophistication. The design celebrates fine jewelry through clean, uncluttered layouts that let curated products shine. The aesthetic blends editorial elegance with accessible, approachable luxury—using neutral warm tones as a canvas for precious materials and designer collaborations. Typography emphasizes grace through refined serif headers paired with modern geometric sans-serif body text. The overall mood is confident, aspirational, yet intimate, inviting self-expression through carefully curated jewelry pieces.

**Key Characteristics**
- Warm neutral palette with earthy undertones
- Generous whitespace promoting product focus
- Serif-driven headlines creating editorial sophistication
- Minimal color accent for sale/urgency callouts
- High-quality photography as primary visual language
- Border-less, edge-to-edge component design
- Accessible luxury positioning through restrained elegance

## 2. Color Palette & Roles

### Primary
- **Brand Black** (`#212121`): Primary text, navigation, headings, and structural elements; dominant color across interface
- **Accent Gold** (`#AB8C52`): Category badges, premium/fine jewelry indicators, luxury touches

### Accent Colors
- **Sale Orange** (`#FC5927`): Call-to-action for promotional content, sale indicators, limited-time offers
- **Rose Mauve** (`#E39B9B`): Secondary accent for featured collections, gentle highlighting
- **Deep Red** (`#DC5656`): Alternative alert and emphasis, product availability status

### Interactive
- **Primary Button** (`#212121`): Default button text and borders
- **Sale Button** (`#FC5927`): Primary CTA buttons, "Shop Now," conversion actions
- **Gold Interactive** (`#AB8C52`): Category filters, premium product tags

### Neutral Scale
- **Pure White** (`#FFFFFF`): Background, card surfaces, text contrast
- **Cream Soft** (`#FCFBF9`): Subtle background sections, container fills
- **Warm Off-White** (`#FAF7F2`): Secondary background layers, subsection dividers
- **Light Gray** (`#FAFAFA`): Border and divider lines, minimal contrast backgrounds
- **Natural Beige** (`#F3ECE0`): Footer regions, tertiary backgrounds
- **Stone Gray** (`#F7F7F7`): Alternative neutral surface
- **Slate Gray** (`#708090`): Secondary text, muted metadata
- **Neutral Warm** (`#A49C8B`): Tertiary text, captions, disabled states

### Surface & Borders
- **Warm Border** (`#D1CDC4`): Input borders, divider lines, subtle structural edges
- **Off-White Surface** (`#FCFBF9`): Card and container backgrounds
- **White Canvas** (`#FFFFFF`): Primary content surface

### Semantic / Status
- **Success** (`#AB8C52`): Confirmation, verified product status
- **Warning/Attention** (`#FC5927`): Sales, limited inventory, promotional alerts
- **Informational** (`#E39B9B`): Featured collections, secondary highlights

## 3. Typography Rules

### Font Family
**Primary**: Superior Title (serif) — elegant headlines and editorial content; fallback: `Georgia, serif`

**Secondary**: TTCommonsPro (sans-serif) — body copy, interface text, navigation; fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / Hero | Superior Title | 51.75px | 300 | 62.1px | normal | Main page headlines, campaign messaging |
| Heading 1 | Superior Title | 48px | 300 | 57.6px | normal | Section titles, primary content headers |
| Heading 2 | Superior Title | 36px | 300 | 43.2px | normal | Subsection headers, collection names |
| Heading 3 | TTCommonsPro | 16px | 400 | 16px | normal | Card titles, product names |
| Body Large | TTCommonsPro | 16px | 400 | 19.2px | normal | Primary body copy, product descriptions |
| Body | TTCommonsPro | 14px | 400 | 16.8px | normal | Standard text, collection descriptions |
| Small / Caption | TTCommonsPro | 11px | 400 | 13.2px | normal | Metadata, badges, fine print |
| Extra Small | TTCommonsPro | 10px | 400 | 12px | normal | Navigation labels, utility text |
| Code / Monospace | TTCommonsPro | 12px | 400 | 14.4px | normal | Product codes, technical content |

### Principles
- Serif headlines convey editorial luxury and timelessness
- Weight 300 on display creates refined, sophisticated air
- Body text in sans-serif ensures digital readability
- Tight line heights on headings promote compactness and elegance
- Consistent base size (11px) for UI elements maintains visual rhythm
- All typography aligns to 4px baseline grid for precision

## 4. Component Stylings

### Buttons

**Primary Button (CTA / Shop Now)**
- Background: `#FFFFFF`
- Text Color: `#212121`
- Border: `2px solid #212121`
- Padding: `16px 32px`
- Border Radius: `0px`
- Font: TTCommonsPro, 11px, weight 700
- Line Height: `13.2px`
- Hover State: Background `#212121`, Text `#FFFFFF`, Border `2px solid #212121`
- Active State: Box Shadow `inset 0 2px 4px rgba(0, 0, 0, 0.2)`

**Secondary Button (Filtered Navigation)**
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Text Color: `#212121`
- Border: `1px solid #D1CDC4`
- Padding: `12px 20px`
- Border Radius: `0px`
- Font: TTCommonsPro, 11px, weight 400
- Line Height: `13.2px`
- Hover State: Border `1px solid #212121`, Background `#FCFBF9`

**Ghost Button (Links / Tertiary Actions)**
- Background: `rgba(0, 0, 0, 0)`
- Text Color: `#AB8C52` or `#FC5927`
- Border: `0px`
- Padding: `8px 0px`
- Border Radius: `0px`
- Font: TTCommonsPro, 11px, weight 400
- Line Height: `13.2px`
- Hover State: Text Color darkened, Underline `1px solid`
- Text Decoration: Underline on hover

**Badge (Category / Fine Tag)**
- Background: `#AB8C52`
- Text Color: `#FFFFFF`
- Border: `0px`
- Padding: `6px 12px`
- Border Radius: `0px`
- Font: TTCommonsPro, 10px, weight 700
- Line Height: `12px`
- No hover state (static label)

**Sale Button (Promotional)**
- Background: `#FC5927`
- Text Color: `#FFFFFF`
- Border: `0px`
- Padding: `16px 32px`
- Border Radius: `0px`
- Font: TTCommonsPro, 11px, weight 700
- Line Height: `13.2px`
- Hover State: Background `#E84E1F`, Box Shadow `0 4px 8px rgba(252, 89, 39, 0.3)`

### Cards & Containers

**Product Card**
- Background: `#FFFFFF`
- Border: `1px solid #F3ECE0`
- Padding: `0px`
- Border Radius: `0px`
- Box Shadow: `none`
- Image Area: Full width, aspect ratio 1:1
- Text Area Padding: `16px`
- Title Font: TTCommonsPro, 14px, weight 400, Color `#212121`
- Price Font: TTCommonsPro, 11px, weight 400, Color `#708090`
- Hover State: Slight scale `transform: scale(1.02)`, transition `0.2s ease`

**Collection Card**
- Background: Linear gradient `rgba(255, 255, 255, 0) to rgba(240, 240, 240, 0.5)`
- Border: `0px`
- Padding: `20px`
- Border Radius: `0px`
- Text Color: `#212121`
- Heading Font: Superior Title, 24px, weight 300
- Description Font: TTCommonsPro, 14px, weight 400, Color `#708090`

**Section Container**
- Background: `#FCFBF9` or `#FFFFFF`
- Padding: `60px 20px` (mobile) to `60px 80px` (desktop)
- Border: `0px`
- Border Radius: `0px`
- Max Width: `1400px`
- Margin: `0 auto`

### Inputs & Forms

**Text Input**
- Background: `rgba(255, 255, 255, 0)` (transparent)
- Border: `1px solid #D1CDC4`
- Padding: `16px`
- Border Radius: `0px`
- Font: TTCommonsPro, 12px, weight 400
- Text Color: `#212121`
- Line Height: `16.8px`
- Focus State: Border `2px solid #212121`, Box Shadow `0 0 0 2px rgba(33, 33, 33, 0.1)`
- Placeholder Color: `#A49C8B`

**Search Input**
- Background: `#FFFFFF`
- Border: `1px solid #D1CDC4`
- Padding: `12px 16px`
- Border Radius: `0px`
- Font: TTCommonsPro, 14px, weight 400
- Icon Color: `#708090`
- Hover State: Border `1px solid #212121`
- Focus State: Border `2px solid #212121`, Outline `none`

**Textarea**
- Background: `rgba(255, 255, 255, 0)`
- Border: `1px solid #D1CDC4`
- Padding: `16px`
- Border Radius: `0px`
- Font: TTCommonsPro, 12px, weight 400, line-height `16.8px`
- Min Height: `100px`
- Resize: `vertical`
- Focus State: Border `2px solid #212121`

### Navigation

**Header Navigation**
- Background: `#FFFFFF`
- Height: `80px`
- Padding: `20px 32px`
- Border: `none`
- Logo Font: TTCommonsPro, 16px, weight 700, Color `#212121`
- Nav Link Font: TTCommonsPro, 11px, weight 400, Color `#212121`
- Link Hover: Color `#FC5927`, Text Decoration `underline`
- Active Link: Color `#FC5927`, Text Decoration `underline`, Font Weight `600`

**Mobile Navigation Menu**
- Background: `#FFFFFF`
- Width: `100%`
- Slide-in animation from left: `transform translate(-100%, 0) to translate(0, 0)`
- Link Padding: `16px 20px`
- Link Font: TTCommonsPro, 14px, weight 400
- Divider: `1px solid #F7F7F7`
- Overlay: Backdrop blur or `rgba(0, 0, 0, 0.5)`

**Footer Navigation**
- Background: `#F3ECE0` or `#FCFBF9`
- Padding: `60px 20px`
- Column Layout: 3–5 columns on desktop, stacked on mobile
- Heading Font: TTCommonsPro, 12px, weight 700, Color `#212121`
- Link Font: TTCommonsPro, 11px, weight 400, Color `#708090`
- Link Hover: Color `#212121`

### Tabs

**Tab Navigation**
- Background: `#FFFFFF`
- Border Bottom: `2px solid #F7F7F7`
- Tab Padding: `16px 24px`
- Tab Font: TTCommonsPro, 12px, weight 400
- Tab Text Color: `#708090`
- Active Tab: Text Color `#212121`, Border Bottom `2px solid #212121`
- Hover State: Text Color `#212121`, Background `#FCFBF9`

### Badges & Labels

**Category Badge**
- Background: `#AB8C52`
- Text Color: `#FFFFFF`
- Font: TTCommonsPro, 9px, weight 700, text-transform `uppercase`
- Padding: `4px 8px`
- Border Radius: `0px`

**Sale Badge**
- Background: `#FC5927`
- Text Color: `#FFFFFF`
- Font: TTCommonsPro, 10px, weight 700
- Padding: `6px 10px`
- Border Radius: `0px`

## 5. Layout Principles

### Spacing System

**Base Unit**: 4px

**Scale**:
- `4px` — Micro spacing between inline elements
- `8px` — Small gaps between components
- `12px` — Compact spacing, button padding height
- `16px` — Standard padding, card inner spacing
- `20px` — Section margins, default gap
- `32px` — Container padding on tablet
- `52px` — Generous spacing between major sections
- `60px` — Section padding (top/bottom on desktop)
- `80px` — Max padding on extra-wide layouts

**Usage Context**:
- Buttons: `16px` horizontal padding, `12px` vertical
- Cards: `16px` internal padding
- Sections: `60px` vertical, `32px–80px` horizontal
- Gaps (grid): `20px` between columns
- Margins: `20px–52px` between distinct sections

### Grid & Container

**Max Width**: `1400px`

**Column Strategy**:
- Desktop (1200px+): 4–6 column flexible grid
- Tablet (768px–1199px): 2–3 column grid
- Mobile (<768px): Single column, full width with `20px` margin

**Container Padding**:
- Desktop: `0px 80px` (sides), `60px` (top/bottom)
- Tablet: `0px 40px` (sides), `40px` (top/bottom)
- Mobile: `0px 20px` (sides), `20px` (top/bottom)

**Section Patterns**:
- Hero: Full-width image background, centered text overlay
- Product Grid: Uniform card layout with `20px` gap
- Text + Image: 50/50 split on desktop, stacked on mobile
- Feature Rows: Alternating left/right alignment

### Whitespace Philosophy

Generous whitespace is central to Rocksbox's luxury positioning. Layouts favor breathing room over density—sections are separated by substantial vertical gaps (`52px–60px`), allowing products and content to stand alone. Card interiors maintain consistent `16px` padding. Text content pairs with ample margins above and below (`20px` minimum). This creates an editorial, high-end feel where each element has visual weight and hierarchy through space rather than clutter.

### Border Radius Scale

- `0px` — All buttons, inputs, cards, badges (sharp, modern aesthetic)
- Rounded variants (if needed): `4px` for subtle softness, `8px` for secondary components
- No border radius on primary UI elements (maintains refined, geometric minimalism)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Base (0) | No shadow | Cards on neutral backgrounds, flat UI elements |
| Raised (1) | `0px 2px 4px rgba(0, 0, 0, 0.05)` | Product cards on hover, subtle lift |
| Elevated (2) | `0px 4px 8px rgba(0, 0, 0, 0.1)` | Modals, dropdowns, floating elements |
| High (3) | `0px 8px 16px rgba(0, 0, 0, 0.15)` | Full-page overlays, navigation menus |
| Top (4) | `0px 12px 24px rgba(0, 0, 0, 0.2)` | Sticky headers on scroll, toast notifications |

**Shadow Philosophy**

Rocksbox employs minimal, refined shadows to create subtle depth without heaviness. Shadows use low opacity (5%–20%) and soft blur radii to suggest gentle elevation rather than dramatic layering. This aligns with the luxury aesthetic—shadows hint at 3D space without dominance. Most components remain flat; shadows appear only on interactive hover states, modals, and floating UI elements. This restraint maintains visual clarity and editorial focus on product photography.

## 7. Do's and Don'ts

### Do
- Use `#212121` as the default text color for maximum readability and brand consistency
- Apply sharp corners (`border-radius: 0px`) to all primary buttons, inputs, and cards for geometric refinement
- Maintain `60px` vertical spacing between major sections for breathing room
- Leverage the warm neutral palette (`#FCFBF9`, `#FAF7F2`) for subtle background differentiation
- Use `#AB8C52` gold accent for premium/"Fine" jewelry tags and category highlights
- Reserve `#FC5927` orange exclusively for time-sensitive CTAs, sales, and promotional alerts
- Implement TTCommonsPro for all body copy and interface text for accessibility and consistency
- Use Superior Title serif font only for headlines and editorial content above 24px
- Ensure hover states on buttons include color inversion or border strengthening for clear interactivity
- Test all form inputs with focus states showing `2px solid #212121` border

### Don't
- Mix serif and sans-serif fonts at body-copy sizes; maintain strict role separation
- Apply borders or shadows to regular card components; save depth for interactive states
- Use rounded corners on primary buttons or form inputs; maintain the sharp, modern aesthetic
- Introduce new colors outside the defined palette; all UI should map to approved hex values
- Apply text decoration (underline) to navigation links unless in hover or active state
- Use color alone to convey information; pair with icons, badges, or layout structure
- Place text on low-contrast backgrounds; maintain AA WCAG compliance (4.5:1 minimum)
- Scale product card images beyond 1:1 aspect ratio; maintain consistency in grid layout
- Deploy multiple font weights in a single heading; stick to 300 or 400 depending on size
- Reduce padding below `12px` on interactive elements; maintain minimum touch target of `44px`

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <768px | Single column, full-width cards, `20px` padding, hamburger nav, stacked sections |
| Tablet | 768px–1199px | 2–3 column grid, `40px` padding, simplified navigation, adjusted typography (-2px) |
| Desktop | 1200px–1399px | 4 column grid, `60px` padding, full nav bar, hero image fill |
| Wide | 1400px+ | Max container `1400px`, 4–6 column grid, `80px` padding, optimized spacing |

### Touch Targets

- Minimum height: `44px` for all interactive elements
- Minimum width: `44px` for icon buttons
- Button padding: `16px` horizontal × `12px` vertical (minimum)
- Link padding: `8px` (internal), with `20px` margin around in navigation
- Spacing between touch targets: `8px` minimum to prevent accidental activation
- Search and filter buttons: `48px` × `48px` on mobile, `40px` × `40px` on desktop

### Collapsing Strategy

**Header Navigation**:
- Desktop (1200px+): Horizontal menu, all links visible, logo left-aligned
- Tablet (768px–1199px): Condensed menu with secondary links in dropdown, logo centered
- Mobile (<768px): Hamburger icon triggers slide-in sidebar menu, logo full-width top

**Product Grid**:
- Desktop: 4 columns, `20px` gap
- Tablet: 2–3 columns depending on viewport, `16px` gap
- Mobile: Single column, full width minus `20px` margin

**Hero Section**:
- Desktop: Hero image 100% width, text overlay centered
- Tablet: Image height reduced to `50vh`, text padding increased to `20px`
- Mobile: Image height `40vh`, text font size reduced by 20%, stacked layout

**Form Inputs**:
- Desktop: Multi-column layout where applicable
- Tablet: 2-column or full-width stacked
- Mobile: Single column, inputs `100%` width minus padding

**Footer**:
- Desktop: 4–5 column grid
- Tablet: 2–3 column grid
- Mobile: Single column, expanded on tap

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA Button**: Pure White (`#FFFFFF`) background, Brand Black (`#212121`) text
- **Sale/Alert Button**: Sale Orange (`#FC5927`)
- **Background Surface**: Cream Soft (`#FCFBF9`) or Pure White (`#FFFFFF`)
- **Heading Text**: Brand Black (`#212121`)
- **Body Text**: Brand Black (`#212121`) on light backgrounds
- **Secondary Text**: Slate Gray (`#708090`)
- **Tertiary Text**: Neutral Warm (`#A49C8B`)
- **Category Badge**: Accent Gold (`#AB8C52`)
- **Input Border**: Warm Border (`#D1CDC4`)
- **Interactive Accent**: Sale Orange (`#FC5927`) or Accent Gold (`#AB8C52`)

### Implementation Rules

1. **Typography Foundation**: Use TTCommonsPro for all body and UI text; Superior Title serif only for headlines 24px and above. Maintain weight 300 for headlines, 400 for body.

2. **Spacing Discipline**: Apply `20px` gaps between grid items, `60px` between major sections, `16px` internal padding on cards. Never reduce spacing below `12px` for components.

3. **Button Styling**: All buttons have `border-radius: 0px`. Primary buttons use white background + black text + black border. Hover states invert colors. CTA buttons must hit `44px` minimum height.

4. **Color Hierarchy**: Brand Black (`#212121`) dominates; use `#FC5927` orange sparingly for time-sensitive actions only. Gold (`#AB8C52`) tags premium/fine items. Avoid introducing new accent colors.

5. **Depth & Shadows**: Keep shadows subtle; use `rgba(0, 0, 0, 0.05)` to `0.2)` opacity only. Apply shadows on hover or focus states, not by default. Flat design is the rule.

6. **Form Consistency**: All inputs use `border: 1px solid #D1CDC4` by default, `border: 2px solid #212121` on focus. Placeholder text is `#A49C8B`. Textarea minimum height `100px`.

7. **Navigation**: Header nav uses TTCommonsPro 11px, active link color shifts to `#FC5927`. Mobile nav triggers via hamburger, slides in from left. Footer nav is simplified and stacked on mobile.

8. **Responsive Breakpoints**: Design first for mobile (<768px), then optimize for tablet (768px–1199px) and desktop (1200px+). Grid shifts from 1 column → 2–3 columns → 4 columns. Padding scales from `20px` → `40px` → `60px–80px`.

9. **Accessibility**: Maintain 4.5:1 contrast ratio minimum (Brand Black on light backgrounds passes easily). All interactive elements must be `44px` tall. Test form focus states for keyboard navigation.

10. **Product Cards**: Use 1:1 aspect ratio images, no border-radius, `16px` padding on text area, hover state scale 1.02. Price metadata uses Slate Gray (`#708090`) at 11px weight 400.