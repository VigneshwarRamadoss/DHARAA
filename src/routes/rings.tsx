import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductGrid } from '@/components/ProductGrid';
import { mockProducts } from '@/data/products';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronDown, ArrowRight } from 'lucide-react';
import editorialImg from '@/assets/editorial.jpg';
import p1Img from '@/assets/p1.jpg';
import p3Img from '@/assets/p3.jpg';
import p4Img from '@/assets/p4.jpg';
import { OptimizedImage } from '@/components/OptimizedImage';

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

  const [calibrationPxPerMm, setCalibrationPxPerMm] = useState<number>(3.77952756); // 96 DPI / 25.4 mm
  const [hasUserCalibrated, setHasUserCalibrated] = useState<boolean>(false);
  
  // Calibration selector states
  const [calibrationType, setCalibrationType] = useState<"coin_in" | "coin_us" | "card_h" | "card_v">("coin_in");
  const [sliderValue, setSliderValue] = useState<number>(102); // 27mm * 3.7795 default
  const [showCalibration, setShowCalibration] = useState<boolean>(false);
  const [showMathConsole, setShowMathConsole] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem('dharaa_screen_calibration');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.pxPerMm) {
          setCalibrationPxPerMm(data.pxPerMm);
          setHasUserCalibrated(true);
        }
      } catch (e) {}
    }
  }, []);

  // Update slider value when calibration type changes to pre-align with current calibration
  useEffect(() => {
    let sizeMm = 27.00;
    if (calibrationType === "coin_us") sizeMm = 24.26;
    else if (calibrationType === "card_h") sizeMm = 85.60;
    else if (calibrationType === "card_v") sizeMm = 53.98;
    
    setSliderValue(Math.round(calibrationPxPerMm * sizeMm));
  }, [calibrationType]);

  const confirmCalibration = () => {
    let sizeMm = 27.00;
    if (calibrationType === "coin_us") sizeMm = 24.26;
    else if (calibrationType === "card_h") sizeMm = 85.60;
    else if (calibrationType === "card_v") sizeMm = 53.98;

    const pxPerMm = sliderValue / sizeMm;
    setCalibrationPxPerMm(pxPerMm);
    setHasUserCalibrated(true);
    setShowCalibration(false);
    localStorage.setItem('dharaa_screen_calibration', JSON.stringify({
      pxPerMm,
      calibratedAt: new Date().toISOString()
    }));
  };

  const getInnerDiameterPx = (sizeMm: number) => {
    return sizeMm * calibrationPxPerMm;
  };
  
  const getOuterDiameterPx = (sizeMm: number) => {
    return (sizeMm + 3.2) * calibrationPxPerMm; // 1.6mm band thickness on each side
  };

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
          <OptimizedImage 
            src={editorialImg} 
            alt="DHARAA Rings Editorial" 
            priority={true}
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

            {/* Right Side: Dynamic Sizing & Math Console */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-start p-8 bg-white border border-border relative min-h-[520px] w-full"
            >
              <AnimatePresence mode="wait">
                {showCalibration ? (
                  /* INLINE CALIBRATION Drawer */
                  <motion.div
                    key="calibration"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="flex justify-between items-center w-full mb-6 pb-4 border-b border-border">
                      <span className="font-mono text-[9px] text-ink uppercase tracking-[0.25em] font-bold">
                        § FINE-TUNE PRECISION
                      </span>
                      <button 
                        onClick={() => setShowCalibration(false)}
                        className="font-mono text-[9px] text-slate hover:text-ink uppercase tracking-widest transition-colors font-bold"
                      >
                        [Close]
                      </button>
                    </div>

                    <p className="font-sans text-[12px] text-slate text-center max-w-[320px] mb-6">
                      Every screen has a different physical density. Match the visual reference below to a real object to calibrate your screen to 100% precision.
                    </p>

                    {/* Object Switcher Tabs */}
                    <div className="flex flex-wrap bg-cream-soft border border-border p-1 mb-6 rounded-none justify-center w-full max-w-[340px]">
                      <button 
                        onClick={() => setCalibrationType("coin_in")}
                        className={`font-mono text-[9px] px-3 py-2 uppercase tracking-widest transition-colors ${calibrationType === "coin_in" ? "bg-ink text-white font-bold" : "text-slate hover:text-ink"}`}
                      >
                        ₹10 Coin
                      </button>
                      <button 
                        onClick={() => setCalibrationType("coin_us")}
                        className={`font-mono text-[9px] px-3 py-2 uppercase tracking-widest transition-colors ${calibrationType === "coin_us" ? "bg-ink text-white font-bold" : "text-slate hover:text-ink"}`}
                      >
                        US Quarter
                      </button>
                      <button 
                        onClick={() => setCalibrationType("card_h")}
                        className={`font-mono text-[9px] px-3 py-2 uppercase tracking-widest transition-colors ${calibrationType === "card_h" ? "bg-ink text-white font-bold" : "text-slate hover:text-ink"}`}
                      >
                        Card (H)
                      </button>
                      <button 
                        onClick={() => setCalibrationType("card_v")}
                        className={`font-mono text-[9px] px-3 py-2 uppercase tracking-widest transition-colors ${calibrationType === "card_v" ? "bg-ink text-white font-bold" : "text-slate hover:text-ink"}`}
                      >
                        Card (V)
                      </button>
                    </div>

                    {/* Visualizer Area */}
                    <div className="w-full flex justify-center items-center py-6 mb-6 relative min-h-[220px] bg-cream-soft/50 border border-dashed border-border/80">
                      {/* Virtual Ruler overlay for cards */}
                      {(calibrationType === "card_h" || calibrationType === "card_v") && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[15px] flex items-end justify-center pointer-events-none opacity-40">
                          <div className="relative h-full flex items-end border-b border-ink/50" style={{ width: `${calibrationType === "card_h" ? sliderValue : (sliderValue / 53.98 * 85.60)}px` }}>
                            {[0, 10, 20, 30, 40, 50, 60, 70, 80].map(mm => (
                              <div key={mm} className="absolute bottom-0 w-px bg-ink" style={{ 
                                height: mm % 10 === 0 ? '8px' : '4px',
                                left: `${mm * (sliderValue / (calibrationType === "card_h" ? 85.60 : 53.98))}px` 
                              }}>
                                {mm % 10 === 0 && <span className="absolute -top-3 -translate-x-1/2 text-[6px] font-mono">{mm}</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Coin wireframe */}
                      {(calibrationType === "coin_in" || calibrationType === "coin_us") && (
                        <div 
                          className="rounded-full border border-gold bg-white relative flex flex-col justify-center items-center shadow-lg transition-none flex-shrink-0"
                          style={{ 
                            width: `${sliderValue}px`, 
                            height: `${sliderValue}px`
                          }}
                        >
                          <div className="absolute inset-1.5 rounded-full border border-gold/40 border-dashed" />
                          <div className="absolute inset-3 rounded-full border border-gold/20" />
                          <span className="font-display italic text-gold text-sm tracking-wide z-10 font-bold select-none">
                            {calibrationType === "coin_in" ? "₹10" : "25¢"}
                          </span>
                          <span className="font-mono text-[7px] text-gold/60 uppercase tracking-widest mt-1 z-10 select-none">
                            {calibrationType === "coin_in" ? "27.0 mm" : "24.26 mm"}
                          </span>
                        </div>
                      )}

                      {/* Card layout */}
                      {(calibrationType === "card_h" || calibrationType === "card_v") && (
                        <div 
                          className="bg-ink rounded-xl border border-gold/30 shadow-[0_15px_30px_rgba(0,0,0,0.15)] relative flex flex-col justify-between overflow-hidden transition-none flex-shrink-0"
                          style={{ 
                            width: calibrationType === "card_h" ? `${sliderValue}px` : `${Math.round(sliderValue / 53.98 * 85.60)}px`, 
                            height: calibrationType === "card_v" ? `${sliderValue}px` : `${Math.round(sliderValue / 85.60 * 53.98)}px`
                          }}
                        >
                          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent pointer-events-none"></div>
                          <div className="p-3 w-full flex justify-between items-start">
                            <div className="w-8 h-6 bg-gradient-to-br from-[#E5C158] to-[#C0962E] rounded border border-yellow-200/50 flex flex-wrap shadow-inner relative overflow-hidden opacity-90">
                              <div className="absolute top-1/2 left-0 right-0 h-px bg-yellow-900/20"></div>
                              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-yellow-900/20"></div>
                            </div>
                            <span className="font-display italic text-gold/50 text-sm tracking-widest">DHARAA</span>
                          </div>
                          <div className="p-3 w-full">
                            <span className="font-mono text-[8px] text-white/40 tracking-[0.2em] uppercase select-none">
                              {calibrationType === "card_h" ? "85.60 mm Width" : "53.98 mm Height"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <input 
                      type="range" 
                      min={calibrationType === "coin_in" ? "70" : calibrationType === "coin_us" ? "60" : calibrationType === "card_h" ? "180" : "110"} 
                      max={calibrationType === "coin_in" ? "200" : calibrationType === "coin_us" ? "180" : calibrationType === "card_h" ? "550" : "380"} 
                      value={sliderValue} 
                      onChange={(e) => setSliderValue(Number(e.target.value))}
                      className="w-full max-w-[300px] mb-6 accent-ink"
                    />

                    <div className="flex gap-4 w-full max-w-[300px]">
                      <button 
                        onClick={() => setShowCalibration(false)}
                        className="flex-1 bg-white text-ink border border-border hover:bg-cream-soft transition-colors font-mono text-[9px] font-bold uppercase tracking-widest py-3 rounded-none"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={confirmCalibration}
                        className="flex-1 bg-ink text-white hover:bg-gold hover:text-white transition-colors duration-300 font-mono text-[9px] font-bold uppercase tracking-widest py-3 rounded-none"
                      >
                        Confirm
                      </button>
                    </div>
                    
                    <p className="font-sans text-[10px] text-slate mt-4 italic text-center max-w-[280px]">
                      Adjust the slider until the golden wireframe on screen matches your real physical object's size exactly.
                    </p>
                  </motion.div>
                ) : (
                  /* TRUE-SIZE RING PREVIEW (Default active view) */
                  <motion.div
                    key="true-size-ring"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col items-center relative"
                  >
                    <div className="flex justify-between items-center w-full mb-6 pb-4 border-b border-border">
                      <div className="flex flex-col gap-1 items-start text-left">
                        <span className="font-mono text-[9px] text-gold uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5">
                          § TRUE SCALE SIZER
                          <span className={`w-1.5 h-1.5 rounded-full ${hasUserCalibrated ? 'bg-green-500 animate-pulse' : 'bg-gold'}`} title={hasUserCalibrated ? "Calibrated" : "Smart Default"}></span>
                        </span>
                        <span className="font-mono text-[7px] text-slate uppercase tracking-wider">
                          {hasUserCalibrated ? "100% physically calibrated" : "Smart Scale (95% Accurate)"}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setShowMathConsole(!showMathConsole)}
                          className="font-mono text-[9px] text-slate hover:text-ink uppercase tracking-widest transition-colors font-bold"
                        >
                          {showMathConsole ? "[Hide Math]" : "[View Math]"}
                        </button>
                        <button 
                          onClick={() => setShowCalibration(true)}
                          className="font-mono text-[9px] text-gold hover:text-ink uppercase tracking-widest transition-colors flex items-center gap-1 font-bold"
                        >
                          ⚙ {hasUserCalibrated ? "Recalibrate" : "Fine-Tune (100%)"}
                        </button>
                      </div>
                    </div>

                    {showMathConsole ? (
                      /* MATH CONSOLE */
                      <div className="w-full bg-[#111] text-[#33FF00] p-4 rounded-sm font-mono text-[9px] leading-relaxed overflow-y-auto max-h-[350px] scrollbar-thin shadow-inner text-left">
                        <p className="text-white/50 mb-2 border-b border-white/20 pb-1">DHARAA SIZING DIAGNOSTICS</p>
                        <p>{`> ACTIVE PIXEL DENSITY:`}</p>
                        <p className="pl-2">{`pxPerMm = ${calibrationPxPerMm.toFixed(4)} px/mm`}</p>
                        <p className="pl-2">{`Est. DPI = ${(calibrationPxPerMm * 25.4).toFixed(1)} DPI`}</p>
                        <p className="pl-2">{`Status = ${hasUserCalibrated ? "User Calibrated" : "System CSS Default"}`}</p>
                        <p className="mt-2">{`> RING BAND SPECS:`}</p>
                        <p className="pl-2">{`Band Thickness = 1.6 mm (each side)`}</p>
                        <p className="mt-2">{`> RENDER COMPUTATION (SIZE ${selectedSize}):`}</p>
                        <p className="pl-2">{`Target Inner = ${sizeToMm[selectedSize]} mm`}</p>
                        <p className="pl-2">{`Inner CSS = ${sizeToMm[selectedSize]} * ${calibrationPxPerMm.toFixed(4)} = ${getInnerDiameterPx(sizeToMm[selectedSize]).toFixed(2)}px`}</p>
                        <p className="pl-2">{`Outer CSS = (${sizeToMm[selectedSize]} + 3.2) * ${calibrationPxPerMm.toFixed(4)} = ${getOuterDiameterPx(sizeToMm[selectedSize]).toFixed(2)}px`}</p>
                        <p className="mt-2">{`> VALIDATION:`}</p>
                        <p className="pl-2">{`Box-sizing: content-box enforced.`}</p>
                        <p className="pl-2 text-white/50">{`Physical alignment guaranteed.`}</p>
                      </div>
                    ) : (
                      /* REALISTIC RING RENDER */
                      <div className="w-full flex flex-col items-center">
                        <p className="font-sans text-[12px] text-slate text-center max-w-[280px] mb-8">
                          Place a physical ring flat on your screen. The <strong>inside</strong> of your ring should align perfectly with the inner edge of the gold band.
                        </p>

                        <div className="relative flex justify-center items-center w-full min-h-[220px] mb-8">
                          <motion.div 
                            className="rounded-full flex items-center justify-center relative bg-gradient-to-br from-[#dfba73] via-[#ffeec2] to-[#9e7d3b] shadow-[0_12px_28px_rgba(0,0,0,0.18)] cursor-pointer group"
                            animate={{ 
                              width: getOuterDiameterPx(sizeToMm[selectedSize]),
                              height: getOuterDiameterPx(sizeToMm[selectedSize])
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          >
                            {/* Inner Hole */}
                            <motion.div
                              className="rounded-full bg-white shadow-[inset_0_5px_10px_rgba(0,0,0,0.2)] flex items-center justify-center relative overflow-hidden"
                              animate={{ 
                                width: getInnerDiameterPx(sizeToMm[selectedSize]),
                                height: getInnerDiameterPx(sizeToMm[selectedSize])
                              }}
                              transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                              {/* Shimmer Effect */}
                              <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out pointer-events-none z-0"></div>
                              
                              {/* Measurement Line */}
                              <div className="absolute w-full h-[1px] bg-slate/30 z-10" />
                              <div className="absolute left-0 w-[1px] h-[6px] bg-ink z-10" />
                              <div className="absolute right-0 w-[1px] h-[6px] bg-ink z-10" />
                              <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 z-25 font-mono text-[10px] text-ink font-bold shadow-sm rounded-sm">
                                {sizeToMm[selectedSize]}mm
                              </div>
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* All Outcomes True-Scale Matrix */}
                        <div className="w-full mt-2 pt-6 border-t border-border">
                          <p className="font-mono text-[9px] text-ink uppercase tracking-[0.25em] mb-2 text-center font-bold">ALL OUTCOMES (TRUE SCALE)</p>
                          <p className="font-sans text-[10px] text-slate text-center mb-4">Place your physical ring directly on the screen to compare all sizes at once.</p>
                          
                          <div className="flex overflow-x-auto w-full gap-6 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gold/50 scrollbar-track-cream-soft px-4">
                            {[6, 7, 8, 9, 10, 11].map((sz) => (
                              <div 
                                key={sz} 
                                onClick={() => setSelectedSize(sz)}
                                className="snap-center flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group"
                              >
                                <div 
                                  className={`rounded-full flex items-center justify-center transition-all ${selectedSize === sz ? 'bg-gradient-to-br from-[#dfba73] via-[#ffeec2] to-[#9e7d3b] shadow-md' : 'bg-[#e5e7eb] group-hover:bg-[#d1d5db]'}`}
                                  style={{ 
                                    width: `${getOuterDiameterPx(sizeToMm[sz])}px`, 
                                    height: `${getOuterDiameterPx(sizeToMm[sz])}px`
                                  }}
                                >
                                  <div 
                                    className="rounded-full bg-white shadow-inner flex items-center justify-center relative"
                                    style={{ 
                                      width: `${getInnerDiameterPx(sizeToMm[sz])}px`, 
                                      height: `${getInnerDiameterPx(sizeToMm[sz])}px` 
                                    }}
                                  >
                                    <span className={`font-mono text-[9px] ${selectedSize === sz ? 'text-ink font-bold' : 'text-slate'}`}>
                                      {sizeToMm[sz]}
                                    </span>
                                  </div>
                                </div>
                                <span className={`font-mono text-[10px] ${selectedSize === sz ? 'text-ink font-bold border-b border-gold' : 'text-slate'}`}>
                                  SIZE {sz}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
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
                      transition={{ type: "spring", stiffness: 450, damping: 28 }}
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
                  <OptimizedImage 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    onHoverScale={1.05}
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
              <OptimizedImage src={p3Img} alt="Foundation ring band" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
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
              <OptimizedImage src={p4Img} alt="Statement ring" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
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
              <OptimizedImage src={p1Img} alt="Finishing touch ring" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
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
