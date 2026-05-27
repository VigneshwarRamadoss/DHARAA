# DHARAA — Everyday Accessories, Thoughtfully Crafted

Welcome to **DHARAA**, a premium, minimal-luxury e-commerce destination. Thoughtfully crafted in Mumbai, DHARAA brings you everyday accessories that blend classic heritage with contemporary minimal aesthetics.

This document provides our clients, partners, and audience with an overview of who DHARAA is for, how the digital experience is structured, and the interactive features that make shopping seamless.

---

## 💎 Who is DHARAA For?

DHARAA is designed for the modern individual seeking high-quality, handcrafted jewelry that fits seamlessly into their daily lives without the luxury markup. 

Our collections are curated for:
* **The Style Enthusiast:** Individuals looking for versatile, minimal jewelry (from elegant office wear to statement evening pieces).
* **The Quality Conscious:** Shoppers who value **Anti-Tarnish** coatings, premium materials, and careful craftsmanship.
* **The Giver:** Those searching for curated, beautiful **Gift Combos** for loved ones.
* **The Savvy Curator:** Individuals seeking high-aesthetic designs at exceptionally accessible price points (starting from just ₹59).

---

## 🧭 How the Website Works

DHARAA provides a cohesive, high-fidelity single-page shopping experience. Every micro-interaction is designed to reflect the elegance of our jewelry.

### 1. The Preloader Experience
Every visit begins with a beautifully orchestrated logo reveal. A minimal dark-ink background displays the **DHARAA** logo with a golden sparkle animation before fading out, transitioning you smoothly into the storefront.

### 2. Intuitive Collection Discovery
* **Interactive Navigation & Mega Menu:** Hovering over the navigation bar triggers custom dropdown collections, letting you browse Anti-Tarnish, Oxidised, and Gift Combo categories directly.
* **Smart Pill Filters:** Browse our entire catalog on a single grid or filter instantly by collections:
  * **All ✨** — Explore the complete catalog.
  * **Anti-Tarnish 💎** — Premium, water-resistant everyday wear.
  * **Under ₹99 🏷️** — Pocket-friendly luxury starting from ₹59.
  * **Combos 🎁** — Pre-matched gift sets for any occasion.
  * **Oxidised Earrings 🌙** — Earthy, traditional craftsmanship for a statement look.
* **Instant Search Modal:** Tap the search icon to instantly filter products by name or category.

### 3. Deep Product Engagement
Clicking any item takes you to the **Product Detail Page** (`/product/:id`):
* **Dynamic Thumbnail Gallery:** View our products from multiple angles.
* **Detailed Material Specifications:** Learn about anti-tarnish properties, materials, and care guidelines.
* **Interactive Quantity Selector:** Select precisely how many pieces you'd like to add to your cart.

### 4. Direct Drawer Controls (Cart & Wishlist)
* **Wishlist Drawer:** Heart your favorite pieces at any time. Your curated wishlist stays persisted in your browser drawer so you can review them later.
* **Cart Drawer:** Add items to your bag and view your subtotal instantly. The cart drawer is accessible from any page, allowing you to edit quantities or proceed directly to checkout.

### 5. High-Validation, Frictionless Checkout
Our checkout page (`/checkout`) is streamlined to eliminate complexity:
* **Indian OTP Phone Verification:** Secure checkout starts with your phone number. Request an OTP to receive a simulated code instantly, verifying your order with one tap.
* **Smart Shipping Estimation:** Shipping is automatically calculated based on your preference:
  * **Online Payment (UPI/Cards/Net Banking):** Lower shipping fee of ₹50.
  * **Cash on Delivery (COD):** Secure shipping fee of ₹70.
* **Order Processing Animation:** Click "Place Order" to initiate a beautiful, minimal golden loading state while your order is securely processed.

---

## 🛠️ The Technical Philosophy (Behind the Scenes)

DHARAA is engineered for visual excellence, performance, and accessibility:
* **Framework:** Powered by **React 19** and **Vite**, with high-performance routing via **TanStack Router**.
* **Styling System:** Styled using **Tailwind CSS** with a custom luxury palette (Deep Ink background, Off-white linen surfaces, and Warm Antique Gold accents).
* **State Management:** Fully client-driven Cart and Wishlist contexts, ensuring that items never disappear during your session.
* **Validation & Security:** Powered by **Zod** schema validations to ensure address details, pin codes, and contact info are flawless before processing.

---

*DHARAA is owned and operated by **The Dot** company.*
*All designs, assets, and rights are reserved. For partnerships or support, contact hello@dharaa.com.*
