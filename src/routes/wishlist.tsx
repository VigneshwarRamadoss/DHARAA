import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Heart, X, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/data/products';
import { useMemo } from 'react';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { OptimizedImage } from '@/components/OptimizedImage';

export const Route = createFileRoute('/wishlist')({
  component: WishlistPage,
  head: () => ({
    meta: [
      { title: "Your Wishlist — DHARAA" },
      { name: "description", content: "Your curated selection of DHARAA jewelry." }
    ]
  })
});

function WishlistPage() {
  const { items, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const prefersReduced = useReducedMotion();

  // Recommendation items: pick items from the same categories as the wishlist items
  const recommendationProducts = useMemo(() => {
    if (items.length === 0) return [];
    const categories = new Set(items.map(item => item.category));
    const wishlistIds = new Set(items.map(item => item.id));
    return mockProducts
      .filter(p => categories.has(p.category) && !wishlistIds.has(p.id))
      .slice(0, 4);
  }, [items]);

  const moveAllToCart = () => {
    items.forEach(item => addToCart(item));
    clearWishlist();
  };

  return (
    <div className="min-h-screen bg-ink relative selection:bg-gold selection:text-background font-sans text-white">
      {/* We need Nav to support a "dark mode" or transparent mode, but Nav already adapts to background. */}
      {/* Since Nav has dark text by default, we'll need to force it to have white text here, or we can just let it use its transparent logic with white text if scrolled. Nav currently hardcodes text-ink. Let's add a wrapper or rely on Nav's existing implementation which might need an update for dark backgrounds. For now, Nav stays as is, we might need to modify Nav to support a dark theme prop later. */}
      <Nav />
      <CartDrawer />
      <WishlistDrawer />

      {/* Header Section (Full Bleed Dark) */}
      <section className="relative w-full min-h-[280px] md:min-h-[400px] flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
        
        {/* Floating Heart Decoration */}
        <motion.div 
          className="absolute right-[10%] top-[40%] md:top-[50%] -translate-y-1/2 opacity-20"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={120} strokeWidth={0.5} color="#AB8C52" className="fill-transparent" />
        </motion.div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <span className="font-mono text-[9px] text-gold uppercase tracking-[0.3em] font-semibold mb-6 block">
            § SAVED FOR LATER
          </span>
          <h1 className="font-display text-5xl md:text-[64px] font-light leading-tight mb-4">
            What you're <em className="italic text-gold">dreaming</em> of.
          </h1>
          <p className="font-sans text-[13px] text-white/60">
            {items.length === 1 ? "1 piece saved." : `${items.length} pieces saved.`}
          </p>
        </div>

        {/* Scroll indicator */}
        {items.length > 0 && (
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer text-white/40 hover:text-gold transition-colors"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => {
              const target = document.getElementById("wishlist-gallery");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="font-mono text-[7px] uppercase tracking-[0.2em] mb-1">EXPLORE</span>
            <ChevronDown size={14} />
          </motion.div>
        )}
      </section>

      {/* Main Content (Wishlist Gallery) */}
      <section id="wishlist-gallery" className="px-6 md:px-12 py-16 max-w-[1500px] mx-auto min-h-[50vh]">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            {/* Animated Empty Heart */}
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
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </motion.svg>
            </div>
            <h2 className="font-display text-4xl font-light mb-4 text-white">Nothing saved yet.</h2>
            <p className="font-sans text-[13px] text-white/60 mb-8">Tap the heart on any piece to save it here.</p>
            <Link to="/shop" className="bg-white text-ink hover:bg-transparent hover:text-white transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-4 px-8 border border-white rounded-none">
              Discover Collections
            </Link>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 ${items.length < 4 ? 'max-w-5xl mx-auto md:grid-cols-3' : ''}`}>
            {items.map((item, index) => {
              // Asymmetric Layout Logic
              let colSpan = "md:col-span-4"; // default for standard cards
              let isHero = false;

              if (items.length >= 4) {
                if (index === 0) {
                  colSpan = "md:col-span-7";
                  isHero = true;
                } else if (index === 1) {
                  colSpan = "md:col-span-5";
                }
              } else {
                colSpan = "md:col-span-1"; // when 1-3 items, standard 3-col grid
              }

              return (
                <motion.div 
                  key={item.id}
                  className={`relative group ${colSpan} cursor-pointer`}
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                >
                  <div className={`relative w-full overflow-hidden border border-white/10 ${isHero ? 'aspect-[4/3] md:aspect-[16/9]' : 'aspect-[3/4]'}`}>
                    <OptimizedImage 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Right Heart (Filled) */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      className="absolute top-4 right-4 p-2 text-red z-10 hover:scale-110 transition-transform"
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={20} className="fill-red" />
                    </button>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                      <Link to="/product/$id" params={{ id: item.id }} className="block mb-4">
                        <h3 className={`font-display font-light text-white mb-2 line-clamp-1 ${isHero ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                          {item.name}
                        </h3>
                        <p className="font-mono text-[11px] text-gold uppercase tracking-wider">₹{item.price}</p>
                      </Link>

                      {/* Add to Cart Button (Slides up on hover) */}
                      <div className="overflow-hidden">
                        <motion.div 
                          className="flex flex-col gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                        >
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(item);
                            }}
                            className="w-full bg-white text-ink hover:bg-gold hover:text-white transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-3 border border-transparent rounded-none"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist(item);
                            }}
                            className="w-full text-center font-mono text-[9px] text-white/60 hover:text-white uppercase tracking-widest py-2"
                          >
                            Remove
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recommendation Strip */}
      {recommendationProducts.length > 0 && (
        <section className="bg-cream-soft text-ink py-20 border-t border-border">
          <div className="max-w-[1500px] mx-auto px-6 md:px-12">
            <span className="font-mono text-[9px] text-gold uppercase tracking-[0.3em] font-semibold mb-4 block text-center md:text-left">
              § CURATED FOR YOU
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light mb-12 text-center md:text-left">
              Since you love these...
            </h2>

            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 md:gap-8 pb-4">
              {recommendationProducts.map((product, i) => (
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

      {/* Sticky Action Bar */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div 
            className="fixed bottom-0 left-0 w-full z-50 bg-ink border-t border-gold/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="max-w-[1500px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-mono text-[11px] text-white/60 uppercase tracking-widest">
                {items.length} pieces saved
              </span>
              <div className="flex items-center gap-6 w-full md:w-auto">
                <button 
                  onClick={clearWishlist}
                  className="font-mono text-[10px] text-white/60 hover:text-red transition-colors uppercase tracking-widest hidden md:block"
                >
                  Clear Wishlist
                </button>
                <button 
                  onClick={moveAllToCart}
                  className="flex-1 md:flex-none bg-gold text-white hover:bg-[#96783f] transition-colors duration-300 font-mono text-[11px] font-bold uppercase tracking-widest py-3 px-8 rounded-none"
                >
                  Move All to Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
