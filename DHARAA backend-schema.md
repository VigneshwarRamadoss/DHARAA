# Backend Schema Documentation
## DHARAA — Jewelry E-Commerce Platform

**Version:** 1.0  
**Date:** May 2026  
**Database:** PostgreSQL (via Supabase)  
**Migration file:** `supabase/migrations/*.sql`

---

## 1. Overview

The database consists of **6 tables** in the `public` schema. All tables have Row Level Security (RLS) enabled. The system uses UUID primary keys, timestamp auditing, and cascading foreign keys.

```
┌──────────────┐        ┌──────────────────┐
│  admin_users │        │    products       │
│  ──────────  │        │  ──────────────   │
│  id (PK)     │        │  id (PK)          │
│  user_id FK→ │        │  name             │
│    auth.users│        │  description      │
│  name        │        │  price            │
│  email       │        │  image_url        │
│  role        │        │  category         │
│  created_at  │        │  stock            │
│  updated_at  │        │  is_active        │
└──────────────┘        │  created_at       │
                        │  updated_at       │
                        └──────┬───────────┘
                               │ (1:N)
              ┌────────────────┴──────────────┐
              │                               │
    ┌─────────▼──────────┐        ┌──────────▼───────────┐
    │     wishlists       │        │     order_items       │
    │  ─────────────────  │        │  ─────────────────    │
    │  id (PK)            │        │  id (PK)              │
    │  session_id         │        │  order_id FK→ orders  │
    │  product_id FK→     │        │  product_id FK→       │
    │    products         │        │    products (SET NULL) │
    │  created_at         │        │  product_name (copy)  │
    └─────────────────────┘        │  product_image (copy) │
                                   │  price (snapshot)     │
    ┌─────────────────────┐        │  quantity             │
    │      orders         │        │  created_at           │
    │  ─────────────────  │        └──────────────────────┘
    │  id (PK)            │
    │  session_id         │        ┌─────────────────────┐
    │  full_name          │        │  otp_verifications   │
    │  email              │        │  ─────────────────   │
    │  phone              │        │  id (PK)             │
    │  address            │        │  phone               │
    │  city               │        │  otp                 │
    │  pincode            │        │  expires_at          │
    │  payment_method     │        │  verified            │
    │  payment_status     │        │  created_at          │
    │  order_status       │        └─────────────────────┘
    │  subtotal           │
    │  shipping_charge    │
    │  total_amount       │
    │  razorpay_order_id  │
    │  razorpay_payment_id│
    │  created_at         │
    │  updated_at         │
    └─────────────────────┘
```

---

## 2. Table Definitions

---

### 2.1 `admin_users`

Stores admin accounts linked to Supabase Auth users.

```sql
CREATE TABLE public.admin_users (
  id         UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID        NOT NULL UNIQUE REFERENCES auth.users ON DELETE CASCADE,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  role       TEXT        NOT NULL DEFAULT 'admin'
                         CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Internal record ID |
| `user_id` | UUID | UNIQUE, FK → `auth.users` | Supabase Auth user reference |
| `name` | TEXT | NOT NULL | Admin display name |
| `email` | TEXT | NOT NULL | Admin email address |
| `role` | TEXT | CHECK: `admin` or `super_admin` | Access tier |
| `created_at` | TIMESTAMPTZ | NOT NULL, default `now()` | Record creation time |
| `updated_at` | TIMESTAMPTZ | NOT NULL, auto-updated | Last modification time |

**Indexes:**
- Primary key on `id`
- Unique constraint on `user_id`

**Trigger:** `update_admin_users_updated_at` → calls `update_updated_at_column()` before UPDATE

**Notes:**
- Cascade delete: if the auth user is deleted, the admin record is removed
- `super_admin` role has elevated privileges to manage other admin accounts

---

### 2.2 `products`

Master product catalogue managed by admins.

```sql
CREATE TABLE public.products (
  id          UUID           NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT           NOT NULL,
  description TEXT,
  price       DECIMAL(10, 2) NOT NULL,
  image_url   TEXT           NOT NULL,
  category    TEXT           NOT NULL,
  stock       INTEGER        NOT NULL DEFAULT 0,
  is_active   BOOLEAN        NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ    NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ    NOT NULL DEFAULT now()
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Product ID |
| `name` | TEXT | NOT NULL | Display name (e.g. "Golden Leaf Studs") |
| `description` | TEXT | NULLABLE | Long description text |
| `price` | DECIMAL(10,2) | NOT NULL | Price in INR (e.g. `149.00`) |
| `image_url` | TEXT | NOT NULL | Primary product image URL |
| `category` | TEXT | NOT NULL | Category slug: `anti-tarnish`, `under-99`, `combos`, `oxidised` |
| `stock` | INTEGER | NOT NULL, default `0` | Available inventory count |
| `is_active` | BOOLEAN | NOT NULL, default `true` | Whether product is shown to shoppers |
| `created_at` | TIMESTAMPTZ | NOT NULL | Record creation time |
| `updated_at` | TIMESTAMPTZ | NOT NULL, auto-updated | Last modification time |

**Trigger:** `update_products_updated_at` → calls `update_updated_at_column()` before UPDATE

**Valid category values** (from frontend data):
- `anti-tarnish`
- `under-99`
- `combos`
- `oxidised`

**Notes:**
- `is_active = false` products should be hidden from public queries (not enforced in current RLS — see gap below)
- `stock` is not currently decremented on order placement (see TRS gap #10)
- `⚠ Current frontend uses static `products.ts` instead of this table`

---

### 2.3 `wishlists`

Maps anonymous session IDs to saved product IDs.

```sql
CREATE TABLE public.wishlists (
  id         UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT        NOT NULL,
  product_id UUID        NOT NULL REFERENCES public.products ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(session_id, product_id)
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-generated | Record ID |
| `session_id` | TEXT | NOT NULL | Anonymous user session ID (from `localStorage`) |
| `product_id` | UUID | FK → `products`, CASCADE DELETE | Saved product |
| `created_at` | TIMESTAMPTZ | NOT NULL | When item was wishlisted |

**Unique constraint:** `(session_id, product_id)` — prevents duplicate wishlist entries per session.

**Cascade:** If a product is deleted, all wishlist entries for it are deleted automatically.

**Notes:**
- Session ID generated client-side via `crypto.randomUUID()` stored in `localStorage`
- `⚠ Current frontend stores wishlist in localStorage only; this table is unused`

---

### 2.4 `orders`

Stores completed order header information.

```sql
CREATE TABLE public.orders (
  id                  UUID           NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id          TEXT           NOT NULL,
  full_name           TEXT           NOT NULL,
  email               TEXT           NOT NULL,
  phone               TEXT           NOT NULL,
  address             TEXT           NOT NULL,
  city                TEXT           NOT NULL,
  pincode             TEXT           NOT NULL,
  payment_method      TEXT           NOT NULL
                      CHECK (payment_method IN ('online', 'cod')),
  payment_status      TEXT           NOT NULL DEFAULT 'pending'
                      CHECK (payment_status IN ('pending', 'completed', 'failed')),
  order_status        TEXT           NOT NULL DEFAULT 'pending'
                      CHECK (order_status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  subtotal            DECIMAL(10, 2) NOT NULL,
  shipping_charge     DECIMAL(10, 2) NOT NULL,
  total_amount        DECIMAL(10, 2) NOT NULL,
  razorpay_order_id   TEXT,
  razorpay_payment_id TEXT,
  created_at          TIMESTAMPTZ    NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ    NOT NULL DEFAULT now()
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Order ID |
| `session_id` | TEXT | NOT NULL | Customer's anonymous session ID |
| `full_name` | TEXT | NOT NULL | Customer's full name |
| `email` | TEXT | NOT NULL | Customer's email address |
| `phone` | TEXT | NOT NULL | Customer's 10-digit mobile number |
| `address` | TEXT | NOT NULL | Full delivery address |
| `city` | TEXT | NOT NULL | Delivery city |
| `pincode` | TEXT | NOT NULL | 6-digit Indian PIN code |
| `payment_method` | TEXT | CHECK: `online` or `cod` | Payment type selected |
| `payment_status` | TEXT | CHECK: `pending`, `completed`, `failed` | Payment state |
| `order_status` | TEXT | CHECK: see values below | Fulfilment state |
| `subtotal` | DECIMAL(10,2) | NOT NULL | Cart total before shipping |
| `shipping_charge` | DECIMAL(10,2) | NOT NULL | Shipping fee (`50.00` or `70.00`) |
| `total_amount` | DECIMAL(10,2) | NOT NULL | Final grand total (subtotal + shipping) |
| `razorpay_order_id` | TEXT | NULLABLE | Razorpay order ID (for online payments) |
| `razorpay_payment_id` | TEXT | NULLABLE | Razorpay payment ID (post-capture) |
| `created_at` | TIMESTAMPTZ | NOT NULL | Order placed time |
| `updated_at` | TIMESTAMPTZ | NOT NULL, auto-updated | Last status update time |

**Order Status Lifecycle:**
```
pending → confirmed → shipped → delivered
                              ↘ cancelled
```

**Payment Status:**
```
pending → completed   (online, post Razorpay capture)
        → failed      (online, payment failed)
  (COD orders remain 'pending' until delivered)
```

**Trigger:** `update_orders_updated_at` → calls `update_updated_at_column()` before UPDATE

**Notes:**
- No FK to `auth.users` — supports anonymous checkout
- `razorpay_*` fields reserved for payment gateway integration (not yet wired)
- `⚠ Current checkout flow never writes to this table — orders are simulated`

---

### 2.5 `order_items`

Line items belonging to an order. Denormalised for historical accuracy.

```sql
CREATE TABLE public.order_items (
  id            UUID           NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id      UUID           NOT NULL REFERENCES public.orders ON DELETE CASCADE,
  product_id    UUID           NOT NULL REFERENCES public.products ON DELETE SET NULL,
  product_name  TEXT           NOT NULL,
  product_image TEXT           NOT NULL,
  price         DECIMAL(10, 2) NOT NULL,
  quantity      INTEGER        NOT NULL,
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT now()
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | Line item ID |
| `order_id` | UUID | FK → `orders` CASCADE | Parent order |
| `product_id` | UUID | FK → `products` SET NULL | Product reference (nullable after deletion) |
| `product_name` | TEXT | NOT NULL | Snapshot of product name at time of order |
| `product_image` | TEXT | NOT NULL | Snapshot of product image URL at time of order |
| `price` | DECIMAL(10,2) | NOT NULL | Snapshot of unit price at time of order |
| `quantity` | INTEGER | NOT NULL | Units purchased |
| `created_at` | TIMESTAMPTZ | NOT NULL | Record creation time |

**Cascade behaviour:**
- `order_id` CASCADE: line items deleted when parent order is deleted
- `product_id` SET NULL: if a product is deleted from catalogue, the order history is preserved with the snapshots; `product_id` becomes NULL

**Design note:** `product_name`, `product_image`, and `price` are intentionally copied (denormalised) from the product at order time. This preserves order history accuracy even if the product is later updated or deleted.

**Computed total per line:** `price × quantity` (not stored, computed at query time)

---

### 2.6 `otp_verifications`

Stores generated OTPs for phone verification at checkout.

```sql
CREATE TABLE public.otp_verifications (
  id         UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone      TEXT        NOT NULL,
  otp        TEXT        NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  verified   BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK | OTP record ID |
| `phone` | TEXT | NOT NULL | Phone number the OTP was sent to |
| `otp` | TEXT | NOT NULL | The generated OTP code (should be hashed in production) |
| `expires_at` | TIMESTAMPTZ | NOT NULL | Expiry timestamp |
| `verified` | BOOLEAN | NOT NULL, default `false` | Whether OTP was successfully verified |
| `created_at` | TIMESTAMPTZ | NOT NULL | When the OTP was generated |

**Notes:**
- No unique constraint on `phone` — multiple active OTPs per number are possible; should filter by `verified = false AND expires_at > now()`
- `otp` stored as plain text — **should be hashed** (bcrypt or SHA-256) in production
- No cleanup mechanism — old/expired rows accumulate. Recommend a scheduled job or Postgres TTL trigger to purge `expires_at < now()`
- `⚠ Current frontend simulates OTP; this table is unused`

---

## 3. Triggers & Functions

### 3.1 `update_updated_at_column()`

Reusable trigger function that sets `updated_at = now()` before any UPDATE.

```sql
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

Applied to:
- `admin_users` via `update_admin_users_updated_at`
- `products` via `update_products_updated_at`
- `orders` via `update_orders_updated_at`

---

## 4. Row Level Security Policies

### 4.1 `products` Table

| Policy | Operation | Rule | Notes |
|--------|-----------|------|-------|
| Products are publicly readable | SELECT | `USING (true)` | Anyone can read all products |
| Admins can manage products | ALL | `EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())` | Admin-only writes |

**⚠ Gap:** `is_active = false` products are readable by everyone. Active products filter should be applied:
```sql
-- Improved public read policy:
CREATE POLICY "Active products are publicly readable" ON public.products
  FOR SELECT USING (is_active = true);
```

---

### 4.2 `wishlists` Table

| Policy | Operation | Rule |
|--------|-----------|------|
| Anyone can read wishlists by session | SELECT | `USING (true)` |
| Anyone can insert wishlist items | INSERT | `WITH CHECK (true)` |
| Anyone can delete their wishlist items | DELETE | `USING (true)` |

**⚠ Gap:** All policies use `true` — any user can read or delete any wishlist entry. Should be scoped to session:
```sql
-- Scope to session header:
CREATE POLICY "Session-scoped wishlist access" ON public.wishlists
  FOR ALL USING (session_id = current_setting('request.headers')::json->>'x-session-id');
```

---

### 4.3 `orders` Table

| Policy | Operation | Rule | Notes |
|--------|-----------|------|-------|
| Anyone can create orders | INSERT | `WITH CHECK (true)` | Anonymous checkout supported |
| Users can view their orders | SELECT | `USING (true)` | **⚠ Too permissive** |
| Admins can view all orders | SELECT | Admin check | Redundant given above |
| Admins can update orders | UPDATE | Admin check | Status updates |

**⚠ Critical Gap:** The `"Users can view their orders"` policy grants SELECT to everyone on all rows. Fix:
```sql
DROP POLICY "Users can view their orders" ON public.orders;
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (
    session_id = current_setting('request.headers', true)::json->>'x-session-id'
    OR EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );
```

---

### 4.4 `order_items` Table

| Policy | Operation | Rule |
|--------|-----------|------|
| Anyone can insert order items | INSERT | `WITH CHECK (true)` |
| Anyone can view order items | SELECT | `USING (true)` |

**⚠ Gap:** Order items are readable by anyone. Should join to orders and check session_id.

---

### 4.5 `otp_verifications` Table

| Policy | Operation | Rule |
|--------|-----------|------|
| Anyone can manage OTP | ALL | `USING (true)` |

**⚠ Security Risk:** OTP codes (including unverified, unexpired ones) are readable by any client. In production:
- Store OTP as a hash
- Only allow INSERT and UPDATE (not SELECT) from client
- Verify via a Supabase Edge Function that does not expose the OTP value

---

### 4.6 `admin_users` Table

| Policy | Operation | Rule |
|--------|-----------|------|
| Admins can view admin users | SELECT | `auth.uid() = user_id` (own row only) |
| Super admins can manage admin users | ALL | Super admin check |

---

## 5. Relationships Summary

```
auth.users (Supabase)
    └── admin_users.user_id  (1:1, CASCADE DELETE)

products
    ├── wishlists.product_id     (1:N, CASCADE DELETE)
    └── order_items.product_id   (1:N, SET NULL on DELETE)

orders
    └── order_items.order_id     (1:N, CASCADE DELETE)
```

---

## 6. Recommended Schema Additions

The following additions are recommended to support planned features:

### 6.1 Product Images Table (multi-image support)

```sql
CREATE TABLE public.product_images (
  id         UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID        NOT NULL REFERENCES public.products ON DELETE CASCADE,
  url        TEXT        NOT NULL,
  sort_order INTEGER     NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 6.2 Coupon / Discount Codes

```sql
CREATE TABLE public.coupons (
  id               UUID           NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code             TEXT           NOT NULL UNIQUE,
  discount_type    TEXT           NOT NULL CHECK (discount_type IN ('percent', 'flat')),
  discount_value   DECIMAL(10, 2) NOT NULL,
  min_order_amount DECIMAL(10, 2),
  max_uses         INTEGER,
  used_count       INTEGER        NOT NULL DEFAULT 0,
  valid_from       TIMESTAMPTZ,
  valid_until      TIMESTAMPTZ,
  is_active        BOOLEAN        NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT now()
);
```

### 6.3 Add `session_id` Index

For performance on wishlist and order queries:

```sql
CREATE INDEX idx_wishlists_session_id ON public.wishlists (session_id);
CREATE INDEX idx_orders_session_id    ON public.orders    (session_id);
```

### 6.4 Add `category` Index on Products

```sql
CREATE INDEX idx_products_category   ON public.products (category);
CREATE INDEX idx_products_is_active  ON public.products (is_active);
```

### 6.5 OTP Cleanup

Add expiry-based cleanup:

```sql
-- Run via Supabase cron or pg_cron:
DELETE FROM public.otp_verifications
WHERE expires_at < now() - INTERVAL '1 day';
```

---

## 7. Data Types Reference

| PostgreSQL Type | Used For | Notes |
|-----------------|----------|-------|
| `UUID` | All primary/foreign keys | Generated via `gen_random_uuid()` |
| `TEXT` | Names, addresses, URLs, status enums | Unlimited length; enums enforced via CHECK |
| `DECIMAL(10,2)` | Prices and monetary values | 10 digits total, 2 decimal places; max ₹99,999,999.99 |
| `INTEGER` | Counts (stock, quantity) | Standard 4-byte int |
| `BOOLEAN` | Flags (`is_active`, `verified`) | TRUE/FALSE |
| `TIMESTAMPTZ` | All timestamps | Timezone-aware; stored in UTC |

---

## 8. Migration File Location

```
supabase/
└── migrations/
    └── <timestamp>_initial_schema.sql   # All tables, policies, triggers
```

Apply locally with:
```bash
supabase db reset       # Reset and re-apply all migrations
supabase db push        # Push to linked remote project
supabase migration new  # Create a new migration file
```
