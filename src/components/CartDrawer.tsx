import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from '@tanstack/react-router';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
              <h2 className="font-display text-2xl text-ink">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-slate hover:text-ink transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-gold">
                    <ShoppingBag size={24} />
                  </div>
                  <p className="font-sans text-slate">Your cart is empty.</p>
                  <button onClick={() => setIsCartOpen(false)} className="btn-secondary mt-4">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover border border-border"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-sans text-sm font-semibold text-ink line-clamp-1">{product.name}</h3>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-slate hover:text-red transition-colors"
                            aria-label="Remove item"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="font-sans text-[11px] text-slate mt-1">₹{product.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1.5 text-slate hover:text-ink hover:bg-cream transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-sans text-xs">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1.5 text-slate hover:text-ink hover:bg-cream transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-sans text-sm font-bold text-ink ml-auto">
                          ₹{product.price * quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-cream-soft">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-sm text-slate">Subtotal</span>
                  <span className="font-sans text-lg font-bold text-ink">₹{cartTotal}</span>
                </div>
                <p className="font-sans text-[10px] text-slate text-center mb-4 uppercase tracking-wider">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary w-full"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
