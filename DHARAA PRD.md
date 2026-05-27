# Product Requirements Document (PRD)
## DHARAA — Jewelry E-Commerce Platform

**Version:** 1.0  
**Date:** May 2026  
**Status:** Current Implementation Analysis  
**Source Repository:** `earthy-sparkle-shop`

---

## 1. Product Overview

**DHARAA** is a direct-to-consumer jewelry e-commerce web application targeting the Indian market. The brand positions itself as an accessible, high-quality accessories brand — "Everyday Accessories, Thoughtfully Crafted." The platform is a single-page React application with a Supabase backend, designed for anonymous shopping with OTP-based phone verification at checkout.

### 1.1 Brand Identity
- **Name:** DHARAA (derived from Sanskrit, meaning "Earth" or "Flow")
- **Tagline:** Everyday Accessories, Thoughtfully Crafted
- **Market:** Pan-India, INR pricing
- **Price Range:** ₹59 – ₹399
- **Target Audience:** Women seeking affordable, handcrafted jewelry
- **Contact:** hello@dharaa.com | +91 98765 43210 | Mumbai, Maharashtra

---

## 2. Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Enable product discovery | Category filter engagement rate |
| Drive purchase conversion | Cart-to-checkout conversion % |
| Reduce checkout abandonment | OTP completion rate |
| Build brand loyalty | Wishlist save rate |
| Support admin operations | Order fulfilment rate |

---

## 3. User Personas

### 3.1 Shopper (Anonymous)
- Browses by category or search
- Adds items to cart and wishlist without creating an account
- Completes checkout via OTP phone verification
- Pays via UPI/card (online) or Cash on Delivery

### 3.2 Admin User
- Manages product catalogue (CRUD)
- Views and updates order statuses
- Assigned roles: `admin` or `super_admin`

---

## 4. Feature Requirements

### 4.1 Homepage (Index Page)

**Pre-loader**
- Branded animated loader ("DHARAA" with sparkle icon) displays for 1.5 seconds on first load
- Fades out with opacity transition before revealing page content

**Hero Section**
- Full-viewport hero with headline: "Everyday Accessories, Thoughtfully Crafted"
- CTA buttons: "Shop Now" (scroll to categories) and "View Collections"
- Social proof stats: 5000+ Customers, 500+ Products, 4.9 Rating
- Floating badge cards: "Premium Quality 💎" and "Fast Delivery 🚚"
- Scroll indicator animation

**Featured Categories Showcase**
- 4 category cards: Anti-Tarnish, Gift Combos, Oxidised, Best Sellers
- Each card has an icon, title, and description
- Hover animation (lift effect)

**Best Sellers Grid**
- Displays first 4 products from the product catalogue
- Titled "Best Sellers"

**Deals Banner**
- Full-width promotional banner highlighting "Under ₹99 Deals"
- Floating animated price tags (₹59, ₹89)
- CTA button links to `/shop?category=under-99`

**Category Filter + Shop All Grid**
- Interactive pill-style category filter tabs
- 5 categories: All ✨, Anti-Tarnish 💎, Under ₹99 🏷️, Combos 🎁, Oxidised Earrings 🌙
- Products grid updates reactively on category selection
- Default shows all products

---

### 4.2 Shop Page (`/shop`)

- Accepts `?category=` query parameter for deep-linking from footer/banner
- Page header with title "Our Collection"
- Same category filter + product grid as homepage
- Persists selected category via URL param

---

### 4.3 Product Detail Page (`/product/:id`)

- Route: `/product/:id` where `id` matches the product's string ID
- Main image with thumbnail gallery (3 image variants generated from URL manipulation)
- Image selector highlights active thumbnail with primary border
- Category badge (pill label)
- Product name, price in ₹
- Category-specific description (4 variants: anti-tarnish, under-99, combos, oxidised)
- Static feature list: Premium materials, Handcrafted, Easy maintenance, Gifting
- Quantity selector (min 1, increment/decrement)
- Add to Cart button (adds N units based on quantity)
- Wishlist toggle button (heart icon, fills red when saved)
- Shipping info callout: Free shipping >₹499, 7-day returns, COD available
- "Back to Shop" navigation link
- "Product Not Found" fallback state

---

### 4.4 Checkout Page (`/checkout`)

**Empty Cart Guard**
- If cart is empty, show empty state with "Start Shopping" CTA to `/shop`

**Form Sections**

*Contact Information*
- Full Name (required, min 2 chars, max 100)
- Email ID (required, valid email, max 255)
- Phone Number (required, Indian format: starts 6–9, 10 digits)
- OTP Verification: "Send OTP" button validates phone first, shows 4-digit OTP input after send

*Delivery Address*
- Full Address (required, min 10 chars, max 500, textarea)
- City (required, min 2 chars)
- Pincode (required, 6 digits exactly)

*Payment Method*
- Online Payment (UPI / Cards / Net Banking) — Shipping: ₹50
- Cash on Delivery — Shipping: ₹70
- Visual card-style selector with checkmark on active selection

**Order Summary (sticky sidebar)**
- Line items with thumbnail, name, quantity, line total
- Subtotal, Shipping, Grand Total
- "Place Order • ₹{total}" submit button
- Terms & Conditions acceptance note

**Validation (Zod schema)**
- Client-side field validation with inline error messages
- OTP must be sent and filled (4 digits) before submission
- 2-second simulated order processing with spinner
- On success: cart cleared, success toast, redirect to `/`

**Shipping Logic**
- Online payment → ₹50 shipping
- COD → ₹70 shipping
- Free shipping threshold: ₹499 (displayed on Product Detail; not enforced at checkout in current implementation)

---

### 4.5 About Page (`/about`)

- Brand story section with DHARAA name origin explanation
- Values grid: Crafted with Love, Premium Quality, Sustainable Practices, Community First
- CTA section: "Join the DHARAA Family" → link to homepage
- Decorative animated elements (rotating circle, pulsing shapes)

---

### 4.6 Header (Global)

- Fixed, backdrop-blur sticky header
- Logo: "DHARAA" (links to `/`)
- Desktop nav: Home, Categories (scroll anchor), About
- Mobile hamburger menu (animated slide-down)
- Search icon → opens SearchModal
- Wishlist icon with badge count
- Cart icon with badge count
- Slide-in animation on page load

---

### 4.7 Cart Drawer (Global)

- Slides in from right as overlay drawer
- Line items: image, name, price, quantity controls (increment/decrement/remove)
- Quantity decrement to 0 removes item
- Subtotal display
- "Proceed to Checkout" button → `/checkout`
- Empty state with "Start Shopping" link
- Closes on backdrop click

---

### 4.8 Wishlist Drawer (Global)

- Slides in from right as overlay drawer
- Persisted to `localStorage` (key: `dharaa_wishlist`)
- Session ID generated via `crypto.randomUUID()` (key: `dharaa_session_id`)
- "Add to Cart" moves item from wishlist to cart
- Remove item button
- Empty state message

---

### 4.9 Search Modal (Global)

- Triggered from header search icon
- Full-text search on product name and category
- Shows top 6 products when query is empty
- Grid of results with image, name, price
- Clicking a result adds to cart and closes modal
- Keyboard: `Escape` closes modal
- "View all products →" link to `/shop`

---

### 4.10 Footer (Global)

- Features bar: Fast Shipping, Secure Payment, Easy Returns, COD Available
- Brand column: logo, tagline, contact info (phone, email, address), social links (Instagram, Facebook, Twitter)
- Link columns: Shop, Information, Policies
- Payment options summary (Online ₹50 shipping / COD ₹70 shipping)
- Payment badge row: VISA, MasterCard, UPI
- Copyright: "© 2024 DHARAA. All rights reserved. Made with ❤️ in India"

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Lazy loading on product images
- Framer Motion animations use `viewport: { once: true }` to avoid re-triggering
- React Query client configured for data fetching (infrastructure ready)
- 1.5-second pre-loader masks initial render

### 5.2 Responsiveness
- Mobile-first Tailwind CSS layout
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Mobile: 2-column product grid; Desktop: 4-column
- Fixed header height: 64px mobile / 80px desktop
- `use-mobile` hook detects viewport for conditional rendering

### 5.3 Accessibility
- Semantic HTML elements (`<main>`, `<nav>`, `<footer>`, `<section>`)
- Button labels and aria-implied via lucide-react icon usage
- Focus states on form inputs with `focus:ring-2 focus:ring-primary/30`
- Keyboard escape closes modals

### 5.4 Security
- Supabase Row-Level Security (RLS) enabled on all tables
- OTP verification for checkout (4-digit, expiry-tracked in DB)
- Razorpay integration fields present in schema (not yet wired in UI)
- Admin operations protected by `admin_users` table check
- Form validation via Zod on all checkout fields

### 5.5 State Management
- Cart state: React Context (in-memory, no persistence)
- Wishlist state: React Context + localStorage persistence
- Session ID: localStorage (`dharaa_session_id`) for anonymous user tracking

---

## 6. Current Gaps & Known Limitations

| Gap | Description |
|-----|-------------|
| **No real OTP delivery** | OTP is simulated — no SMS API (e.g., Twilio/MSG91) integrated |
| **No real payment gateway** | Razorpay fields exist in DB schema but UI always simulates success |
| **Static product data** | Products are hardcoded in `src/data/products.ts`, not fetched from Supabase |
| **Cart not persisted** | Cart state is lost on page refresh (no localStorage or DB sync) |
| **No Shop page route** | `App.tsx` routing lacks `/shop` route (Shop.tsx exists but is unreachable) |
| **No order persistence** | Order submission clears cart and redirects but never writes to Supabase |
| **No admin UI** | `admin_users` table and policies exist but no admin dashboard is implemented |
| **Free shipping not enforced** | "Free shipping above ₹499" is displayed on product detail but not applied at checkout |
| **No stock management** | `products.stock` field exists in DB but is not checked or displayed |
| **Mock product images** | 3 gallery images on product detail are URL-manipulated variants of a single image |

---

## 7. Pages & Routes Summary

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Index.tsx` | Homepage with hero, featured categories, product grids |
| `/about` | `About.tsx` | Brand story and values page |
| `/product/:id` | `ProductDetail.tsx` | Individual product view |
| `/checkout` | `Checkout.tsx` | Checkout form and order summary |
| `*` | `NotFound.tsx` | 404 fallback |
| `/shop` | `Shop.tsx` | **Exists but not registered in App.tsx router** |

---

## 8. Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 + shadcn/ui (Radix UI) |
| Animation | Framer Motion 12 |
| Routing | React Router DOM v6 |
| Forms | React Hook Form + Zod validation |
| State | React Context API |
| Backend/DB | Supabase (PostgreSQL) |
| Data Fetching | TanStack React Query v5 |
| Icons | Lucide React |
| Notifications | Sonner + shadcn Toast |
