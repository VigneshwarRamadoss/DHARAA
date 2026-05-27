import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Link } from '@tanstack/react-router';

export function WishlistDrawer() {
  const { items, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-md bg-white shadow-drawer flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl text-ink">Your Wishlist</h2>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 -mr-2 text-slate hover:text-ink transition-colors"
                aria-label="Close wishlist"
              >
                <X size={20} />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-red">
                    <Heart size={24} className="fill-red" />
                  </div>
                  <p className="font-sans text-slate">Your wishlist is empty.</p>
                  <button onClick={() => setIsWishlistOpen(false)} className="btn-secondary mt-4">
                    Explore Collections
                  </button>
                </div>
              ) : (
                items.map((product) => (
                  <div key={product.id} className="flex gap-4 group">
                    <Link to="/product/$id" params={{ id: product.id }} onClick={() => setIsWishlistOpen(false)} className="block shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover border border-border"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link to="/product/$id" params={{ id: product.id }} onClick={() => setIsWishlistOpen(false)}>
                            <h3 className="font-sans text-sm font-semibold text-ink line-clamp-2 group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                          </Link>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-slate hover:text-red transition-colors ml-2 shrink-0"
                            aria-label="Remove from wishlist"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="font-sans text-[11px] text-slate mt-1">₹{product.price}</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product);
                        }}
                        className="btn-secondary w-full py-2 min-h-0 mt-3 gap-2"
                      >
                        <ShoppingBag size={14} />
                        Move to Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
