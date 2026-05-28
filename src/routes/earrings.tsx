import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductGrid } from '@/components/ProductGrid';
import { mockProducts } from '@/data/products';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';

export const Route = createFileRoute('/earrings')({
  component: EarringsPage,
  head: () => ({
    meta: [
      { title: "Earrings — DHARAA | Handcrafted Earrings from Mumbai" },
      { name: "description", content: "Explore DHARAA's earring collection — from classic gold studs to oxidised jhumkas. Artisan-crafted, anti-tarnish, from ₹89." },
      { property: "og:title", content: "Earrings — DHARAA" },
      { property: "og:description", content: "Explore DHARAA's earring collection — from classic gold studs to oxidised jhumkas. Artisan-crafted, anti-tarnish, from ₹89." },
      { property: "og:type", content: "website" }
    ]
  })
});

const EARRING_FILTERS = ["All", "Studs", "Hoops", "Jhumkas", "Drops", "Under ₹199"];

function EarringsPage() {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState("all");

  // Section Refs
  const heroRef = useRef<HTMLElement>(null);
  const artisanRef = useRef<HTMLElement>(null);

  // Hero Parallax (Left Column Drift)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroLeftY = useTransform(heroScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "15%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Artisan Heritage Image Zoom Out
  const { scrollYProgress: artisanScroll } = useScroll({
    target: artisanRef,
    offset: ["start end", "end start"]
  });
  const artisanImgScale = useTransform(artisanScroll, [0, 1], prefersReduced ? [1, 1] : [1.05, 0.98]);

  // Filtered Products Memoization
  const earrings = useMemo(() => {
    return mockProducts.filter(p => p.category === "Earrings");
  }, []);

  const filteredProducts = useMemo(() => {
    const slug = activeTab.toLowerCase();
    if (slug === "all") return earrings;
    if (slug === "studs") {
      return earrings.filter(p => p.name.toLowerCase().includes("stud") || p.description.toLowerCase().includes("stud"));
    }
    if (slug === "hoops") {
      return earrings.filter(p => p.name.toLowerCase().includes("hoop") || p.description.toLowerCase().includes("hoop"));
    }
    if (slug === "jhumkas") {
      return earrings.filter(p => p.name.toLowerCase().includes("jhumka") || p.description.toLowerCase().includes("jhumka"));
    }
    if (slug === "drops") {
      return earrings.filter(p => p.name.toLowerCase().includes("drop") || p.name.toLowerCase().includes("chandelier") || p.description.toLowerCase().includes("drop"));
    }
    if (slug === "under ₹199") {
      return earrings.filter(p => p.price <= 199);
    }
    return earrings;
  }, [earrings, activeTab]);

  const headlineWords = "From first light to last dance.".split(" ");

  return (
    <div className="min-h-screen bg-background relative selection:bg-gold selection:text-background overflow-x-hidden">
      <Nav />
      <CartDrawer />
      <WishlistDrawer />

      {/* SECTION 1: Split-Screen Cinematic Hero */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden">
        
        {/* Left Side: Editorial Image Block (60%) */}
        <div className="w-full md:w-[60%] min-h-[50vh] md:min-h-screen relative overflow-hidden bg-ink">
          <motion.div 
            style={{ y: heroLeftY, willChange: "transform" }}
            className="absolute inset-0 w-full h-full parallax-el scale-105"
          >
            <img 
              src="/src/assets/hero.jpg" 
              alt="DHARAA Earrings Editorial" 
              className="w-full h-full object-cover"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/35 md:to-black/50" />
          </motion.div>
        </div>

        {/* Right Side: Cream Canvas Content Block (40%) */}
        <div className="w-full md:w-[40%] bg-cream-soft flex flex-col justify-center px-8 py-16 md:px-12 relative overflow-hidden">
          
          {/* Slow rotating decorative gold Roman Numeral in background */}
          <motion.div
            className="absolute -right-16 top-1/4 z-0 text-gold/5 font-display text-[420px] select-none leading-none pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform" }}
          >
            I
          </motion.div>

          {/* Foreground elements */}
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-sm">
            {/* Coordinates label */}
            <motion.p 
              className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-5 font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              § EARRINGS COLLECTION • SELECTION II
            </motion.p>

            {/* Word-by-word reveal */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink mb-6 leading-[1.1] flex flex-wrap gap-x-2.5">
              {headlineWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-1">
                  <motion.span
                    className={`inline-block ${idx === 2 || idx === 3 ? 'italic text-gold font-light' : 'font-light'}`}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Elegant subline */}
            <motion.p
              className="font-sans text-xs md:text-sm text-slate leading-relaxed mb-8 max-w-xs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            >
              Celebratory drop chandelier sets, effortless daily hoops, and pure silver jhumkas handcrafted in traditional artisan ateliers.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
            >
              <button 
                onClick={() => {
                  const target = document.getElementById("earrings-collection-section");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-ink text-white hover:bg-gold hover:text-white transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-4 px-6 border border-ink hover:border-gold rounded-none"
              >
                Explore Collection
              </button>
              
              <button 
                onClick={() => {
                  const target = document.getElementById("style-selector");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-mono text-[10px] text-ink hover:text-gold transition-colors font-bold uppercase tracking-widest py-4 px-4 border border-transparent border-b-gold/30 hover:border-b-gold rounded-none"
              >
                Find Your Style →
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-6 left-8 flex items-center cursor-pointer text-slate/40 hover:text-gold transition-colors"
            style={{ opacity: heroOpacity }}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => {
              const target = document.getElementById("style-selector");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <ChevronDown size={14} className="mr-1" />
            <span className="font-mono text-[7px] uppercase tracking-[0.2em]">SCROLL ATELIER</span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Style Selector philosophy grid */}
      <section id="style-selector" className="bg-cream-soft border-t border-b border-border py-20 lg:py-28 relative">
        <div className="section-container">
          <div className="mb-12 max-w-xl">
            <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] mb-3.5 font-semibold block">§ FIND YOUR STYLE</span>
            <h2 className="font-display text-3xl lg:text-4xl text-ink font-light">
              Calibrated shapes for <em className="italic text-gold">daily self-expression.</em>
            </h2>
            <div className="w-12 h-[1px] bg-gold/40 mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Studs */}
            <motion.div 
              className="bg-background border border-border/60 p-8 lg:p-10 flex flex-col justify-between hover:border-gold/40 transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => {
                setActiveTab("studs");
                document.getElementById("earrings-collection-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div>
                <h3 className="font-display text-xl text-ink mb-3 font-light group-hover:text-gold transition-colors">Daily Studs</h3>
                <p className="font-sans text-xs text-slate leading-relaxed">
                  Understated, lightweight posts in solid pearl, crystal drops, or celestial configurations. Hugging close for absolute comfort.
                </p>
              </div>
              <span className="font-mono text-[9px] text-gold uppercase tracking-widest mt-8 flex items-center border-b border-gold/0 group-hover:border-b-gold/30 w-fit pb-0.5 transition-all">
                Shop Studs →
              </span>
            </motion.div>

            {/* Hoops */}
            <motion.div 
              className="bg-background border border-border/60 p-8 lg:p-10 flex flex-col justify-between hover:border-gold/40 transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => {
                setActiveTab("hoops");
                document.getElementById("earrings-collection-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div>
                <h3 className="font-display text-xl text-ink mb-3 font-light group-hover:text-gold transition-colors">Chunky Hoops</h3>
                <p className="font-sans text-xs text-slate leading-relaxed">
                  Vibrantly textured, ribbed, or enamel gold-plated loops that add instant warmth and contour to your profile.
                </p>
              </div>
              <span className="font-mono text-[9px] text-gold uppercase tracking-widest mt-8 flex items-center border-b border-gold/0 group-hover:border-b-gold/30 w-fit pb-0.5 transition-all">
                Shop Hoops →
              </span>
            </motion.div>

            {/* Jhumkas */}
            <motion.div 
              className="bg-background border border-border/60 p-8 lg:p-10 flex flex-col justify-between hover:border-gold/40 transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => {
                setActiveTab("jhumkas");
                document.getElementById("earrings-collection-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div>
                <h3 className="font-display text-xl text-ink mb-3 font-light group-hover:text-gold transition-colors">Artisan Jhumkas</h3>
                <p className="font-sans text-xs text-slate leading-relaxed">
                  Generational detailed handcraft in premium oxidized sterling silver. Tiny silver bells that dance gently with every word.
                </p>
              </div>
              <span className="font-mono text-[9px] text-gold uppercase tracking-widest mt-8 flex items-center border-b border-gold/0 group-hover:border-b-gold/30 w-fit pb-0.5 transition-all">
                Shop Jhumkas →
              </span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Sub-Category Sticky Filters */}
      <section id="earrings-collection-section" className="sticky top-[64px] z-30 w-full bg-background/95 backdrop-blur-md border-b border-border py-4 transition-all duration-300">
        <div className="section-container">
          <div className="flex items-center justify-start overflow-x-auto scrollbar-none gap-2 py-1 pr-6 md:justify-center">
            {EARRING_FILTERS.map((filter) => {
              const isActive = activeTab === filter.toLowerCase();
              return (
                <button
                  key={filter}
                  onClick={() => setActiveTab(filter.toLowerCase())}
                  className={`relative px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap rounded-none ${
                    isActive ? "text-white" : "text-slate hover:text-ink"
                  }`}
                >
                  <span className="relative z-10">{filter}</span>
                  {isActive && (
                    <motion.div
                      layoutId="earring-active-pill"
                      className="absolute inset-0 bg-ink rounded-none z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Asymmetric Bento Product Grid (Mirrored) */}
      <section className="py-20 bg-background">
        <div className="section-container">
          
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-sans text-slate">No earrings found matching the selected style.</p>
            </div>
          ) : activeTab === "all" && filteredProducts.length >= 6 ? (
            /* Premium Bento Layout for 6 products - Mirrored */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
              
              {/* Row 1, Left Column - Stacked 2 cards (Occupies col-span-5) */}
              <div className="col-span-1 md:col-span-5 flex flex-col justify-between gap-8 order-2 md:order-1">
                <ProductCard product={filteredProducts[1]} index={1} />
                <ProductCard product={filteredProducts[2]} index={2} />
              </div>

              {/* Row 1, Right Column - Large Editorial (Occupies col-span-7) */}
              <div className="col-span-1 md:col-span-7 order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative aspect-[3/4] bg-cream border border-border overflow-hidden group cursor-pointer"
                  whileHover={{ y: -4 }}
                  style={{ willChange: "transform" }}
                >
                  <Link to="/product/$id" params={{ id: filteredProducts[0].id }} className="block w-full h-full relative">
                    <img
                      src={filteredProducts[0].image}
                      alt={filteredProducts[0].name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end text-white">
                      <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] mb-2.5 font-semibold">FEATURED SELECTION</span>
                      <h3 className="font-display text-3xl font-light mb-1.5 leading-tight">{filteredProducts[0].name}</h3>
                      <p className="font-sans text-xs text-white/80 mb-5">₹{filteredProducts[0].price} • Atelier Exclusive</p>
                      <span className="font-mono text-[10px] text-gold uppercase tracking-widest border-b border-gold/30 w-fit pb-1 group-hover:border-gold transition-colors">
                        Shop Piece →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Row 2 - Three standard columns */}
              <div className="col-span-1 md:col-span-4 mt-4 order-3">
                <ProductCard product={filteredProducts[3]} index={3} />
              </div>
              <div className="col-span-1 md:col-span-4 mt-4 order-4">
                <ProductCard product={filteredProducts[4]} index={4} />
              </div>
              <div className="col-span-1 md:col-span-4 mt-4 order-5">
                <ProductCard product={filteredProducts[5]} index={5} />
              </div>

            </div>
          ) : (
            /* Regular grid fallback */
            <div className="max-w-6xl mx-auto">
              <ProductGrid products={filteredProducts} />
            </div>
          )}

        </div>
      </section>

      {/* SECTION 5: Artisan Heritage Feature (Zaveri Bazaar Split) */}
      <section ref={artisanRef} className="w-full min-h-[60vh] md:h-screen grid grid-cols-1 md:grid-cols-12 items-stretch border-t border-b border-border/50">
        
        {/* Left Side: bg-ink, text-white (col-span-6) */}
        <div className="col-span-1 md:col-span-6 bg-ink text-white flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24 grain relative">
          <div className="max-w-md relative z-10">
            <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] mb-4 font-semibold block">§ ARTISAN INTEGRITY</span>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-[1.1] mb-6 font-light">
              Seven pairs of<br />
              <em className="italic text-gold">hands.</em> One earring.
            </h2>
            <p className="font-sans text-sm text-white/70 leading-relaxed mb-8">
              From the generation-guided metal casters of Mumbai's historic Zaveri Bazaar to the modern buffing tools in our studio, each DHARAA earring goes through seven independent artisan checks before it lands in our cream packaging box.
            </p>
            <p className="font-sans text-sm text-white/70 leading-relaxed mb-10">
              We preserve centuries-old handwork traditions while utilizing modern anti-tarnish coating. Pure design integrity, handcrafted with absolute respect.
            </p>
            
            {/* Stat Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="font-mono text-[9px] text-gold uppercase tracking-wider font-semibold">CRAFT HISTORY</p>
                <p className="font-sans text-sm font-bold text-white mt-1">12 Yrs Plating</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-gold uppercase tracking-wider font-semibold">ADORNED</p>
                <p className="font-sans text-sm font-bold text-white mt-1">5K+ Women</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-gold uppercase tracking-wider font-semibold">HONESTY</p>
                <p className="font-sans text-sm font-bold text-white mt-1">4.9/5 Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: RAW Editorial Photography (col-span-6) */}
        <div className="col-span-1 md:col-span-6 min-h-[40vh] md:min-h-full overflow-hidden bg-cream relative">
          <motion.img 
            style={{ scale: artisanImgScale, willChange: "transform" }}
            src="/src/assets/editorial.jpg" 
            alt="DHARAA Jewelry Artisan Craft detailed portrait" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
          />
        </div>
      </section>

      {/* SECTION 6: Social Proof Bar (Light Marquee) */}
      <section className="w-full bg-cream border-b border-border py-6 overflow-hidden relative">
        <div className="flex whitespace-nowrap">
          {[1, 2].map((group) => (
            <motion.div
              key={group}
              className="flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.25em] text-ink font-semibold"
              animate={{ x: [0, "-50%"] }}
              transition={{
                ease: "linear",
                duration: 35,
                repeat: Infinity,
              }}
            >
              <span className="flex items-center gap-12 whitespace-nowrap select-none">
                <span>Anti-Tarnish Guaranteed</span>
                <span className="text-gold">•</span>
                <span>Generational Craftwork</span>
                <span className="text-gold">•</span>
                <span>Free Shipping Above ₹499</span>
                <span className="text-gold">•</span>
                <span>Everyday Comfort weight</span>
                <span className="text-gold">•</span>
                <span>Generational Artistry</span>
                <span className="text-gold">•</span>
                <span>4.9 ★ Customer Rating</span>
                <span className="text-gold">•</span>
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7: Cream CTA Section (Light theme contrast) */}
      <section className="bg-cream-soft py-28 relative overflow-hidden grain">
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="font-mono text-[9px] text-gold uppercase tracking-[0.3em] mb-4 font-semibold">THE CONCLUDING NOTE</span>
          <h2 className="font-display text-4xl md:text-6xl text-ink font-light leading-tight mb-6">
            An earring for<br />
            <em className="italic text-gold">every story.</em>
          </h2>
          <p className="font-sans text-xs md:text-sm text-slate max-w-sm mb-10 leading-relaxed">
            From sunrise coffee runs to sunset dinner celebrations. Choose your weight, contour, and finish. Starting from ₹89.
          </p>
          
          <button 
            onClick={() => {
              const target = document.getElementById("earrings-collection-section");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-ink text-white hover:bg-gold hover:text-white transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-4 px-8 border border-ink hover:border-gold rounded-none"
          >
            Shop All Earrings
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
