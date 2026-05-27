# DHARAA — Web Flow Blueprint
## Complete User Journey & Page Architecture
**Version:** 2.0 | **Date:** May 2026 | **Classification:** Production Blueprint

---

## 0. Document Purpose

This document defines every user-navigable flow across the DHARAA jewelry e-commerce platform — from first impression to post-purchase. It maps every page, every decision node, every micro-interaction trigger, and every state branch a shopper or admin may encounter. Use this as the canonical source of truth for routing, state transitions, and UX handoffs.

---

## 1. Site Architecture Map

```
DHARAA.COM
│
├── / ──────────────────────────────── Homepage (Index)
│   ├── PreLoader (1.5s, first visit only)
│   ├── Hero Section
│   ├── Featured Categories Showcase
│   ├── Best Sellers Grid (4 products)
│   ├── Deals Banner → /shop?category=under-99
│   └── Category Filter + Full Shop Grid
│
├── /shop ──────────────────────────── Shop Page
│   ├── ?category=all (default)
│   ├── ?category=anti-tarnish
│   ├── ?category=under-99
│   ├── ?category=combos
│   └── ?category=oxidised
│
├── /product/:id ───────────────────── Product Detail Page
│   ├── [found]    → Full product view
│   └── [not found] → "Product Not Found" fallback
│
├── /checkout ──────────────────────── Checkout Page
│   ├── [cart empty] → Empty state → /shop
│   └── [cart has items] → Full checkout form
│       ├── Step 1: Contact + OTP verification
│       ├── Step 2: Delivery address
│       ├── Step 3: Payment method selection
│       └── [submit] → Success toast → redirect /
│
├── /about ─────────────────────────── About Page
│
├── /admin ─────────────────────────── Admin Dashboard (Phase 2)
│   ├── /admin/products (CRUD)
│   └── /admin/orders (status management)
│
└── * ──────────────────────────────── 404 Not Found
```

---

## 2. Global Shell (Rendered on Every Page)

### 2.1 PreLoader
```
[First page load] ─► [PreLoader visible — "DHARAA" + sparkle animation]
                          │
                    [1.5s timer]
                          │
                    [opacity: 0 fade] ─► [Page content revealed]
                          │
                    [localStorage flag set: "dharaa_loaded = true"]
                          │
                    [Subsequent page loads: PreLoader skipped]
```

### 2.2 Header (Fixed, Always Visible)
```
DHARAA LOGO ── Desktop Nav ─── [Search 🔍] [Wishlist ♡ {N}] [Cart 🛒 {N}]
                                     │              │              │
                              [SearchModal]  [WishlistDrawer]  [CartDrawer]
                               opens overlay   slides right    slides right
```

**Header State Transitions:**
- `isScrolled = false` → transparent/light background
- `isScrolled = true` → backdrop-blur + shadow elevation
- Mobile: hamburger replaces nav links → slide-down menu
- Cart badge: reflects `CartContext.items.length`
- Wishlist badge: reflects `WishlistContext.items.length`

### 2.3 Cart Drawer (Global Overlay)
```
[Cart Icon Clicked / "Proceed to Checkout" triggered]
        │
[CartDrawer slides in from right]
        │
   ┌────┴────────────────┐
   │ Empty State?         │
   ├─ YES ► "Start Shopping" → /shop, drawer closes
   └─ NO  ► Line items list
              │
         [Quantity +/-]   [Remove ✕]
              │
         [Subtotal]
              │
         ["Proceed to Checkout"] → /checkout
              │
         [Backdrop click] → drawer closes
```

### 2.4 Wishlist Drawer (Global Overlay)
```
[Wishlist Icon Clicked]
        │
[WishlistDrawer slides in from right]
        │
   ┌────┴───────────────────────────┐
   │ Empty State?                    │
   ├─ YES ► "Discover pieces you'll love" empty UI
   └─ NO  ► Wishlist items grid
               │
          ["Add to Cart"] → moves item to CartContext, removes from Wishlist
          [Remove ✕]      → removes from localStorage + WishlistContext
               │
          [Backdrop click] → drawer closes
```

### 2.5 Search Modal (Global Overlay)
```
[Search Icon Clicked]
        │
[SearchModal opens full-screen overlay]
        │
[Input focused, user types query]
        │
   ┌────┴──────────────────────────────────────┐
   │ query === "" ?                              │
   ├─ YES ► Display top 6 products (default)    │
   └─ NO  ► Filter products by name + category  │
              │                                  │
         [Result clicked] → addToCart(product) → modal closes
              │
         [Escape key] → modal closes
              │
         ["View all products →"] → /shop
```

---

## 3. Page-Level Flows

### 3.1 Homepage ( `/` )

```
[User lands on /]
        │
[PreLoader: 1.5s if first visit]
        │
[Hero Section renders]
   │
   ├── "Shop Now" CTA → smooth scroll to Category Filter section
   └── "View Collections" CTA → /shop
        │
[Featured Categories: 4 cards render]
   │
   ├── "Anti-Tarnish" card → /shop?category=anti-tarnish
   ├── "Gift Combos" card  → /shop?category=combos
   ├── "Oxidised" card     → /shop?category=oxidised
   └── "Best Sellers" card → /shop?category=all
        │
[Best Sellers Grid: first 4 products render]
   │
   └── [Product Card clicked] → /product/:id
        │
[Deals Banner renders]
   │
   └── "Shop Deals" CTA → /shop?category=under-99
        │
[Category Filter + Full Product Grid]
   │
   ├── [Category tab selected] → filters products reactively (no page reload)
   └── [Product Card clicked]  → /product/:id
```

**Homepage State:**
- `activeCategory`: string (default `'all'`)
- `filteredProducts`: derived from `products` array
- Animation: sections reveal on scroll via `whileInView`

---

### 3.2 Shop Page ( `/shop` )

```
[User navigates to /shop OR /shop?category=X]
        │
[URL param parsed: ?category=X]
        │
   ┌────┴──────────────────────────────┐
   │ param present?                     │
   ├─ YES → set activeCategory = X      │
   └─ NO  → set activeCategory = 'all' │
        │
[Category Filter renders with active state]
        │
[Product grid renders: filtered by activeCategory]
        │
[User clicks category tab]
        │
[URL updates: /shop?category=X (pushState)]
        │
[Product grid re-renders reactively]
        │
[User clicks product card]
        │
[Navigate to /product/:id]
```

---

### 3.3 Product Detail Page ( `/product/:id` )

```
[Navigate to /product/:id]
        │
[Lookup product by id from products array]
        │
   ┌────┴──────────────────────┐
   │ Product found?             │
   ├─ NO  → "Product Not Found" fallback state
   │         │
   │         └── "Back to Shop" → /shop
   │
   └─ YES → Full product page renders
               │
        [Image Gallery]
           │
           ├── [Main image] → default variant
           └── [Thumbnail 1/2/3 clicked] → swaps main image (URL manipulation)
               │
        [Category badge] → pill label
               │
        [Quantity Selector]
           │
           ├── [+ button] → quantity++
           └── [- button] → quantity-- (min 1)
               │
        ["Add to Cart" button]
           │
           └── addToCart(product, quantity) → CartContext
               │
               └── CartDrawer opens (optional: toast notification)
               │
        [Wishlist Toggle ♡]
           │
           ├── [not wishlisted] → click → addToWishlist → heart fills red
           └── [wishlisted]     → click → removeFromWishlist → heart empties
               │
        ["Back to Shop" link] → /shop
```

**Product Page State:**
- `selectedImage`: number (0–2), default 0
- `quantity`: number (min 1), default 1
- `isWishlisted`: boolean (derived from WishlistContext)

---

### 3.4 Checkout Page ( `/checkout` )

```
[Navigate to /checkout]
        │
[Check CartContext.items.length]
        │
   ┌────┴─────────────────────────────┐
   │ Cart empty?                       │
   ├─ YES → Empty state UI             │
   │         └── "Start Shopping" → /shop
   │
   └─ NO  → Full checkout form renders
               │
        ┌──────────────────────────────────────┐
        │ FORM SECTION 1: Contact Information   │
        └──────────────────────────────────────┘
               │
        [Full Name input]    → validate: min 2, max 100
        [Email input]        → validate: valid email, max 255
        [Phone input]        → validate: Indian format /^[6-9]\d{9}$/
               │
        ["Send OTP" button]
           │
           ├── [phone invalid] → inline error shown, OTP not sent
           └── [phone valid]   → otpSent = true
                                  → 4-digit OTP input field appears
                                  → 2-min countdown timer shown
                                  → [Resend OTP] enabled after countdown
               │
        [OTP Input: 4 digits]
           │
           └── [OTP entered] → otpVerified = true (after API validation)
               │
        ┌──────────────────────────────────────┐
        │ FORM SECTION 2: Delivery Address      │
        └──────────────────────────────────────┘
               │
        [Full Address textarea] → validate: min 10, max 500
        [City input]            → validate: min 2, max 100
        [Pincode input]         → validate: /^\d{6}$/
               │
        ┌──────────────────────────────────────┐
        │ FORM SECTION 3: Payment Method        │
        └──────────────────────────────────────┘
               │
        ┌──────────────────────────────────────────────────────┐
        │ [Online Payment Card]      [Cash on Delivery Card]    │
        │ UPI / Cards / Net Banking  Shipping: ₹70             │
        │ Shipping: ₹50              [visual card selector]     │
        └──────────────────────────────────────────────────────┘
               │
        [Shipping fee updates dynamically in Order Summary]
               │
        ┌──────────────────────────────────────┐
        │ ORDER SUMMARY SIDEBAR (sticky)        │
        └──────────────────────────────────────┘
               │
        [Line items with thumbnails, qty, line totals]
        [Subtotal] [Shipping] [Grand Total]
               │
        ["Place Order • ₹{total}" button clicked]
           │
           ├── [Validation fails] → errors shown inline, submit blocked
           ├── [OTP not sent]     → error: "Please verify your phone number"
           ├── [OTP incomplete]   → error: "Please enter the 4-digit OTP"
           └── [All valid]
                   │
               [Loading spinner: 2s processing simulation]
                   │
               [supabase.from('orders').insert(...)]   ← Phase 2: real write
               [supabase.from('order_items').insert(...)]
                   │
               [CartContext.clearCart()]
                   │
               [Success toast: "Order placed! We'll contact you soon."]
                   │
               [Navigate to /]
```

**Checkout State:**
- `otpSent`: boolean
- `otpVerified`: boolean
- `otp`: string (4 chars)
- `paymentMethod`: `'online' | 'cod'`
- `shippingCharge`: `50 (online) | 70 (cod)`
- `isSubmitting`: boolean
- `errors`: `Partial<Record<FormField, string>>`

---

### 3.5 About Page ( `/about` )

```
[Navigate to /about]
        │
[Brand story section renders with animations]
        │
[Values grid: 4 cards animate in on scroll]
        │
["Join the DHARAA Family" CTA → /]
```

---

### 3.6 404 Not Found ( `*` )

```
[Unrecognised route]
        │
[NotFound.tsx renders]
        │
["Return Home" CTA → /]
```

---

## 4. Cross-Cutting Flows

### 4.1 Product Card Interaction (All Grids)
```
[Product Card]
   │
   ├── [Card body click]        → navigate /product/:id
   ├── [Quick "Add to Cart"]    → addToCart, toast notification
   └── [Wishlist toggle ♡]      → addToWishlist / removeFromWishlist
```

### 4.2 Category Deep-Link Flow (Footer / Banner)
```
[Footer link: /shop?category=anti-tarnish]
        │
[Shop page mounts, reads URL param]
        │
[activeCategory set to 'anti-tarnish']
        │
[Products filtered and rendered]
        │
[URL reflects state — shareable/bookmarkable]
```

### 4.3 Session ID Lifecycle
```
[User's first visit]
        │
[localStorage.getItem('dharaa_session_id') = null]
        │
[crypto.randomUUID() generated → stored to localStorage]
        │
[Session ID persists across tabs and page refreshes]
        │
[Used as anonymous identifier for: Wishlist, Orders]
```

---

## 5. Admin Flow (Phase 2)

```
[Admin navigates to /admin]
        │
[Auth check: supabase.auth.getUser()]
        │
   ┌────┴──────────────────────────────┐
   │ auth.uid() in admin_users?         │
   ├─ NO  → redirect /
   └─ YES → Admin dashboard renders
               │
        ┌─────────────────────────────────────┐
        │ /admin/products                      │
        └─────────────────────────────────────┘
               │
        [Product list with pagination]
        [Create new product] → form modal → supabase INSERT
        [Edit product]       → form modal → supabase UPDATE
        [Toggle is_active]   → supabase UPDATE
        [Delete product]     → confirmation modal → supabase DELETE
               │
        ┌─────────────────────────────────────┐
        │ /admin/orders                        │
        └─────────────────────────────────────┘
               │
        [Orders table with filters by status]
        [Click order row] → order detail modal
        [Update status]   → supabase UPDATE (order_status field)
```

---

## 6. Error & Edge Case Flows

| Scenario | User Experience | Technical Handling |
|---|---|---|
| Product ID not found | "Product Not Found" UI + Back to Shop | Null check on `products.find()` |
| Cart empty at checkout | Empty state UI + CTA to /shop | `items.length === 0` guard |
| OTP not verified at submit | Inline error message | `!otpVerified` guard on submit |
| Network error on Supabase | Toast: "Something went wrong. Try again." | try/catch on all async calls |
| Invalid URL category param | Falls back to `'all'` category | `categories.find()` with fallback |
| Session ID missing | Generate new UUID | `||` fallback in WishlistContext |
| Admin unauthorized | Redirect to homepage | Route guard in Admin layout |

---

## 7. Performance-Aware Flow Optimisations

| Flow | Optimisation |
|---|---|
| Initial page load | PreLoader masks render; images lazy-loaded |
| Product grid render | `whileInView` animations fire once, not on re-scroll |
| Category filter | Client-side filter — zero network requests |
| Search modal | Searches in-memory product array — instant results |
| Cart drawer open | Framer Motion spring — 300ms, 60fps |
| Checkout submission | Optimistic UI (spinner shown immediately) |
| Product images | `loading="lazy"` on all `<img>` tags |

---

## 8. Navigation Taxonomy

| Entry Point | Destination | Trigger |
|---|---|---|
| Logo | `/` | Click |
| "Home" nav link | `/` | Click |
| "About" nav link | `/about` | Click |
| "Categories" nav link | `/#categories` | Scroll anchor |
| Hero "Shop Now" CTA | `/#shop` | Scroll anchor |
| Hero "View Collections" CTA | `/shop` | Click |
| Product card | `/product/:id` | Click |
| "Back to Shop" | `/shop` | Click |
| Cart "Proceed to Checkout" | `/checkout` | Click |
| Footer "Shop All" | `/shop` | Click |
| Footer category links | `/shop?category=X` | Click |
| Deals banner CTA | `/shop?category=under-99` | Click |
| Success redirect | `/` | Programmatic |
| 404 "Return Home" | `/` | Click |
