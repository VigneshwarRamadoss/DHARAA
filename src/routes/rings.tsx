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
import { ChevronDown, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/rings')({
  component: RingsPage,
  head: () => ({
    meta: [
      { title: "Rings — DHARAA | Handcrafted Rings from Mumbai" },
      { name: "description", content: "Discover DHARAA's curated ring collection. Stackable gold bands, statement cocktail rings, and geometric designs from ₹89. Anti-tarnish guaranteed." },
      { property: "og:title", content: "Rings — DHARAA" },
      { property: "og:description", content: "Discover DHARAA's curated ring collection from ₹89. Anti-tarnish guaranteed." },
      { property: "og:type", content: "website" }
    ]
  })
});

const RING_FILTERS = ["All", "Stackable", "Statement", "Geometric", "Midi Rings", "Under ₹199"];

function RingsPage() {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSize, setSelectedSize] = useState<number>(7);

  // Section Refs for scroll targeting
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);

  // Hero Parallax Scroll
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroBgY = useTransform(heroScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "30%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "15%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroRingY = useTransform(heroScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "-40%"]);

  // Story Scroll (Cascading Right Columns)
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  });
  const storyImg1Y = useTransform(storyScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["-5%", "5%"]);
  const storyImg2Y = useTransform(storyScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["10%", "-10%"]);
  const storyImg3Y = useTransform(storyScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["-8%", "8%"]);

  // Filtered Products Memoization
  const rings = useMemo(() => {
    return mockProducts.filter(p => p.category === "Rings");
  }, []);

  const filteredProducts = useMemo(() => {
    const slug = activeTab.toLowerCase();
    if (slug === "all") return rings;
    if (slug === "stackable") {
      return rings.filter(p => p.name.toLowerCase().includes("stack") || p.description.toLowerCase().includes("stack"));
    }
    if (slug === "statement") {
      return rings.filter(p => p.name.toLowerCase().includes("cocktail") || p.name.toLowerCase().includes("statement") || p.description.toLowerCase().includes("statement") || p.name.toLowerCase().includes("oxidised"));
    }
    if (slug === "geometric") {
      return rings.filter(p => p.name.toLowerCase().includes("geometric") || p.name.toLowerCase().includes("bar") || p.name.toLowerCase().includes("square"));
    }
    if (slug === "midi rings") {
      return rings.filter(p => p.name.toLowerCase().includes("midi") || p.name.toLowerCase().includes("set") || p.price < 200);
    }
    if (slug === "under ₹199") {
      return rings.filter(p => p.price <= 199);
    }
    return rings;
  }, [rings, activeTab]);

  const sizeToMm: Record<number, number> = {
    6: 16.5,
    7: 17.3,
    8: 18.2,
    9: 18.9,
    10: 19.8,
    11: 20.6
  };

  const headlineWords1 = "Made to".split(" ");
  const headlineWords2 = "be worn.".split(" ");

  return (
    <div className="min-h-screen bg-background relative selection:bg-gold selection:text-background overflow-x-hidden">
      <Nav />
      <CartDrawer />
      <WishlistDrawer />

      {/* SECTION 1: Cinematic Close-up Hero */}
      <section ref={heroRef} className="relative w-full h-screen flex items-end md:items-end overflow-hidden bg-ink pb-16 md:pb-24">
        {/* Background Image Parallax */}
        <motion.div 
          style={{ y: heroBgY, willChange: "transform" }}
          className="absolute inset-0 w-full h-full parallax-el scale-105"
        >
          <img 
            src="/src/assets/editorial.jpg" 
            alt="DHARAA Rings Editorial" 
            className="w-full h-full object-cover object-[center_60%]"
          />
          {/* Editorial dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
        </motion.div>

        {/* Decorative SVG Ring */}
        <motion.div
          style={{ y: heroRingY, willChange: "transform" }}
          className="absolute top-1/2 right-[10%] md:right-[20%] -translate-y-1/2 w-[120px] h-[120px] pointer-events-none opacity-50 parallax-el"
          animate={{ rotate: [0, 360], scale: [1, 1.06, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="#AB8C52" strokeWidth="1" />
            <circle cx="50" cy="50" r="40" stroke="#AB8C52" strokeWidth="0.5" strokeDasharray="2 4" />
          </svg>
        </motion.div>

        {/* Hero Content (Bottom-Left Aligned on Desktop) */}
        <div className="section-container relative z-10 w-full text-center md:text-left pt-32">
          <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="max-w-2xl">
            {/* Coordinates label */}
            <motion.p 
              className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-5 font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              § RINGS — SELECTION III
            </motion.p>

            {/* Word-by-word reveal line 1 */}
            <h1 className="font-display text-5xl md:text-[80px] text-white leading-[1.05] flex flex-wrap justify-center md:justify-start gap-x-4 mb-2">
              {headlineWords1.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-1">
                  <motion.span
                    className="inline-block font-light"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            
            {/* Word-by-word reveal line 2 */}
            <h1 className="font-display text-5xl md:text-[80px] text-white leading-[1.05] flex flex-wrap justify-center md:justify-start gap-x-4 mb-6">
              {headlineWords2.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-1">
                  <motion.span
                    className="inline-block italic text-gold font-light"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (idx + headlineWords1.length) * 0.1 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Elegant subline */}
            <motion.p
              className="font-sans text-sm text-white/70 max-w-[420px] mx-auto md:mx-0 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              Stackable bands, statement cocktail rings, and precise geometric designs. Crafted with full anti-tarnish integrity. From ₹89.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center justify-center md:justify-start gap-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <button 
                onClick={() => {
                  const target = document.getElementById("rings-collection-section");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-ink hover:bg-gold hover:text-white transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-4 px-8 border border-ink hover:border-gold rounded-none"
              >
                Explore Rings
              </button>
              
              <button 
                onClick={() => {
                  const target = document.getElementById("sizing-section");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-mono text-[10px] text-white hover:text-gold transition-colors font-bold uppercase tracking-widest py-4 px-2 border border-transparent border-b-gold/30 hover:border-b-gold rounded-none"
              >
                Ring Sizing Guide →
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
            const target = document.getElementById("material-strip");
            target?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-mono text-[7px] uppercase tracking-[0.2em] mb-1">SCROLL</span>
          <ChevronDown size={14} />
        </motion.div>
      </section>

      {/* SECTION 2: Material Integrity Strip */}
      <section id="material-strip" className="w-full relative py-16 overflow-hidden bg-gradient-to-r from-ink to-cream-soft">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 text-center relative">
            
            {/* Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.0 }}
              className="flex flex-col justify-center items-center py-4"
            >
              <span className="font-mono text-[8px] text-gold uppercase tracking-[0.2em] mb-3 font-semibold">MATERIAL</span>
              <h3 className="font-display text-2xl text-white mb-2">18K Gold Plated</h3>
              <p className="font-mono text-[9px] text-white/50 tracking-wider">Anti-tarnish molecular seal</p>
            </motion.div>

            {/* Divider 1 */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-[1px]">
              <motion.div 
                className="w-full h-full bg-gold/20 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "circOut" }}
              />
            </div>

            {/* Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="flex flex-col justify-center items-center py-4 relative"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-display text-[72px] text-white/10 leading-none">99</span>
              </div>
              <span className="font-mono text-[9px] text-gold uppercase tracking-[0.1em] mb-3 relative z-10">Pieces in our ring collection</span>
              <p className="font-sans text-sm text-white/70 relative z-10"><span className="text-white font-bold">300+</span> Anti-tarnish days tested</p>
            </motion.div>

            {/* Divider 2 */}
            <div className="hidden md:block absolute top-0 bottom-0 right-1/3 w-[1px]">
              <motion.div 
                className="w-full h-full bg-gold/20 origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "circOut", delay: 0.1 }}
              />
            </div>

            {/* Column 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-col justify-center items-center py-4"
            >
              <span className="font-mono text-[8px] text-gold uppercase tracking-[0.2em] mb-3 font-semibold">ORIGIN</span>
              <h3 className="font-display text-2xl text-ink mb-2">Zaveri Bazaar</h3>
              <p className="font-mono text-[9px] text-ink/60 tracking-wider">Seventh-generation ring smiths</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Ring Sizing Guide */}
      <section id="sizing-section" className="py-24 bg-cream-soft overflow-hidden">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: Controls */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col"
            >
              <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] mb-4 font-semibold">§ YOUR PERFECT FIT</span>
              <h2 className="font-display text-4xl lg:text-[40px] text-ink font-light leading-tight mb-6">
                Finding your ring size
              </h2>
              <p className="font-sans text-[13px] text-slate leading-relaxed mb-8 max-w-md">
                Measure at the widest part of your knuckle with a thin strip of paper. Our rings are designed to be sized in Indian standards.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {[6, 7, 8, 9, 10, 11].map(size => {
                  const isActive = size === selectedSize;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`relative px-6 py-3 font-mono text-[10px] transition-colors rounded-none border border-border group ${
                        isActive ? "text-white" : "text-ink hover:bg-white"
                      }`}
                      title={`${sizeToMm[size]} mm diameter`}
                    >
                      <span className="relative z-10 text-base">Size {size}</span>
                      {isActive && (
                        <motion.div
                          layoutId="sizing-active-pill"
                          className="absolute inset-0 bg-ink z-0"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              
              <p className="font-sans text-[11px] text-slate mb-4">
                All sizes listed in Indian ring standard.<br />
                Each ring is adjustable ±1 size without alteration.
              </p>
              
              <a href="#" className="font-mono text-[10px] text-gold hover:text-ink transition-colors uppercase tracking-widest border-b border-gold/30 hover:border-ink w-fit pb-1 mt-2 font-semibold">
                Download Size Chart (PDF)
              </a>
            </motion.div>

            {/* Right Side: Diagram */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center p-8 bg-white border border-border relative"
            >
              {/* SVG Diagram */}
              <div className="relative w-64 h-64 mb-10 mt-6">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
                  {/* Outer Ring */}
                  <motion.circle 
                    cx="100" cy="100" r="80" 
                    fill="none" stroke="#AB8C52" strokeWidth="2"
                    initial={{ strokeDasharray: 505, strokeDashoffset: 505 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  {/* Inner Ring */}
                  <motion.circle 
                    cx="100" cy="100" r="76" 
                    fill="none" stroke="#e5e5e5" strokeWidth="1"
                    initial={{ strokeDasharray: 480, strokeDashoffset: 480 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                  />
                  
                  {/* Measurement Line */}
                  <line x1="20" y1="100" x2="180" y2="100" stroke="#708090" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M 25 95 L 20 100 L 25 105" fill="none" stroke="#708090" strokeWidth="1" />
                  <path d="M 175 95 L 180 100 L 175 105" fill="none" stroke="#708090" strokeWidth="1" />
                  
                  {/* Measurement Text */}
                  <rect x="75" y="88" width="50" height="24" fill="white" />
                  <text x="100" y="104" textAnchor="middle" fill="#212121" fontSize="14" fontFamily="monospace" fontWeight="bold">
                    {sizeToMm[selectedSize]}mm
                  </text>
                </svg>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-slate bg-white px-3">
                  Inner Diameter
                </div>
              </div>
              
              {/* Reference Table */}
              <div className="w-full border-t border-border pt-6">
                <div className="grid grid-cols-3 gap-4 text-center font-mono text-[10px] tracking-wider mb-2 text-slate font-semibold">
                  <div>SIZE</div>
                  <div>INNER Ø mm</div>
                  <div>CIRCUMFERENCE mm</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center font-mono text-[11px] text-ink py-2 bg-cream-soft border border-border">
                  <div className="font-bold">{selectedSize}</div>
                  <div>{sizeToMm[selectedSize]}</div>
                  <div>{(sizeToMm[selectedSize] * Math.PI).toFixed(1)}</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Sticky Sub-Category Filter Tabs */}
      <section id="rings-collection-section" className="sticky top-[64px] z-30 w-full bg-background/95 backdrop-blur-md border-b border-border py-4 transition-all duration-300">
        <div className="section-container">
          <div className="flex items-center justify-start overflow-x-auto scrollbar-none gap-2 py-1 pr-6 md:justify-center">
            {RING_FILTERS.map((filter) => {
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
                      layoutId="ring-active-pill"
                      className="absolute inset-0 bg-ink rounded-none z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: Horizontal Editorial Scroll OR Grid */}
      {filteredProducts.length === 0 ? (
        <section className="py-20 bg-background">
          <div className="section-container text-center">
            <p className="font-sans text-slate">No rings found matching the selected style.</p>
          </div>
        </section>
      ) : activeTab === "all" && filteredProducts.length >= 6 ? (
        <section className="bg-background pt-16 pb-24 overflow-hidden">
          <div className="section-container mb-12 flex justify-between items-end">
            <div>
              <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] mb-4 block font-semibold">§ THE COLLECTION</span>
              <h2 className="font-display text-4xl text-ink font-light">Six rings. Six stories.</h2>
            </div>
            <motion.div 
              className="hidden md:flex items-center gap-2 text-gold font-mono text-[10px] font-bold tracking-widest uppercase"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              SCROLL TO EXPLORE <ArrowRight size={14} />
            </motion.div>
          </div>
          
          <div className="w-full overflow-x-auto snap-x snap-mandatory scrollbar-none pl-6 md:pl-20 pb-8 flex gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                className="relative flex-none w-[85vw] md:w-[380px] h-[60vh] md:h-[65vh] snap-center bg-cream group cursor-pointer border border-border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link to="/product/$id" params={{ id: product.id }} className="block w-full h-full relative overflow-hidden">
                  <motion.img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 text-white flex flex-col justify-end">
                    <h3 className="font-display text-2xl lg:text-[28px] font-light leading-tight mb-2">{product.name}</h3>
                    <p className="font-mono text-[10px] text-gold uppercase tracking-wider mb-5">₹{product.price} • {product.category}</p>
                    <span className="font-mono text-[10px] text-white uppercase tracking-widest border-b border-white/30 hover:border-gold transition-colors w-fit pb-1 font-semibold">
                      Shop →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
            {/* Spacer to allow last item to scroll into view cleanly */}
            <div className="flex-none w-[20px] md:w-[80px]" />
          </div>
        </section>
      ) : (
        /* Regular grid for filtered views */
        <section className="py-20 bg-background">
          <div className="section-container max-w-6xl mx-auto">
            <ProductGrid products={filteredProducts} />
          </div>
        </section>
      )}

      {/* SECTION 6: The Stacking Story (Split Narrative) */}
      <section ref={storyRef} className="section-container relative grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 py-20 lg:py-32 border-t border-border/50">
        
        {/* Left Column — Sticky description */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-36 h-fit">
          <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] mb-4 font-semibold">§ THE STACK EFFECT</span>
          <h2 className="font-display text-4xl lg:text-5xl text-ink leading-[1.1] mb-6">
            Stack with intent.<br />
            <em className="italic text-gold">Not by accident.</em>
          </h2>
          <p className="font-sans text-sm text-slate leading-relaxed mb-6">
            Curate your stack like a wardrobe. A thin geometric base, a bold oxidised statement, and a pearl cocktail to anchor your hand. The rule: odd numbers stack better than even.
          </p>
          
          <div className="border border-border bg-cream-soft p-6 mt-4">
            <p className="font-mono text-[10px] text-gold uppercase tracking-widest font-semibold mb-2">THE GUIDELINE</p>
            <p className="font-sans text-sm text-ink leading-relaxed">
              Vary your widths, textures, and finishes.<br />
              <span className="font-semibold mt-1 block">Gold + Oxidised Silver is the DHARAA signature pair.</span>
            </p>
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
              <img src="/src/assets/p3.jpg" alt="Foundation ring band" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
            </motion.div>
            <span className="absolute bottom-4 left-4 bg-background border border-border px-3 py-1.5 font-mono text-[9px] text-ink uppercase tracking-widest shadow-sm">
              The Foundation Band
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
              <img src="/src/assets/p4.jpg" alt="Statement ring" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
            </motion.div>
            <span className="absolute bottom-4 left-4 bg-background border border-border px-3 py-1.5 font-mono text-[9px] text-ink uppercase tracking-widest shadow-sm">
              The Statement Piece
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
              <img src="/src/assets/p1.jpg" alt="Finishing touch ring" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
            </motion.div>
            <span className="absolute bottom-4 left-4 bg-background border border-border px-3 py-1.5 font-mono text-[9px] text-ink uppercase tracking-widest shadow-sm">
              The Finishing Touch
            </span>
          </div>
          
        </div>
      </section>

      {/* SECTION 7: Social Proof Bar (Inline Marquee) */}
      <section className="w-full bg-cream border-t border-b border-border py-6 overflow-hidden relative">
        <div className="flex whitespace-nowrap">
          {[1, 2].map((group) => (
            <motion.div
              key={group}
              className="flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.25em] text-ink font-semibold"
              animate={{ x: [0, "-50%"] }}
              transition={{
                ease: "linear",
                duration: 32,
                repeat: Infinity,
              }}
            >
              <span className="flex items-center gap-12 whitespace-nowrap select-none">
                <span>Anti-Tarnish Integrity</span>
                <span className="text-gold">•</span>
                <span>Resizable Up to ±1 Size</span>
                <span className="text-gold">•</span>
                <span>Handcrafted in Mumbai</span>
                <span className="text-gold">•</span>
                <span>925 Sterling Silver Finish</span>
                <span className="text-gold">•</span>
                <span>5K+ Rings Worn Daily</span>
                <span className="text-gold">•</span>
                <span>4.9 ★ Rating</span>
                <span className="text-gold">•</span>
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 8: Final CTA (Dual Panel) */}
      <section className="w-full min-h-[400px] flex flex-col md:flex-row border-b border-border">
        {/* Left Panel (Cream) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 bg-cream-soft p-12 md:p-24 flex flex-col justify-center"
        >
          <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] mb-4 font-semibold">§ YOUR NEXT RING</span>
          <h2 className="font-display text-4xl md:text-[40px] text-ink font-light leading-tight mb-6">
            Rings that remember.
          </h2>
          <p className="font-sans text-sm text-slate max-w-md mb-10 leading-relaxed">
            Each DHARAA ring is sealed in our proprietary anti-tarnish coating — engineered to last 300+ days of daily wear.
          </p>
          <button 
            onClick={() => {
              const target = document.getElementById("rings-collection-section");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-fit bg-ink text-white hover:bg-gold hover:text-white transition-colors duration-300 font-mono text-[10px] font-bold uppercase tracking-widest py-4 px-8 border border-ink hover:border-gold rounded-none"
          >
            Shop All Rings
          </button>
        </motion.div>
        
        {/* Right Panel (Ink) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex-1 bg-ink p-12 md:p-24 flex flex-col justify-center relative overflow-hidden grain"
        >
          <div className="absolute top-1/2 -translate-y-1/2 right-0 pointer-events-none opacity-10">
            <span className="font-display text-[120px] text-white font-light tracking-tight">Gold.</span>
          </div>
          
          <div className="relative z-10 flex flex-col gap-10">
            <div>
              <span className="font-mono text-[8px] text-gold uppercase tracking-[0.2em] mb-1 block">STARTING AT</span>
              <span className="font-display text-3xl text-white">₹89</span>
              <p className="font-sans text-xs text-white/50 mt-1">Starting price for everyday rings</p>
            </div>
            <div>
              <span className="font-mono text-[8px] text-gold uppercase tracking-[0.2em] mb-1 block">FIT</span>
              <span className="font-display text-3xl text-white">6 sizes</span>
              <p className="font-sans text-xs text-white/50 mt-1">Available in sizes 6–11</p>
            </div>
            <div>
              <span className="font-mono text-[8px] text-gold uppercase tracking-[0.2em] mb-1 block">DURABILITY</span>
              <span className="font-display text-3xl text-white">300+ days</span>
              <p className="font-sans text-xs text-white/50 mt-1">Anti-tarnish guarantee tested</p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
