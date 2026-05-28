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

export const Route = createFileRoute('/necklaces')({
  component: NecklacesPage,
  head: () => ({
    meta: [
      { title: "Necklaces — DHARAA | Handcrafted Everyday Necklaces" },
      { name: "description", content: "Discover DHARAA's curated necklace collection. Handcrafted gold chains, pendants, and chokers from ₹149. Anti-tarnish guaranteed." },
      { property: "og:title", content: "Necklaces — DHARAA" },
      { property: "og:description", content: "Discover DHARAA's curated necklace collection. Handcrafted gold chains, pendants, and chokers from ₹149. Anti-tarnish guaranteed." },
      { property: "og:type", content: "website" }
    ]
  })
});

const NECKLACE_FILTERS = ["All", "Chains", "Pendants", "Chokers", "Layering Sets", "Under ₹299"];

function NecklacesPage() {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState("all");

  // Section Refs for scroll targeting
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);

  // Hero Parallax Scroll
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroBgY = useTransform(heroScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "25%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "15%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Story Scroll (Cascading Right Columns)
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  });
  const storyImg1Y = useTransform(storyScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["-5%", "5%"]);
  const storyImg2Y = useTransform(storyScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["10%", "-10%"]);
  const storyImg3Y = useTransform(storyScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["-8%", "8%"]);

  // Filtered Products Memoization
  const necklaces = useMemo(() => {
    return mockProducts.filter(p => p.category === "Necklaces");
  }, []);

  const filteredProducts = useMemo(() => {
    const slug = activeTab.toLowerCase();
    if (slug === "all") return necklaces;
    if (slug === "chains") {
      return necklaces.filter(p => p.name.toLowerCase().includes("chain") || p.name.toLowerCase().includes("strand"));
    }
    if (slug === "pendants") {
      return necklaces.filter(p => p.name.toLowerCase().includes("pendant") || p.name.toLowerCase().includes("bar"));
    }
    if (slug === "chokers") {
      return necklaces.filter(p => p.name.toLowerCase().includes("choker") || p.name.toLowerCase().includes("layering") || p.name.toLowerCase().includes("set"));
    }
    if (slug === "layering sets") {
      return necklaces.filter(p => p.name.toLowerCase().includes("layering") || p.name.toLowerCase().includes("set") || p.name.toLowerCase().includes("chain"));
    }
    if (slug === "under ₹299") {
      return necklaces.filter(p => p.price <= 299);
    }
    return necklaces;
  }, [necklaces, activeTab]);

  const headlineWords = "Wear what tells your story.".split(" ");

  return (
    <div className="min-h-screen bg-background relative selection:bg-gold selection:text-background overflow-x-hidden">
      <Nav />
      <CartDrawer />
      <WishlistDrawer />

      {/* SECTION 1: Cinematic Full-Bleed Hero */}
      <section ref={heroRef} className="relative w-full h-screen flex items-center overflow-hidden bg-ink">
        {/* Background Image Parallax */}
        <motion.div 
          style={{ y: heroBgY, willChange: "transform" }}
          className="absolute inset-0 w-full h-full parallax-el scale-105"
        >
          <img 
            src="/src/assets/editorial.jpg" 
            alt="DHARAA Necklace Editorial" 
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Editorial dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/75" />
        </motion.div>

        {/* Hero Content */}
        <div className="section-container relative z-10 w-full text-left flex flex-col justify-center h-full pt-16">
          <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="max-w-2xl">
            {/* Coordinates label */}
            <motion.p 
              className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-5 font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              § NECKLACES COLLECTION • SELECTION I
            </motion.p>

            {/* Word-by-word reveal */}
            <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-[1.08] flex flex-wrap gap-x-3.5">
              {headlineWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-1">
                  <motion.span
                    className={`inline-block ${idx === 2 || idx === 3 ? 'italic text-gold font-light' : 'font-light'}`}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Elegant subline */}
            <motion.p
              className="font-sans text-sm md:text-base text-white/70 max-w-md leading-relaxed mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              Handcrafted chains, detailed pendants, and oxidised chokers designed to sit flawlessly and frame your daily expression.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <button 
                onClick={() => {
                  const target = document.getElementById("collection-section");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-ink hover:bg-gold hover:text-white transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-4 px-8 border border-white hover:border-gold rounded-none"
              >
                Explore Collection
              </button>
              
              <button 
                onClick={() => {
                  storyRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-mono text-[10px] text-white hover:text-gold transition-colors font-bold uppercase tracking-widest py-4 px-6 border border-transparent border-b-gold/30 hover:border-b-gold rounded-none"
              >
                View Layering Guide →
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer text-white/40 hover:text-gold transition-colors"
          style={{ opacity: heroOpacity }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            const target = document.getElementById("philosophy-section");
            target?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-mono text-[7px] uppercase tracking-[0.2em] mb-1">SCROLL</span>
          <ChevronDown size={14} />
        </motion.div>
      </section>

      {/* SECTION 2: Philosophy Strip (Dark Contrast Break) */}
      <section id="philosophy-section" className="bg-ink text-white relative py-12 border-t border-b border-gold/20 overflow-hidden grain">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            
            {/* Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h3 className="font-display text-2xl lg:text-3xl text-white font-light">
                Layering is <em className="italic text-gold">pure art.</em>
              </h3>
            </motion.div>

            {/* Column 2 - With scale lines drawing on entry */}
            <div className="flex flex-col items-center justify-center relative py-4 md:py-0">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-16 h-[1px] bg-gold/30 mb-3 origin-center"
              />
              <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] font-semibold text-center">
                12 styles · 3 lengths · 1 you
              </span>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-16 h-[1px] bg-gold/30 mt-3 origin-center"
              />
            </div>

            {/* Column 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-center md:items-end text-center md:text-right"
            >
              <h3 className="font-display text-2xl lg:text-3xl text-white font-light">
                Crafted in <span className="font-display">Mumbai.</span>
              </h3>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Sticky Sub-Category Filter Tabs */}
      <section id="collection-section" className="sticky top-[64px] z-30 w-full bg-background/95 backdrop-blur-md border-b border-border py-4 transition-all duration-300">
        <div className="section-container">
          <div className="flex items-center justify-start overflow-x-auto scrollbar-none gap-2 py-1 pr-6 md:justify-center">
            {NECKLACE_FILTERS.map((filter) => {
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
                      layoutId="necklace-active-pill"
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

      {/* SECTION 4: Signature Bento Grid or Filtered standard grid */}
      <section className="py-20 bg-background">
        <div className="section-container">
          
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-sans text-slate">No necklaces found matching the selected style.</p>
            </div>
          ) : activeTab === "all" && filteredProducts.length >= 6 ? (
            /* Premium Bento Layout for 6 products */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
              
              {/* Row 1, Left Column - Large Editorial 3/5 width */}
              <div className="col-span-1 md:col-span-7">
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
                      <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] mb-2.5 font-semibold">FEATURED MASTERPIECE</span>
                      <h3 className="font-display text-3xl font-light mb-1.5 leading-tight">{filteredProducts[0].name}</h3>
                      <p className="font-sans text-xs text-white/80 mb-5">₹{filteredProducts[0].price} • Premium Plating</p>
                      <span className="font-mono text-[10px] text-gold uppercase tracking-widest border-b border-gold/30 w-fit pb-1 group-hover:border-gold transition-colors">
                        Shop Piece →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Row 1, Right Column - Stacked 2 cards */}
              <div className="col-span-1 md:col-span-5 flex flex-col justify-between gap-8">
                <ProductCard product={filteredProducts[1]} index={1} />
                <ProductCard product={filteredProducts[2]} index={2} />
              </div>

              {/* Row 2 - Three standard columns */}
              <div className="col-span-1 md:col-span-4 mt-4">
                <ProductCard product={filteredProducts[3]} index={3} />
              </div>
              <div className="col-span-1 md:col-span-4 mt-4">
                <ProductCard product={filteredProducts[4]} index={4} />
              </div>
              <div className="col-span-1 md:col-span-4 mt-4">
                <ProductCard product={filteredProducts[5]} index={5} />
              </div>

            </div>
          ) : (
            /* Regular responsive grid fallback when filtered */
            <div className="max-w-6xl mx-auto">
              <ProductGrid products={filteredProducts} />
            </div>
          )}

        </div>
      </section>

      {/* SECTION 5: The Styling Story (Editorial Narrative) */}
      <section ref={storyRef} className="section-container relative grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 py-20 lg:py-32 border-t border-border/50">
        
        {/* Left Column — Sticky description */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-36 h-fit">
          <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] mb-4 font-semibold">§ WEAR IT YOUR WAY</span>
          <h2 className="font-display text-4xl lg:text-5xl text-ink leading-[1.1] mb-6">
            Three lengths.<br />
            <em className="italic text-gold">Infinite</em> possibilities.
          </h2>
          <p className="font-sans text-sm text-slate leading-relaxed mb-6">
            Discover the geometry of beautiful adornment. Handcrafted to cascade at perfect intervals, our lengths are calibrated to frame your collarbone, neck, and chest in harmony.
          </p>
          <p className="font-sans text-sm text-slate leading-relaxed mb-8">
            Start with a sharp 16" collar length that hugs close, layer a detailed 20" coin pendant for organic depth, and ground the look with a shimmering 24" chains station. In DHARAA, layering is not styling—it is self-portraiture.
          </p>
          
          {/* Staggered features row */}
          <div className="grid grid-cols-2 gap-8 border-t border-border pt-8">
            <div>
              <p className="font-mono text-[10px] text-gold uppercase tracking-wider font-semibold">THE RULE</p>
              <p className="font-sans text-sm font-bold text-ink mt-1">Stagger by 2 Inches</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-gold uppercase tracking-wider font-semibold">THE INTEGRITY</p>
              <p className="font-sans text-sm font-bold text-ink mt-1">No-Tangle Weighting</p>
            </div>
          </div>
        </div>

        {/* Right Column — Cascading detailed product visuals */}
        <div className="lg:col-span-7 flex flex-col gap-24 lg:gap-32">
          
          {/* Visual 1 */}
          <div className="relative">
            <motion.div 
              style={{ y: storyImg1Y }}
              className="relative aspect-[3/4] bg-cream border border-border overflow-hidden parallax-el"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src="/src/assets/p1.jpg" alt="16-inch collar necklace detailed view" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
            </motion.div>
            {/* Left-anchored floating mono label */}
            <span className="absolute bottom-4 left-4 bg-background border border-border px-3 py-1.5 font-mono text-[9px] text-ink uppercase tracking-widest shadow-sm">
              16" Collar Style
            </span>
          </div>
          
          {/* Visual 2 */}
          <div className="relative lg:ml-12">
            <motion.div 
              style={{ y: storyImg2Y }}
              className="relative aspect-[4/3] bg-cream border border-border overflow-hidden parallax-el"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              <img src="/src/assets/editorial.jpg" alt="20-inch princess pendant detailed view" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
            </motion.div>
            {/* Left-anchored floating mono label */}
            <span className="absolute bottom-4 left-4 bg-background border border-border px-3 py-1.5 font-mono text-[9px] text-ink uppercase tracking-widest shadow-sm">
              20" Princess Pendant
            </span>
          </div>
          
          {/* Visual 3 */}
          <div className="relative lg:mr-12">
            <motion.div 
              style={{ y: storyImg3Y }}
              className="relative aspect-[3/4] bg-cream border border-border overflow-hidden parallax-el"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <img src="/src/assets/p2.jpg" alt="24-inch opera necklace detailed view" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
            </motion.div>
            {/* Left-anchored floating mono label */}
            <span className="absolute bottom-4 left-4 bg-background border border-border px-3 py-1.5 font-mono text-[9px] text-ink uppercase tracking-widest shadow-sm">
              24" Opera Layering
            </span>
          </div>
          
        </div>
      </section>

      {/* SECTION 6: Social Proof Bar (Inline Marquee) */}
      <section className="w-full bg-cream-soft border-t border-b border-border py-6 overflow-hidden relative">
        <div className="flex whitespace-nowrap">
          {/* Duplicate to prevent gaps on wide monitors */}
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
                <span>Handcrafted in Mumbai</span>
                <span className="text-gold">•</span>
                <span>Free Shipping Above ₹499</span>
                <span className="text-gold">•</span>
                <span>100% Recyclable Packaging</span>
                <span className="text-gold">•</span>
                <span>5K+ Women Adorned</span>
                <span className="text-gold">•</span>
                <span>4.9 ★ Customer Rating</span>
                <span className="text-gold">•</span>
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7: Final CTA (Full-Bleed bg-ink) */}
      <section className="bg-ink text-white py-28 relative overflow-hidden grain">
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="font-mono text-[9px] text-gold uppercase tracking-[0.3em] mb-4 font-semibold">THE CONCLUSION</span>
          <h2 className="font-display text-4xl md:text-6xl text-white font-light leading-tight mb-6">
            Every story deserves<br />
            <em className="italic text-gold">the right necklace.</em>
          </h2>
          <p className="font-sans text-sm text-white/60 max-w-sm mb-10 leading-relaxed">
            Thoughtfully engineered lengths, hypoallergenic metals, and double-layered anti-tarnish shield. Starting from ₹149.
          </p>
          
          <button 
            onClick={() => {
              const target = document.getElementById("collection-section");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white text-ink hover:bg-gold hover:text-white transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-4 px-8 border border-white hover:border-gold rounded-none"
          >
            Shop All Necklaces
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
