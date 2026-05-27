# Technical Requirements Specification (TRS)
## DHARAA — Jewelry E-Commerce Platform

**Version:** 1.0  
**Date:** May 2026  
**Source Repository:** `earthy-sparkle-shop`  
**Stack:** React 18 + TypeScript + Vite + Supabase + Tailwind CSS

---

## 1. System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │  React 18 SPA (Vite build)                        │  │
│  │  ┌─────────────┐  ┌──────────────┐               │  │
│  │  │ React Router│  │ React Query  │               │  │
│  │  │  (routing)  │  │ (data layer) │               │  │
│  │  └─────────────┘  └──────────────┘               │  │
│  │  ┌─────────────┐  ┌──────────────┐               │  │
│  │  │  CartContext│  │WishlistCtx   │               │  │
│  │  │ (in-memory) │  │(localStorage)│               │  │
│  │  └─────────────┘  └──────────────┘               │  │
│  └────────────────────────┬──────────────────────────┘  │
│                           │ supabase-js client           │
└───────────────────────────┼─────────────────────────────┘
                            │ HTTPS / REST + Realtime
┌───────────────────────────▼─────────────────────────────┐
│                     SUPABASE                             │
│  ┌────────────┐  ┌──────────┐  ┌──────────────────────┐ │
│  │ PostgreSQL │  │  Auth    │  │  Row Level Security   │ │
│  │  (tables)  │  │  (JWT)   │  │  (per-table policies) │ │
│  └────────────┘  └──────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Project Structure

```
earthy-sparkle-shop/
├── public/                        # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── App.tsx                    # Root component, router, global providers
│   ├── main.tsx                   # React DOM entry point
│   ├── index.css                  # Global CSS, Tailwind base, custom variables
│   ├── App.css                    # Additional global styles
│   ├── vite-env.d.ts              # Vite environment type declarations
│   │
│   ├── pages/
│   │   ├── Index.tsx              # Homepage (/)
│   │   ├── Shop.tsx               # Shop page (/shop) — UNREGISTERED
│   │   ├── ProductDetail.tsx      # Product detail (/product/:id)
│   │   ├── Checkout.tsx           # Checkout (/checkout)
│   │   ├── About.tsx              # About page (/about)
│   │   └── NotFound.tsx           # 404 catch-all (*)
│   │
│   ├── components/
│   │   ├── Header.tsx             # Sticky nav header
│   │   ├── Hero.tsx               # Homepage hero section
│   │   ├── FeaturedCategories.tsx # 4-card category showcase
│   │   ├── Categories.tsx         # Pill-style category filter tabs
│   │   ├── ProductCard.tsx        # Individual product card
│   │   ├── ProductGrid.tsx        # Responsive product grid wrapper
│   │   ├── CartDrawer.tsx         # Slide-in cart panel
│   │   ├── WishlistDrawer.tsx     # Slide-in wishlist panel
│   │   ├── SearchModal.tsx        # Full-screen search overlay
│   │   ├── DealsBanner.tsx        # Promotional banner
│   │   ├── Footer.tsx             # Global footer
│   │   ├── PreLoader.tsx          # Initial page loader
│   │   ├── NavLink.tsx            # Navigation link component
│   │   └── ui/                    # shadcn/ui component library (40+ components)
│   │
│   ├── contexts/
│   │   ├── CartContext.tsx        # Cart state + actions (React Context)
│   │   └── WishlistContext.tsx    # Wishlist state + localStorage sync
│   │
│   ├── data/
│   │   └── products.ts            # Static product catalogue (12 items) + categories
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Viewport width detector hook
│   │   └── use-toast.ts           # Toast notification hook
│   │
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts          # Supabase client initialisation
│   │       └── types.ts           # Auto-generated TypeScript types from DB schema
│   │
│   └── lib/
│       └── utils.ts               # cn() utility (clsx + tailwind-merge)
│
├── supabase/
│   ├── config.toml                # Supabase project configuration
│   └── migrations/
│       └── *.sql                  # DB schema and RLS policy migrations
│
├── index.html                     # HTML shell
├── vite.config.ts                 # Vite configuration
├── tailwind.config.ts             # Tailwind theme configuration
├── tsconfig.json                  # TypeScript config (root)
├── tsconfig.app.json              # TypeScript config (app)
├── components.json                # shadcn/ui configuration
└── package.json                   # Dependencies and scripts
```

---

## 3. Dependencies

### 3.1 Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | DOM rendering |
| `react-router-dom` | ^6.30.1 | Client-side routing |
| `@tanstack/react-query` | ^5.83.0 | Server state management |
| `@supabase/supabase-js` | ^2.90.0 | Supabase client SDK |
| `framer-motion` | ^12.24.10 | Animation library |
| `tailwind-merge` | ^2.6.0 | Tailwind class merging |
| `clsx` | ^2.1.1 | Conditional class names |
| `class-variance-authority` | ^0.7.1 | Component variant styles |
| `zod` | ^3.25.76 | Schema validation |
| `react-hook-form` | ^7.61.1 | Form state management |
| `@hookform/resolvers` | ^3.10.0 | Zod integration for RHF |
| `lucide-react` | ^0.462.0 | Icon set |
| `sonner` | ^1.7.4 | Toast notifications |
| `next-themes` | ^0.3.0 | Dark/light theme support |
| `@radix-ui/*` | ^1–2.x | Accessible UI primitives (20+ packages) |
| `recharts` | ^2.15.4 | Chart components (available, unused) |
| `date-fns` | ^3.6.0 | Date utilities |
| `embla-carousel-react` | ^8.6.0 | Carousel (available, unused) |
| `input-otp` | ^1.4.2 | OTP input component |
| `vaul` | ^0.9.9 | Drawer primitive |

### 3.2 Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^5.4.19 | Build tool and dev server |
| `@vitejs/plugin-react-swc` | ^3.11.0 | Fast React refresh via SWC |
| `typescript` | ^5.8.3 | Type checking |
| `tailwindcss` | ^3.4.17 | CSS framework |
| `@tailwindcss/typography` | ^0.5.16 | Prose styling plugin |
| `postcss` / `autoprefixer` | latest | CSS processing |
| `eslint` + plugins | ^9.x | Linting |

---

## 4. Environment Configuration

### 4.1 Required Environment Variables

```env
# .env (local development)
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-public-key>
```

**Note:** Both variables are prefixed `VITE_` to be exposed to the browser bundle. The Supabase anon key is the publishable key — row-level security policies govern actual data access.

### 4.2 Supabase Client Configuration

```typescript
// src/integrations/supabase/client.ts
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,      // Sessions stored in localStorage
    persistSession: true,       // Sessions survive page reload
    autoRefreshToken: true,     // Automatic JWT refresh
  }
});
```

---

## 5. Routing

Defined in `src/App.tsx` using React Router v6:

```
BrowserRouter
└── Routes
    ├── /                  → <Index />
    ├── /about             → <About />
    ├── /product/:id       → <ProductDetail />
    ├── /checkout          → <Checkout />
    └── *                  → <NotFound />
```

**⚠ Issue:** `<Shop />` at `/shop` is not registered. `Shop.tsx` exists and is functional but unreachable via router. All shop links in Footer (`/shop`, `/shop?category=*`) will 404.

**Fix required:**
```typescript
// Add to App.tsx Routes:
import Shop from "./pages/Shop";
<Route path="/shop" element={<Shop />} />
```

---

## 6. State Management

### 6.1 CartContext (`src/contexts/CartContext.tsx`)

| State | Type | Persistence |
|-------|------|-------------|
| `items` | `CartItem[]` | In-memory (lost on refresh) |
| `isCartOpen` | `boolean` | In-memory |

**Interface:**
```typescript
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;          // derived: sum of quantities
  totalPrice: number;          // derived: sum of price * quantity
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}
```

**Add to Cart logic:** If item already in cart, increments quantity. Otherwise appends with `quantity: 1`.  
**Update Quantity to 0:** Calls `removeFromCart` automatically.

### 6.2 WishlistContext (`src/contexts/WishlistContext.tsx`)

| State | Type | Persistence |
|-------|------|-------------|
| `items` | `Product[]` | `localStorage` (`dharaa_wishlist`) |
| `isWishlistOpen` | `boolean` | In-memory |

**Session ID:** `crypto.randomUUID()` stored in `localStorage` as `dharaa_session_id`. Used for anonymous user identification against Supabase wishlist table.

**Sync logic:** `useEffect` on mount reads from localStorage; separate `useEffect` on `items` change writes back.

---

## 7. Data Layer

### 7.1 Static Data (`src/data/products.ts`)

Currently the sole source of product data. 12 products defined as a TypeScript constant.

```typescript
export interface Product {
  id: string;       // e.g. '1', '2', ... '12'
  name: string;
  price: number;    // INR integer
  image: string;    // Unsplash URL
  category: string; // 'anti-tarnish' | 'under-99' | 'combos' | 'oxidised'
}

export const categories = [
  { id: 'all', name: 'All', icon: '✨' },
  { id: 'anti-tarnish', name: 'Anti-Tarnish', icon: '💎' },
  { id: 'under-99', name: 'Under ₹99', icon: '🏷️' },
  { id: 'combos', name: 'Combos', icon: '🎁' },
  { id: 'oxidised', name: 'Oxidised Earrings', icon: '🌙' },
];
```

**⚠ Issue:** Products are not fetched from Supabase. The `products` table exists in the DB schema but is unused by the frontend. Migrating to Supabase requires replacing the import with React Query + `supabase.from('products').select()`.

### 7.2 Supabase Integration

The client is initialised but currently no component calls `.from()` or any Supabase method. TanStack React Query is configured globally via `QueryClientProvider` but no queries are implemented.

---

## 8. Form Validation

Checkout form uses **Zod** schema:

```typescript
const checkoutSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone:    z.string().regex(/^[6-9]\d{9}$/),      // Indian mobile
  email:    z.string().email().max(255),
  address:  z.string().min(10).max(500),
  city:     z.string().min(2).max(100),
  pincode:  z.string().regex(/^\d{6}$/),            // Indian PIN code
});
```

Validation is `safeParse`-based (no throw), errors collected into a `Partial<Record<keyof CheckoutForm, string>>` object and displayed inline below each field.

**OTP gate:** Submission blocked if `otpSent === false` or `otp.length !== 4`.

---

## 9. Animation System

All animations use **Framer Motion**. Standard patterns:

| Pattern | Usage |
|---------|-------|
| `initial/animate` with `opacity: 0→1` | Page section reveal |
| `whileInView` with `viewport: { once: true }` | Scroll-triggered animations (one-shot) |
| `whileHover: { scale: 1.05 }` | Button/card hover lift |
| `whileTap: { scale: 0.95 }` | Button press feedback |
| `AnimatePresence` + `exit` | Cart/wishlist drawer, modal, preloader |
| Stagger via `transition: { delay: index * 0.1 }` | List/grid item cascades |
| `animate: { y: [0, -10, 0] }` with `repeat: Infinity` | Float animations (hero image) |
| Spring transition `{ type: 'spring', damping: 25, stiffness: 200 }` | Drawer slide-in |

---

## 10. Styling Architecture

### 10.1 Tailwind Configuration

Custom design tokens defined in `tailwind.config.ts` using CSS variables (HSL). Key custom classes:

```css
/* src/index.css */
.btn-primary          /* Primary action button */
.btn-outline-primary  /* Outlined button */
.product-card         /* Product card container */
.category-pill        /* Category filter button */
.category-pill-active /* Active category state */
```

### 10.2 CSS Variables (Theme)

The app supports light/dark themes via `next-themes`. Variables defined on `:root` and `.dark`. Key tokens:

```
--primary       (brand gold/warm tone)
--accent        (secondary accent)
--background    (page background)
--foreground    (text)
--card          (card background)
--muted         (subtle backgrounds)
--border        (border color)
--destructive   (error/delete actions)
```

### 10.3 Typography

- **Heading font:** Custom (serif/display) via `font-heading` class
- **Body font:** Custom via `font-body` class
- Both defined in Tailwind config and loaded via CSS

---

## 11. Component Architecture

### 11.1 Global Layout Pattern

Every page follows this structure:
```tsx
<>
  <Header />
  <CartDrawer />          {/* rendered globally on every page */}
  <WishlistDrawer />      {/* rendered globally on every page */}
  <main className="pt-20 md:pt-24">
    {/* page content */}
  </main>
  <Footer />              {/* except Checkout */}
</>
```

`pt-20 md:pt-24` offsets content below the fixed header (64px/80px).

### 11.2 ProductCard Props

```typescript
interface ProductCardProps {
  product: Product;
  index?: number;    // Used for animation stagger delay
}
```

### 11.3 ProductGrid Props

```typescript
interface ProductGridProps {
  products: Product[];
  title?: string;   // Optional section heading
}
```

### 11.4 Categories Props

```typescript
interface CategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}
```

---

## 12. Build & Development

### 12.1 Scripts

```bash
npm run dev       # Vite dev server (HMR via SWC)
npm run build     # Production build → dist/
npm run build:dev # Development mode build
npm run preview   # Preview production build locally
npm run lint      # ESLint check
```

### 12.2 Build Output

Vite produces optimised static files in `dist/`. Suitable for deployment to:
- Vercel (zero-config with `vite` preset)
- Netlify
- Supabase Edge (static hosting)
- Any CDN with SPA fallback (rewrite all routes to `index.html`)

### 12.3 TypeScript Configuration

- Strict mode enabled via `tsconfig.app.json`
- Path aliases: `@/*` → `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`)
- Target: `ES2020`

---

## 13. Security Considerations

### 13.1 Client-Side

- No API keys embedded in source; Supabase anon key is intentionally public
- RLS policies enforce data access at the DB layer
- Zod validation prevents malformed data reaching submission handlers
- Phone field strips non-digit characters: `.replace(/\D/g, '').slice(0, 10)`
- Pincode field enforced to 6 digits with same pattern

### 13.2 Supabase RLS Summary

| Table | Public Read | Public Write | Admin Write |
|-------|-------------|--------------|-------------|
| `products` | ✅ | ❌ | ✅ |
| `wishlists` | ✅ | ✅ (insert/delete) | — |
| `orders` | ✅ (all rows) | ✅ (insert) | ✅ (update) |
| `order_items` | ✅ | ✅ (insert) | — |
| `otp_verifications` | ✅ | ✅ | — |
| `admin_users` | Own row only | ❌ | Super admin |

**⚠ Issue:** `orders` SELECT policy grants read access to all rows (`USING (true)`). This means any user can query all orders. Should be scoped to `session_id`.

**Fix:**
```sql
DROP POLICY "Users can view their orders" ON public.orders;
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (session_id = current_setting('request.headers')::json->>'x-session-id');
```

---

## 14. Known Technical Debt & Recommended Fixes

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| 1 | `/shop` route not registered in `App.tsx` | High | Add `<Route path="/shop" element={<Shop />} />` |
| 2 | Products served from static file, not Supabase | High | Implement `useQuery` with `supabase.from('products').select()` |
| 3 | Order not written to Supabase on checkout | High | Call `supabase.from('orders').insert()` + `order_items` in `handleSubmit` |
| 4 | OTP not actually sent via SMS | High | Integrate MSG91 or Twilio via Supabase Edge Function |
| 5 | Razorpay payment UI not implemented | High | Wire Razorpay JS SDK to online payment path |
| 6 | Cart state not persisted | Medium | Sync cart to localStorage or Supabase session |
| 7 | Orders RLS too permissive | Medium | Scope SELECT to matching `session_id` |
| 8 | Product images are URL-manipulated variants | Low | Upload real product photography to Supabase Storage |
| 9 | Free shipping threshold not enforced at checkout | Low | Add conditional logic in `shippingCharge` calculation |
| 10 | Stock not decremented on order | Medium | Use Supabase DB transaction to decrement `products.stock` |
| 11 | No admin dashboard | Medium | Build admin CRUD UI using existing `admin_users` + RLS |
| 12 | `recharts` and `embla-carousel` imported but unused | Low | Remove or utilise; reduces bundle size |
