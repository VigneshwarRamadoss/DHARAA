import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { SearchModal } from "./SearchModal";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

import editorial from "@/assets/editorial.jpg";
import p1 from "@/assets/p1.jpg";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  const { cartCount, setIsCartOpen } = useCart();
  const { items: wishlistItems, setIsWishlistOpen } = useWishlist();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 1.4 }}
      onMouseLeave={() => setIsMegaMenuOpen(false)}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled || isMegaMenuOpen ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-12 relative">
        
        {/* Mobile Hamburger Trigger */}
        <div className="flex flex-1 md:hidden justify-start">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-ink hover:text-gold transition-colors focus:outline-none py-1"
            aria-label="Open Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden flex-1 items-center gap-8 text-[13px] tracking-wide text-ink md:flex h-full">
          <div 
            className="h-full flex items-center py-2"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
          >
            <Link to="/shop" search={{ category: "all" }} className="transition hover:text-gold uppercase font-bold text-[11px] tracking-widest">Shop By</Link>
          </div>
          <Link to="/shop" search={{ category: "all" }} className="transition hover:text-gold uppercase font-bold text-[11px] tracking-widest">New</Link>
          <Link to="/rings" className="transition hover:text-gold uppercase font-bold text-[11px] tracking-widest">Rings</Link>
          <Link to="/necklaces" className="transition hover:text-gold uppercase font-bold text-[11px] tracking-widest">Necklaces</Link>
          <Link to="/earrings" className="transition hover:text-gold uppercase font-bold text-[11px] tracking-widest">Earrings</Link>
          <Link to="/about" className="transition hover:text-gold uppercase font-bold text-[11px] tracking-widest">About</Link>
        </nav>

        {/* Logo */}
        <Link to="/" className="font-display text-2xl tracking-[0.2em] text-ink md:text-3xl font-bold">
          DHARAA
        </Link>

        {/* Icons */}
        <div className="flex flex-1 items-center justify-end gap-5 text-ink">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/account" aria-label="Profile" className="hidden md:block">
                <User className="h-[18px] w-[18px] cursor-pointer transition hover:text-gold" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-ink text-background border border-border rounded-none text-[10px] tracking-widest uppercase py-2 px-3 font-semibold shadow-md">Account Details</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => setIsSearchOpen(true)} aria-label="Search">
                <Search className="h-[18px] w-[18px] cursor-pointer transition hover:text-gold" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-ink text-background border border-border rounded-none text-[10px] tracking-widest uppercase py-2 px-3 font-semibold shadow-md">Search Catalog</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/wishlist" 
                className="relative" 
                onClick={(e) => {
                  if (window.innerWidth < 768) {
                    e.preventDefault();
                    setIsWishlistOpen(true);
                  }
                }}
                aria-label="Wishlist"
              >
                <Heart className="h-[18px] w-[18px] cursor-pointer transition hover:text-gold" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red text-[10px] font-medium text-background">{wishlistItems.length}</span>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-ink text-background border border-border rounded-none text-[10px] tracking-widest uppercase py-2 px-3 font-semibold shadow-md">Your Wishlist</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/cart" 
                className="relative" 
                onClick={(e) => {
                  if (window.innerWidth < 768) {
                    e.preventDefault();
                    setIsCartOpen(true);
                  }
                }}
                aria-label="Cart"
              >
                <ShoppingBag className="h-[18px] w-[18px] cursor-pointer transition hover:text-gold" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-medium text-background">{cartCount}</span>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-ink text-background border border-border rounded-none text-[10px] tracking-widest uppercase py-2 px-3 font-semibold shadow-md">Your Cart</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-background border-t border-border shadow-md overflow-hidden"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <div className="mx-auto flex max-w-[1500px] px-6 py-10 md:px-12">
              
              {/* Links Columns */}
              <div className="flex flex-1 gap-16 pr-10">
                {/* Style Links */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-ink mb-2">Shop By Style</h4>
                  <Link to="/shop" search={{ category: "all" }} className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">New Rings</Link>
                  <Link to="/necklaces" className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">Necklaces Collection</Link>
                  <Link to="/earrings" className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">Earrings Collection</Link>
                  <Link to="/rings" className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">Rings Collection</Link>
                  <Link to="/shop" search={{ category: "all" }} className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">New Bracelets</Link>
                  <Link to="/shop" search={{ category: "all" }} className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">New Fine Jewelry</Link>
                  <Link to="/shop" search={{ category: "all" }} className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors mt-2">Shop All New</Link>
                </div>

                {/* Price Links */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-ink mb-2">Shop By Price</h4>
                  <Link to="/shop" search={{ category: "under ₹99" }} className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">Under ₹99</Link>
                  <Link to="/shop" search={{ category: "under ₹499" }} className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">Under ₹499</Link>
                  <Link to="/shop" search={{ category: "under ₹999" }} className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">Under ₹999</Link>
                  <Link to="/shop" search={{ category: "under ₹1499" }} className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">Under ₹1499</Link>
                  <Link to="/shop" search={{ category: "under ₹2499" }} className="font-sans text-[11px] uppercase tracking-wider text-slate hover:text-gold transition-colors">Under ₹2499</Link>
                </div>
              </div>

              {/* Image Features */}
              <div className="flex flex-1 gap-6">
                <Link to="/necklaces" className="group flex-1 block">
                  <div className="aspect-[4/5] bg-cream overflow-hidden mb-3">
                    <img src={editorial} alt="Conscious Necklaces" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-ink group-hover:text-gold transition-colors">Conscious Necklaces</h4>
                </Link>
                
                <Link to="/earrings" className="group flex-1 block">
                  <div className="aspect-[4/5] bg-cream overflow-hidden mb-3">
                    <img src={p1} alt="Artisan Earrings" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-ink group-hover:text-gold transition-colors">Artisan Earrings</h4>
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-background flex flex-col md:hidden"
          >
            {/* Header of Mobile Menu */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/40">
              <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] font-semibold">
                § NAVIGATE
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-ink hover:text-gold transition-colors focus:outline-none py-1"
                aria-label="Close Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Links List */}
            <div className="flex-1 flex flex-col justify-center px-8 py-10 gap-8 overflow-y-auto">
              {[
                { name: "New Arrivals", path: "/shop", search: { category: "all" } },
                { name: "Rings", path: "/rings" },
                { name: "Necklaces", path: "/necklaces" },
                { name: "Earrings", path: "/earrings" },
                { name: "About", path: "/about" }
              ].map((link, idx) => (
                <motion.div
                  key={link.name}
                  custom={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, ease: "easeOut" }}
                >
                  <Link 
                    to={link.path}
                    search={link.search}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-3xl font-light tracking-[0.15em] text-ink hover:text-gold transition-colors uppercase block py-2"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Decorative line */}
              <motion.div 
                className="w-12 h-px bg-gold/40 my-4" 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4 }}
              />

              {/* Secondary links */}
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <Link 
                    to="/account" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-mono text-xs uppercase tracking-widest text-slate hover:text-ink transition-colors flex items-center gap-2"
                  >
                    <User className="h-4 w-4" /> Account Details
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="font-mono text-xs uppercase tracking-widest text-slate hover:text-ink transition-colors flex items-center gap-2 text-left"
                  >
                    <Search className="h-4 w-4" /> Search Catalog
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Footer of Mobile Menu */}
            <div className="p-8 border-t border-border/40 bg-cream-soft/30 text-center flex flex-col gap-2">
              <span className="font-mono text-[8px] text-gold uppercase tracking-[0.2em] font-semibold">
                DHARAA DESIGN HOUSE
              </span>
              <span className="font-mono text-[7px] text-slate uppercase tracking-wider">
                Zaveri Bazaar • Mumbai • India
              </span>
              <span className="font-mono text-[6px] text-slate/50 tracking-[0.25em] mt-1">
                § 18°55'N, 72°49'E
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.header>
  );
}
