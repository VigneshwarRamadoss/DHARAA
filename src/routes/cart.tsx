import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Minus, Plus, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/data/products';
import { useMemo } from 'react';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { OptimizedImage } from '@/components/OptimizedImage';

export const Route = createFileRoute('/cart')({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your Cart — DHARAA" },
      { name: "description", content: "Review your selected jewelry pieces." }
    ]
  })
});

function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const prefersReduced = useReducedMotion();

  // Cross-sell items: pick some items not in the cart
  const crossSellProducts = useMemo(() => {
    const cartProductIds = new Set(items.map(item => item.product.id));
    return mockProducts.filter(p => !cartProductIds.has(p.id)).slice(0, 4);
  }, [items]);

  return (
    <div className="min-h-screen bg-cream-soft relative selection:bg-gold selection:text-background font-sans">
      <Nav />
      {/* We keep the drawers in the tree but they only open via Nav if implemented that way, or we just keep them for consistency */}
      <CartDrawer />
      <WishlistDrawer />

      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-[1500px] mx-auto border-b border-border">
        <div className="max-w-xl">
          <span className="font-mono text-[9px] text-gold uppercase tracking-[0.3em] font-semibold mb-4 block">
            § YOUR SELECTION
          </span>
          <h1 className="font-display text-5xl md:text-[64px] text-ink font-light leading-tight mb-4">
            Reviewed. <em className="italic text-gold">Decided.</em>
          </h1>
          <div className="flex items-center justify-between">
            <p className="font-sans text-[13px] text-slate">
              {items.length === 1 ? "1 item" : `${items.length} items`} ready for checkout.
            </p>
            <Link to="/shop" className="hidden md:inline-flex font-mono text-[10px] text-ink hover:text-gold uppercase tracking-widest font-bold border-b border-ink hover:border-gold transition-colors pb-1">
              Continue Shopping →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-12 py-12 max-w-[1500px] mx-auto">
        {items.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center">
            {/* Animated Shopping Bag */}
            <div className="w-24 h-24 mb-8 relative">
              <motion.svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#AB8C52" 
                strokeWidth="0.5"
                className="w-full h-full"
                initial={{ strokeDasharray: 100, strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </motion.svg>
            </div>
            <h2 className="font-display text-4xl text-ink font-light mb-4">Your tray is empty.</h2>
            <p className="font-sans text-[13px] text-slate mb-8">Add pieces that speak to you.</p>
            <Link to="/shop" className="bg-ink text-white hover:bg-gold transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-4 px-8 rounded-none">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left: Cart Items (60%) */}
            <div className="w-full lg:w-3/5 flex flex-col">
              {items.map((item, index) => (
                <motion.div 
                  key={item.product.id}
                  className="flex gap-6 py-8 border-b border-border/50 hover:bg-cream-soft/50 transition-colors duration-200 group"
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  {/* Image */}
                  <Link to="/product/$id" params={{ id: item.product.id }} className="shrink-0">
                    <OptimizedImage 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-24 h-24 md:w-32 md:h-32 object-cover border border-border"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <Link to="/product/$id" params={{ id: item.product.id }}>
                          <h3 className="font-display text-xl text-ink font-light group-hover:text-gold transition-colors">{item.product.name}</h3>
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate hover:text-red transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <span className="font-mono text-[9px] text-gold uppercase tracking-[0.2em] font-semibold">
                        {item.product.category}
                      </span>
                      <p className="font-sans text-[11px] text-slate mt-2">₹{item.product.price}</p>
                    </div>

                    <div className="flex items-end justify-between mt-6">
                      {/* Custom Quantity Control */}
                      <div className="flex items-center border border-ink/20 bg-transparent">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 text-ink hover:bg-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-mono text-xs text-ink">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 text-ink hover:bg-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Line Total */}
                      <p className="font-sans text-sm font-bold text-ink">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Order Summary (40%) */}
            <div className="w-full lg:w-2/5 sticky top-28">
              <motion.div 
                className="bg-ink p-8 md:p-10 text-white"
                initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="font-mono text-[9px] text-gold uppercase tracking-[0.3em] font-semibold mb-8 block">
                  § ORDER SUMMARY
                </span>

                {/* Line Items */}
                <div className="flex flex-col gap-4 mb-8">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between items-start font-mono text-[11px] text-white/60">
                      <span className="truncate pr-4">{item.quantity}x {item.product.name}</span>
                      <span className="shrink-0">₹{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full h-[1px] bg-gold/20 mb-6" />

                {/* Subtotal */}
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans text-[12px] text-white/60">Subtotal</span>
                  <span className="font-display text-3xl font-light">₹{cartTotal}</span>
                </div>
                <p className="font-mono text-[9px] text-white/40 mb-8 uppercase tracking-widest text-right">
                  Shipping & taxes at checkout
                </p>

                {/* CTA */}
                <Link 
                  to="/checkout"
                  className="block w-full text-center bg-gold text-white hover:bg-[#96783f] transition-colors duration-300 font-mono text-[11px] font-bold uppercase tracking-widest py-4 rounded-none mb-6"
                >
                  Proceed to Checkout →
                </Link>

                <div className="text-center">
                  <button 
                    onClick={clearCart}
                    className="font-mono text-[9px] text-white/40 hover:text-red transition-colors uppercase tracking-widest border-b border-transparent hover:border-red pb-1"
                  >
                    Clear Cart
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        )}
      </section>

      {/* Cross-Sell Strip */}
      {crossSellProducts.length > 0 && (
        <section className="bg-background py-20 border-t border-border">
          <div className="max-w-[1500px] mx-auto px-6 md:px-12">
            <span className="font-mono text-[9px] text-gold uppercase tracking-[0.3em] font-semibold mb-4 block text-center md:text-left">
              § COMPLETE THE LOOK
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink font-light mb-12 text-center md:text-left">
              Pairs beautifully with
            </h2>

            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 md:gap-8 pb-4">
              {crossSellProducts.map((product, i) => (
                <motion.div 
                  key={product.id}
                  className="w-[75vw] md:w-auto md:flex-1 shrink-0 snap-center"
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
