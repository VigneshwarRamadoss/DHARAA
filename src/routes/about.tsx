import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import editorialImg from '@/assets/editorial.jpg';
import heroImg from '@/assets/hero.jpg';
import p1Img from '@/assets/p1.jpg';
import p2Img from '@/assets/p2.jpg';
import p3Img from '@/assets/p3.jpg';
import { OptimizedImage } from '@/components/OptimizedImage';

export const Route = createFileRoute('/about')({
  component: AboutPage
});

function AboutPage() {
  const prefersReduced = useReducedMotion();
  
  // Ref for asymmetric image gallery
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: galleryScroll } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });

  // Calculate distinct parallax offset ranges for depth
  const img1Y = useTransform(galleryScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["-10%", "10%"]);
  const img2Y = useTransform(galleryScroll, [0, 1], prefersReduced ? ["0%", "0%"] : ["12%", "-12%"]);

  const titleWords = "The DHARAA Story".split(" ");

  return (
    <div className="min-h-screen bg-background relative selection:bg-gold selection:text-background">
      <Nav />
      <main className="pt-32 pb-0">
        
        {/* Editorial Hero Section */}
        <section className="section-container text-center mb-16 relative grain py-16">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Monospace coordinates tag */}
            <motion.p 
              className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-5 font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              19.0760° N, 72.8777° E • MUMBAI ATELIER
            </motion.p>
            
            {/* Character-by-character title reveal */}
            <h1 className="font-display text-5xl md:text-8xl text-ink mb-8 flex flex-wrap justify-center gap-x-4">
              {titleWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-1">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            
            {/* Elegant subtext with smooth fade-up */}
            <motion.p 
              className="font-sans text-base md:text-lg text-slate leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              We believe that everyday luxury should be accessible, enduring, and effortlessly elegant. 
              DHARAA was born from a simple desire: to create jewelry that lives with you, not just inside your safe box.
            </motion.p>
          </div>
        </section>

        {/* Asymmetric Dual-Image Parallax Gallery */}
        <section ref={galleryRef} className="w-full max-w-[1300px] mx-auto px-6 md:px-12 lg:px-24 mb-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative">
            
            {/* Slowly rotating circular gold stamp motif */}
            <motion.div
              className="absolute z-10 w-28 h-28 border border-gold/25 rounded-full hidden md:flex items-center justify-center text-[8px] font-mono uppercase tracking-[0.2em] text-gold pointer-events-none"
              style={{ top: "45%", left: "50%", x: "-50%", y: "-50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute animate-pulse text-gold font-serif text-[18px]">D</span>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <path id="stamp-path" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                <text className="fill-gold text-[7px]" letterSpacing="1.2">
                  <textPath href="#stamp-path" startOffset="0%">
                    • THOUGHTFULLY CRAFTED • EST. 2026
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Left Image Column (Portrait — shifts slightly UP on scroll) */}
            <div className="col-span-1 md:col-span-7 overflow-hidden relative">
              <motion.div 
                style={{ y: img1Y }}
                className="aspect-[3/4] bg-cream border border-border overflow-hidden relative parallax-el"
              >
                <div className="absolute inset-0 bg-ink/5" />
                <OptimizedImage 
                  src={editorialImg} 
                  alt="DHARAA Atelier Editorial" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                />
              </motion.div>
            </div>

            {/* Right Image Column (Landscape — shifts slightly DOWN on scroll) */}
            <div className="col-span-1 md:col-span-5 overflow-hidden md:mt-24 relative">
              <motion.div 
                style={{ y: img2Y }}
                className="aspect-square bg-cream border border-border overflow-hidden relative parallax-el"
              >
                <div className="absolute inset-0 bg-ink/5" />
                <OptimizedImage 
                  src={heroImg} 
                  alt="Fine Crafted Rings" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                />
              </motion.div>
            </div>

          </div>
        </section>

        {/* The Atelier Heritage Split-Screen */}
        <section className="section-container relative grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 py-20 lg:py-32 border-t border-border/50">
          
          {/* Left Column — Sticky description */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-36 h-fit">
            <p className="eyebrow mb-4">§ 01 — THE HERITAGE</p>
            <h2 className="font-display text-4xl lg:text-5xl text-ink leading-[1.1] mb-6">
              Formed in Mumbai.<br />
              <em className="italic text-gold">Adored</em> everywhere.
            </h2>
            <p className="font-sans text-sm text-slate leading-relaxed mb-6">
              From the historic jewelry lanes of Zaveri Bazaar to the modern design tables of our Bandra studio, each DHARAA piece is shaped by an intersection of generational metal-craft and high-fashion minimalism.
            </p>
            <p className="font-sans text-sm text-slate leading-relaxed mb-8">
              We work directly with craftspeople whose families have honed the art of gold plating and silver oxidation for generations. By cutting out retail middlemen, we respect both their trade and your pocket.
            </p>
            
            {/* Staggered features row */}
            <div className="grid grid-cols-2 gap-8 border-t border-border pt-8">
              <div>
                <p className="font-mono text-[10px] text-gold uppercase tracking-wider font-semibold">The Promise</p>
                <p className="font-sans text-base font-bold text-ink mt-1">Anti-Tarnish Wear</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-gold uppercase tracking-wider font-semibold">The Standard</p>
                <p className="font-sans text-base font-bold text-ink mt-1">7 Pairs of Hands</p>
              </div>
            </div>
          </div>

          {/* Right Column — Cascading detailed product visuals */}
          <div className="lg:col-span-7 flex flex-col gap-16 lg:gap-24">
            
            <motion.div 
              className="relative aspect-[3/4] bg-cream border border-border overflow-hidden"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <OptimizedImage src={p1Img} alt="Detail Jewelry Craft" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
            </motion.div>
            
            <motion.div 
              className="relative aspect-[4/3] bg-cream border border-border overflow-hidden lg:ml-12"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              <OptimizedImage src={p2Img} alt="Minimal Luxury Design" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
            </motion.div>
            
            <motion.div 
              className="relative aspect-[3/4] bg-cream border border-border overflow-hidden lg:mr-12"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <OptimizedImage src={p3Img} alt="Everyday Heirloom Pieces" className="w-full h-full object-cover transition-transform duration-700 hover:scale-103" />
            </motion.div>
            
          </div>
        </section>

        {/* Redesigned Bento Values Grid */}
        <section className="bg-cream-soft py-20 lg:py-32 border-t border-b border-border relative overflow-hidden grain">
          <div className="section-container">
            
            <div className="text-center mb-20">
              <p className="eyebrow mb-4">§ 02 — OUR FOUNDATIONS</p>
              <h2 className="font-display text-4xl lg:text-5xl text-ink">Built on Intentionality</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Card I */}
              <motion.div 
                className="bg-background border border-border p-8 lg:p-12 flex flex-col justify-between hover:border-gold/40 transition-all duration-300 shadow-sm relative group cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div>
                  <div className="font-display text-xs tracking-widest text-gold mb-8 font-semibold">INDEX • I</div>
                  <h3 className="font-sans text-lg font-bold text-ink mb-4 group-hover:text-gold transition-colors duration-300">Anti-Tarnish Promise</h3>
                  <p className="font-sans text-sm text-slate leading-relaxed">
                    Our pieces are sealed using state-of-the-art coating technology, protecting them against tarnishing and everyday wear. They are designed to live with you, maintaining their golden finish through morning coffee, workouts, and evening galas.
                  </p>
                </div>
                <div className="mt-10 border-t border-border/30 pt-6 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-slate font-semibold">
                  <span>Standard</span>
                  <span className="text-gold">Lifetime Integrity</span>
                </div>
              </motion.div>
              
              {/* Card II */}
              <motion.div 
                className="bg-background border border-border p-8 lg:p-12 flex flex-col justify-between hover:border-gold/40 transition-all duration-300 shadow-sm relative group cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -3 }}
              >
                <div>
                  <div className="font-display text-xs tracking-widest text-gold mb-8 font-semibold">INDEX • II</div>
                  <h3 className="font-sans text-lg font-bold text-ink mb-4 group-hover:text-gold transition-colors duration-300">Accessible Luxury</h3>
                  <p className="font-sans text-sm text-slate leading-relaxed">
                    By building direct-to-craft relationships and managing our entire design cycle in-house, we remove traditional wholesale markups. We bring you premium, hand-finished quality at honest, sensible price-points.
                  </p>
                </div>
                <div className="mt-10 border-t border-border/30 pt-6 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-slate font-semibold">
                  <span>Plating Standard</span>
                  <span className="text-gold">Artisan Direct</span>
                </div>
              </motion.div>
              
              {/* Card III */}
              <motion.div 
                className="bg-background border border-border p-8 lg:p-12 flex flex-col justify-between hover:border-gold/40 transition-all duration-300 shadow-sm relative group cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -3 }}
              >
                <div>
                  <div className="font-display text-xs tracking-widest text-gold mb-8 font-semibold">INDEX • III</div>
                  <h3 className="font-sans text-lg font-bold text-ink mb-4 group-hover:text-gold transition-colors duration-300">Mindful Design</h3>
                  <p className="font-sans text-sm text-slate leading-relaxed">
                    Every piece is crafted to transcend fleeting seasonal trends. We design our items with modularity and layering in mind—enabling you to mix, match, and transition effortlessly from day-to-day.
                  </p>
                </div>
                <div className="mt-10 border-t border-border/30 pt-6 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-slate font-semibold">
                  <span>Ethos</span>
                  <span className="text-gold">Modular Elegance</span>
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
