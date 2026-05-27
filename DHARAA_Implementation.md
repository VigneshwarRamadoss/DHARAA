# DHARAA — Implementation Blueprint
## Production-Ready Build Guide
**Version:** 2.0 | **Date:** May 2026 | **Classification:** Production Blueprint

---

## 0. Overview

This document is the definitive engineering guide for building DHARAA to production quality. It covers every layer: project setup, design token integration, component build order, known gap resolution, testing, and deployment. Follow it in sequence — each phase builds on the last.

**Guiding principle:** Fix what's broken first. Enhance what exists. Build new features on solid ground.

---

## 1. Project Bootstrap & Environment Setup

### 1.1 Prerequisites
```bash
node >= 20.x
npm >= 10.x
git
Supabase CLI (npm install -g supabase)
```

### 1.2 Repository Initialisation
```bash
# Clone existing repo
git clone <repo-url> dharaa
cd dharaa

# Install dependencies
npm install

# Environment file
cp .env.example .env
# Edit .env:
# VITE_SUPABASE_URL=https://<your-project>.supabase.co
# VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>

# Start dev server
npm run dev
```

### 1.3 Supabase CLI Setup
```bash
# Link to your Supabase project
supabase login
supabase link --project-ref <your-project-ref>

# Apply existing migrations
supabase db push

# Verify tables exist
supabase db diff
```

---

## 2. Design Token Integration

### 2.1 Tailwind Configuration (`tailwind.config.ts`)

Replace the existing Tailwind config with the complete DHARAA design system:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary
        'brand-black':   '#212121',
        'accent-gold':   '#AB8C52',
        
        // Accent
        'sale-orange':   '#FC5927',
        'rose-mauve':    '#E39B9B',
        'deep-red':      '#DC5656',
        
        // Neutrals
        'cream-soft':    '#FCFBF9',
        'warm-off-white':'#FAF7F2',
        'natural-beige': '#F3ECE0',
        'slate-gray':    '#708090',
        'neutral-warm':  '#A49C8B',
        'warm-border':   '#D1CDC4',
        
        // Aliases for shadcn compatibility
        background:   '#FFFFFF',
        foreground:   '#212121',
        primary: {
          DEFAULT:    '#212121',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT:    '#FAF7F2',
          foreground: '#212121',
        },
        muted: {
          DEFAULT:    '#FCFBF9',
          foreground: '#708090',
        },
        accent: {
          DEFAULT:    '#F3ECE0',
          foreground: '#212121',
        },
        destructive: {
          DEFAULT:    '#DC5656',
          foreground: '#FFFFFF',
        },
        border:       '#D1CDC4',
        input:        '#D1CDC4',
        ring:         '#212121',
        card: {
          DEFAULT:    '#FFFFFF',
          foreground: '#212121',
        },
      },
      fontFamily: {
        heading: ['"Superior Title"', 'Georgia', 'serif'],
        body:    ['"TTCommonsPro"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'display': ['51.75px', { lineHeight: '62.1px', fontWeight: '300' }],
        'h1':      ['48px',    { lineHeight: '57.6px', fontWeight: '300' }],
        'h2':      ['36px',    { lineHeight: '43.2px', fontWeight: '300' }],
        'h3':      ['16px',    { lineHeight: '16px',   fontWeight: '400' }],
        'body-lg': ['16px',    { lineHeight: '19.2px', fontWeight: '400' }],
        'body':    ['14px',    { lineHeight: '16.8px', fontWeight: '400' }],
        'caption': ['11px',    { lineHeight: '13.2px', fontWeight: '400' }],
        'xs':      ['10px',    { lineHeight: '12px',   fontWeight: '400' }],
      },
      spacing: {
        '18': '72px',
        'section-sm': '32px',
        'section-md': '40px',
        'section-lg': '60px',
        'container':  '80px',
      },
      maxWidth: {
        'container': '1400px',
      },
      borderRadius: {
        // Sharp corners are the DHARAA brand signature
        DEFAULT: '0px',
        'sm': '0px',
        'md': '0px',
        'lg': '0px',
        'xl': '0px',
        'subtle': '4px',  // Only for inner elements where needed
      },
      boxShadow: {
        'card-hover': '0px 2px 4px rgba(0,0,0,0.05)',
        'elevated':   '0px 4px 8px rgba(0,0,0,0.10)',
        'modal':      '0px 8px 16px rgba(0,0,0,0.15)',
        'sticky':     '0px 4px 8px rgba(0,0,0,0.06)',
        'drawer':     '-8px 0 24px rgba(0,0,0,0.12)',
      },
      animation: {
        'float':   'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite 2s',
        'bounce-slow': 'bounce 1.2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { left: '-100%' },
          '100%': { left: '200%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### 2.2 Global CSS (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Font Declarations ─────────────────────────────────── */
@font-face {
  font-family: 'Superior Title';
  src: url('/fonts/SuperiorTitle-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TTCommonsPro';
  src: url('/fonts/TTCommonsPro-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TTCommonsPro';
  src: url('/fonts/TTCommonsPro-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* ─── Base Reset ────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: 'TTCommonsPro', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  color: #212121;
  background-color: #FFFFFF;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ─── Component Utilities ───────────────────────────────── */
@layer components {
  /* Buttons */
  .btn-primary {
    @apply inline-flex items-center justify-center
           px-8 py-4 min-h-[44px]
           bg-white text-brand-black
           border-2 border-brand-black
           font-body text-caption font-bold uppercase tracking-wider
           transition-colors duration-200
           hover:bg-brand-black hover:text-white
           active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
           focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-offset-2;
    border-radius: 0 !important;
  }

  .btn-sale {
    @apply inline-flex items-center justify-center
           px-8 py-4 min-h-[44px]
           bg-sale-orange text-white
           border-0
           font-body text-caption font-bold uppercase tracking-wider
           transition-all duration-200
           hover:bg-[#E84E1F] hover:shadow-[0_4px_8px_rgba(252,89,39,0.3)]
           focus:outline-none focus:ring-2 focus:ring-sale-orange focus:ring-offset-2;
    border-radius: 0 !important;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center
           px-5 py-3 min-h-[44px]
           bg-transparent text-brand-black
           border border-warm-border
           font-body text-caption font-normal
           transition-all duration-200
           hover:border-brand-black hover:bg-cream-soft
           focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-offset-1;
    border-radius: 0 !important;
  }

  .btn-ghost {
    @apply inline-flex items-center gap-1
           py-2 px-0
           bg-transparent text-accent-gold
           border-0 text-caption font-normal
           transition-all duration-200
           hover:underline hover:text-[#8a7040]
           focus:outline-none;
  }

  /* Product Card */
  .product-card {
    @apply relative bg-white border border-natural-beige
           overflow-hidden cursor-pointer
           transition-all duration-200;
    border-radius: 0 !important;
  }

  .product-card:hover {
    @apply shadow-card-hover;
    transform: translateY(-2px) scale(1.01);
  }

  /* Category Pill */
  .category-pill {
    @apply inline-flex items-center gap-2
           px-6 py-3 min-h-[44px]
           bg-transparent text-brand-black
           border border-warm-border
           font-body text-caption font-normal
           whitespace-nowrap cursor-pointer
           transition-all duration-200
           hover:border-brand-black hover:bg-cream-soft;
    border-radius: 0 !important;
  }

  .category-pill-active {
    @apply bg-brand-black text-white border-brand-black;
  }

  /* Badge */
  .badge-gold {
    @apply inline-block px-3 py-1.5
           bg-accent-gold text-white
           font-body text-xs font-bold uppercase tracking-wider;
    border-radius: 0 !important;
  }

  /* Section Containers */
  .section-container {
    @apply w-full max-w-container mx-auto
           px-5 md:px-10 lg:px-20
           py-section-sm md:py-section-md lg:py-section-lg;
  }

  /* Form Inputs */
  .form-input {
    @apply w-full px-4 py-3
           bg-white text-brand-black
           border border-warm-border
           font-body text-body placeholder-neutral-warm
           transition-all duration-150
           focus:border-2 focus:border-brand-black
           focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,33,33,0.08)];
    border-radius: 0 !important;
  }

  .form-input-error {
    @apply border-2 border-deep-red;
  }

  /* Parallax Elements */
  .parallax-element {
    will-change: transform;
    backface-visibility: hidden;
    transform: translateZ(0);
  }
}

/* ─── Shimmer Animation ─────────────────────────────────── */
.shimmer-effect::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
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

/* ─── Scroll Progress Bar ───────────────────────────────── */
.scroll-progress {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #AB8C52, #FC5927);
  transform-origin: left;
  z-index: 49;
}

/* ─── Reduced Motion ────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 3. Critical Bug Fixes (Implement First)

These must be resolved before any new feature work.

### Fix 1: Register `/shop` Route (HIGH PRIORITY)

```typescript
// src/App.tsx — Add Shop route
import Shop from "./pages/Shop";

// Inside <Routes>:
<Route path="/shop" element={<Shop />} />
```

### Fix 2: Wire Products from Supabase (HIGH PRIORITY)

```typescript
// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/data/products'; // Keep type

export function useProducts(category?: string) {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Product[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Usage in Index.tsx, Shop.tsx, ProductDetail.tsx:
const { data: products = [], isLoading, error } = useProducts(activeCategory);
```

### Fix 3: Persist Orders to Supabase (HIGH PRIORITY)

```typescript
// src/pages/Checkout.tsx — handleSubmit function
import { supabase } from '@/integrations/supabase/client';

const handleSubmit = async (formData: CheckoutForm) => {
  setIsSubmitting(true);
  try {
    const sessionId = localStorage.getItem('dharaa_session_id') || crypto.randomUUID();

    // 1. Insert order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        session_id: sessionId,
        full_name:       formData.fullName,
        email:           formData.email,
        phone:           formData.phone,
        address:         formData.address,
        city:            formData.city,
        pincode:         formData.pincode,
        payment_method:  paymentMethod,
        payment_status:  'pending',
        order_status:    'pending',
        subtotal:        subtotal,
        shipping_charge: shippingCharge,
        total_amount:    subtotal + shippingCharge,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert order items
    const orderItems = cartItems.map(item => ({
      order_id:       order.id,
      product_id:     item.product.id,
      product_name:   item.product.name,
      product_image:  item.product.image,
      price:          item.product.price,
      quantity:       item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    clearCart();
    toast.success("Order placed! We'll contact you soon. 🎉");
    navigate('/');
  } catch (err) {
    console.error('Order submission error:', err);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};
```

### Fix 4: Cart Persistence to localStorage (MEDIUM PRIORITY)

```typescript
// src/contexts/CartContext.tsx — Add localStorage sync
const CART_KEY = 'dharaa_cart';

// Load initial state from localStorage
const [items, setItems] = useState<CartItem[]>(() => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
});

// Sync to localStorage on every change
useEffect(() => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}, [items]);
```

### Fix 5: Scope Orders RLS Policy (MEDIUM PRIORITY)

```sql
-- supabase/migrations/002_fix_orders_rls.sql
DROP POLICY IF EXISTS "Users can view their orders" ON public.orders;

CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (
    session_id = current_setting('request.headers', true)::json->>'x-session-id'
    OR EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );
```

### Fix 6: Filter Inactive Products in RLS (LOW PRIORITY)

```sql
-- supabase/migrations/003_fix_products_rls.sql
DROP POLICY IF EXISTS "Products are publicly readable" ON public.products;

CREATE POLICY "Active products are publicly readable" ON public.products
  FOR SELECT USING (is_active = true);
```

### Fix 7: Free Shipping Threshold (LOW PRIORITY)

```typescript
// src/pages/Checkout.tsx
const baseShipping = paymentMethod === 'online' ? 50 : 70;
const shippingCharge = subtotal >= 499 ? 0 : baseShipping;
```

---

## 4. Component Build Order

Build components in this sequence — each layer depends on the previous.

### Phase 1: Foundation (Days 1–2)

```
1. Design tokens → tailwind.config.ts + index.css
2. Font files → /public/fonts/
3. Global utility classes (btn-primary, form-input, etc.)
4. Fix Route registration (Fix 1 above)
5. Fix cart persistence (Fix 4 above)
```

### Phase 2: Core Components (Days 3–6)

```
6.  PreLoader.tsx          — Branded loading screen
7.  Header.tsx             — Fixed nav with search/cart/wishlist icons
8.  Footer.tsx             — Full footer with all link columns
9.  ProductCard.tsx        — Redesigned card with hover effects
10. ProductGrid.tsx        — Responsive grid with stagger animation
11. Categories.tsx         — Filter pills with animated active state
12. CartDrawer.tsx         — Slide-in cart with quantity controls
13. WishlistDrawer.tsx     — Slide-in wishlist with add-to-cart
14. SearchModal.tsx        — Full-screen search overlay
```

### Phase 3: Pages (Days 7–12)

```
15. Index.tsx (Homepage)
    - Hero section (parallax)
    - FeaturedCategories.tsx
    - Best Sellers grid
    - DealsBanner.tsx
    - Full Category + Product Grid

16. Shop.tsx
    - Category filter
    - URL param sync
    - Product grid

17. ProductDetail.tsx
    - Image gallery
    - Quantity selector
    - Add to cart + wishlist

18. Checkout.tsx
    - Contact form + OTP flow
    - Address form
    - Payment selector
    - Order summary sidebar

19. About.tsx
    - Brand story
    - Values grid
    - CTA section
```

### Phase 4: Backend Integration (Days 13–16)

```
20. useProducts hook (Fix 2)
21. Order submission (Fix 3)
22. OTP Edge Function (Twilio/MSG91)
23. Wishlist sync to Supabase
24. SQL migrations (Fixes 5, 6, 7)
```

### Phase 5: Admin Dashboard (Days 17–22)

```
25. Admin auth guard (route wrapper)
26. /admin/products — CRUD table with modals
27. /admin/orders   — Orders table with status update
28. Product image upload to Supabase Storage
```

### Phase 6: Polish & Performance (Days 23–26)

```
29. Parallax effects (see Parallax.md)
30. Scroll progress bar
31. Loading skeletons for all data-fetched components
32. Error boundary components
33. SEO meta tags
34. Performance audit + image optimisation
```

---

## 5. Component Implementation Reference

### 5.1 PreLoader Component

```tsx
// src/components/PreLoader.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PreLoaderProps {
  isLoading: boolean;
}

export default function PreLoader({ isLoading }: PreLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.span
              className="font-heading text-4xl font-light tracking-[0.3em] text-brand-black"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              DHARAA
            </motion.span>
            <Sparkles size={16} className="text-accent-gold animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 5.2 ProductCard Component

```tsx
// src/components/ProductCard.tsx
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/data/products';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      className="product-card group"
    >
      {/* Image Area */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        {/* Wishlist Button */}
        <motion.button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white border border-warm-border opacity-0 group-hover:opacity-100 transition-opacity"
          whileTap={{ scale: 0.9 }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-deep-red text-deep-red' : 'text-brand-black'}
          />
        </motion.button>
      </Link>

      {/* Text Area */}
      <div className="p-4">
        <span className="badge-gold mb-2 inline-block">{product.category}</span>
        <h3 className="font-body text-body text-brand-black mb-1 line-clamp-2">{product.name}</h3>
        <p className="font-body text-caption text-slate-gray mb-3">₹{product.price}</p>

        {/* Add to Cart — appears on hover */}
        <motion.button
          onClick={() => addToCart(product)}
          className="btn-secondary w-full flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          whileTap={{ scale: 0.97 }}
        >
          <ShoppingBag size={14} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
```

### 5.3 Hero Section Component

```tsx
// src/components/Hero.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgY       = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%","0%"] : ["0%","40%"]);
  const bgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY     = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%","0%"] : ["0%","20%"]);
  const textOp    = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const badge1Y   = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0px","0px"] : ["0px","-40px"]);
  const badge2Y   = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0px","0px"] : ["0px","20px"]);
  const scrollOp  = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden" id="hero">
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 parallax-element"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src="/images/hero-jewelry.jpg"
          alt="DHARAA Jewelry Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center section-container"
        style={{ y: textY, opacity: textOp }}
      >
        {/* Pre-headline badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="badge-gold mb-6 self-start"
        >
          New Collection 2026
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-heading text-display font-light text-white mb-6 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Everyday Accessories,<br />Thoughtfully Crafted
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="font-body text-body-lg text-white/85 mb-10 max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Handcrafted jewelry for the woman who knows exactly who she is.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Link to="/shop" className="btn-primary">Shop Now</Link>
          <Link to="/shop" className="btn-secondary border-white/50 text-white hover:bg-white/10">
            View Collections
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap gap-3 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {[
            { label: 'Customers', value: '5000+' },
            { label: 'Products', value: '500+' },
            { label: 'Rating', value: '4.9 ★' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="px-4 py-3 bg-white/12 backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.15 }}
            >
              <p className="font-heading text-xl font-light text-white">{stat.value}</p>
              <p className="font-body text-xs text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Badges */}
      <motion.div
        className="absolute top-1/4 right-16 hidden lg:block parallax-element"
        style={{ y: badge1Y }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="bg-white px-4 py-3 border border-natural-beige shadow-elevated">
          <p className="font-body text-caption text-brand-black font-bold">Premium Quality 💎</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-16 hidden lg:block parallax-element"
        style={{ y: badge2Y }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <div className="bg-white px-4 py-3 border border-natural-beige shadow-elevated">
          <p className="font-body text-caption text-brand-black font-bold">Fast Delivery 🚚</p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: scrollOp }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        <ChevronDown size={24} className="text-white/70" />
      </motion.div>
    </section>
  );
}
```

---

## 6. OTP Integration (Phase 4)

### 6.1 Supabase Edge Function — Send OTP

```typescript
// supabase/functions/send-otp/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const { phone } = await req.json();

  // Validate Indian phone number
  if (!/^[6-9]\d{9}$/.test(phone)) {
    return new Response(JSON.stringify({ error: 'Invalid phone number' }), { status: 400 });
  }

  // Generate 4-digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // Store OTP (in production: hash this with bcrypt)
  await supabase.from('otp_verifications').insert({
    phone,
    otp,
    expires_at: expiresAt.toISOString(),
    verified: false,
  });

  // Send via MSG91
  const msg91Response = await fetch('https://api.msg91.com/api/v5/otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'authkey': Deno.env.get('MSG91_AUTH_KEY')! },
    body: JSON.stringify({
      template_id: Deno.env.get('MSG91_TEMPLATE_ID'),
      mobile: `91${phone}`,
      otp,
    }),
  });

  if (!msg91Response.ok) throw new Error('SMS send failed');

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
```

---

## 7. Admin Dashboard (Phase 5)

### 7.1 Admin Route Guard

```tsx
// src/components/AdminGuard.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsAdmin(false); return; }

      const { data } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', user.id)
        .single();

      setIsAdmin(!!data);
    };
    checkAdmin();
  }, []);

  if (isAdmin === null) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}
```

### 7.2 Admin Routes in App.tsx

```tsx
import AdminGuard from './components/AdminGuard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';

// In <Routes>:
<Route path="/admin/products" element={<AdminGuard><AdminProducts /></AdminGuard>} />
<Route path="/admin/orders"   element={<AdminGuard><AdminOrders /></AdminGuard>} />
```

---

## 8. Schema Migrations (Ordered)

Apply in sequence:

```bash
# 001 — Already exists (initial schema)
# Apply remaining fixes:

supabase migration new fix_shop_route_and_rls
```

```sql
-- supabase/migrations/002_fixes.sql

-- 1. Fix orders SELECT policy
DROP POLICY IF EXISTS "Users can view their orders" ON public.orders;
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (
    session_id = current_setting('request.headers', true)::json->>'x-session-id'
    OR EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- 2. Filter inactive products
DROP POLICY IF EXISTS "Products are publicly readable" ON public.products;
CREATE POLICY "Active products are publicly readable" ON public.products
  FOR SELECT USING (is_active = true);

-- 3. Session-scoped wishlist
DROP POLICY IF EXISTS "Anyone can read wishlists by session" ON public.wishlists;
DROP POLICY IF EXISTS "Anyone can insert wishlist items" ON public.wishlists;
DROP POLICY IF EXISTS "Anyone can delete their wishlist items" ON public.wishlists;
CREATE POLICY "Session-scoped wishlist" ON public.wishlists
  FOR ALL USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');

-- 4. Performance indexes
CREATE INDEX IF NOT EXISTS idx_products_category  ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products (is_active);
CREATE INDEX IF NOT EXISTS idx_wishlists_session  ON public.wishlists (session_id);
CREATE INDEX IF NOT EXISTS idx_orders_session     ON public.orders (session_id);

-- 5. OTP cleanup (run via pg_cron or manual scheduled job)
-- DELETE FROM public.otp_verifications WHERE expires_at < now() - INTERVAL '1 day';
```

---

## 9. Testing Plan

### 9.1 Component Tests (Vitest + React Testing Library)

```bash
npm install -D vitest @testing-library/react @testing-library/user-event
```

Key test scenarios:
- `ProductCard`: renders name, price, image; fires addToCart on button click
- `CartDrawer`: shows items; quantity controls update count; checkout button navigates
- `Checkout`: form validates all fields; OTP gate blocks submission; success clears cart
- `useProducts`: returns filtered products; handles loading and error states
- `CategoryFilter`: filters product list; updates URL param

### 9.2 Manual QA Checklist

**Critical Paths:**
- [ ] Browse → add to cart → checkout → order placed → order in Supabase
- [ ] Category filter → URL updates → page refresh → same filter active
- [ ] Wishlist → persist across page reload → add to cart from wishlist
- [ ] Product detail → quantity selector → add N units → cart shows correct quantity
- [ ] Checkout with empty cart → redirect to /shop (not blank page)
- [ ] Invalid phone → OTP button disabled → good phone → OTP sent → 4 digits → submit

**Responsive:**
- [ ] Mobile (375px): 2-column product grid, hamburger nav, full-width drawers
- [ ] Tablet (768px): 3-column grid, condensed nav
- [ ] Desktop (1280px): 4-column grid, full nav

**Accessibility:**
- [ ] Keyboard navigation: Tab through all interactive elements
- [ ] Escape key closes all modals and drawers
- [ ] Screen reader: all images have alt text, buttons have labels
- [ ] Contrast: all text meets 4.5:1 minimum

**Performance:**
- [ ] Lighthouse score: Performance >90, Accessibility >95, SEO >90
- [ ] LCP (Largest Contentful Paint): <2.5s on 3G
- [ ] CLS (Cumulative Layout Shift): <0.1
- [ ] No layout shift from parallax initial positions

---

## 10. SEO & Meta

```tsx
// src/components/PageMeta.tsx — Add to each page
import { Helmet } from 'react-helmet-async'; // npm install react-helmet-async

interface PageMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function PageMeta({
  title = 'DHARAA — Everyday Accessories, Thoughtfully Crafted',
  description = 'Handcrafted jewelry for everyday wear. Anti-tarnish earrings, oxidised jewelry, gift combos — starting from ₹59.',
  image = '/og-image.jpg',
  url = 'https://dharaa.com',
}: PageMetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
```

---

## 11. Deployment

### 11.1 Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard:
# VITE_SUPABASE_URL
# VITE_SUPABASE_PUBLISHABLE_KEY

# SPA fallback — create vercel.json:
```

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/images/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400" }]
    }
  ]
}
```

### 11.2 Production Checklist

```
Pre-launch:
[ ] All 7 critical bug fixes applied and tested
[ ] Supabase migrations pushed to production
[ ] Environment variables set in deployment platform
[ ] Real product photography uploaded to Supabase Storage
[ ] OTP SMS integration live (MSG91 credentials)
[ ] Font files in /public/fonts/ (licensed)
[ ] og:image created (1200×630px)
[ ] robots.txt and sitemap.xml
[ ] Google Analytics / Plausible analytics integrated
[ ] Error monitoring (Sentry) integrated

Post-launch:
[ ] Lighthouse audit (target: >90 all scores)
[ ] Real-device testing on Android (Chrome) + iOS (Safari)
[ ] Order flow tested end-to-end in production
[ ] Admin dashboard tested with real admin account
[ ] Supabase connection pooling configured for traffic spikes
```

---

## 12. Technical Debt Resolution Timeline

| # | Issue | Priority | Sprint |
|---|---|---|---|
| 1 | Register /shop route | Critical | Week 1 |
| 2 | Supabase product fetch | Critical | Week 1 |
| 3 | Order persistence | Critical | Week 2 |
| 4 | Real OTP via MSG91 | High | Week 2 |
| 5 | Cart localStorage | High | Week 1 |
| 6 | Orders RLS fix | High | Week 1 |
| 7 | Products RLS fix | Medium | Week 1 |
| 8 | Free shipping threshold | Medium | Week 2 |
| 9 | Stock decrement on order | Medium | Week 3 |
| 10 | Real product photography | High | Week 2 |
| 11 | Admin dashboard | Medium | Week 4 |
| 12 | Remove unused packages | Low | Week 4 |
