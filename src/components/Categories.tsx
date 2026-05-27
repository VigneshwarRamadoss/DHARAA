import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sparkles, Crown, Gift, Tag } from "lucide-react";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";

interface CatItem {
  n: string;
  name: string;
  desc: string;
  count: number;
  img: string;
  icon: React.ReactNode;
}

const cats: CatItem[] = [
  { n: "01", name: "Anti-Tarnish", desc: "Lasts a lifetime, looks like new.", count: 124, img: p1, icon: <Sparkles className="h-10 w-10 stroke-[1.25]" /> },
  { n: "02", name: "Oxidised", desc: "Old-world silver, modern silhouettes.", count: 86, img: p2, icon: <Crown className="h-10 w-10 stroke-[1.25]" /> },
  { n: "03", name: "Gift Combos", desc: "Curated sets, ribbon-tied.", count: 42, img: p3, icon: <Gift className="h-10 w-10 stroke-[1.25]" /> },
  { n: "04", name: "Under ₹99", desc: "Daily luxuries, generously priced.", count: 210, img: p4, icon: <Tag className="h-10 w-10 stroke-[1.25]" /> },
];

function CategoryCard({ c, i }: { c: CatItem; i: number }) {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile || prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    setRotateX(-deltaY * 6); // Max 6deg tilt
    setRotateY(deltaX * 6);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 40 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  return (
    <motion.a
      href="#shop"
      variants={cardVariants}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        willChange: "transform",
      }}
      whileHover={prefersReduced ? {} : {
        y: -4,
        transition: { duration: 0.25, ease: "easeOut" }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden rounded-none bg-background shadow-none transition-shadow duration-300 hover:shadow-[0px_8px_16px_rgba(0,0,0,0.1)]"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={c.img}
          alt={c.name}
          loading="lazy"
          className="h-full w-full object-cover object-center"
          whileHover={prefersReduced ? {} : { scale: 1.06 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {/* Light overlay for black text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent transition-opacity duration-300 group-hover:from-white/95 group-hover:via-white/70" />
      </div>

      {/* Floating Badge Metadata at top */}
      <div 
        className="absolute top-6 left-6 right-6 z-10 flex justify-between font-mono text-[10px] tracking-[0.2em] text-ink/70"
        style={{ transform: "translateZ(20px)" }}
      >
        <span>{c.n}</span>
        <span>{c.count} PIECES</span>
      </div>

      {/* Center 40px Icon */}
      <div 
        className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-ink/40 transition-all duration-500 group-hover:scale-110 group-hover:text-gold"
        style={{ transform: "translateZ(30px) translate(-50%, -50%)" }}
      >
        {c.icon}
      </div>

      {/* Bottom Text Content */}
      <div 
        className="absolute bottom-6 left-6 right-6 z-10 flex flex-col items-start text-ink"
        style={{ transform: "translateZ(25px)" }}
      >
        <h3 className="font-display font-light text-2xl tracking-wide text-ink transition-transform duration-500 group-hover:-translate-y-0.5">
          {c.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate font-sans">
          {c.desc}
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-ink">
          <span className="transition-all duration-300 group-hover:text-gold">Explore</span>
          <span className="h-px w-6 bg-ink transition-all duration-300 group-hover:w-12 group-hover:bg-gold" />
        </div>
      </div>
    </motion.a>
  );
}

export function Categories() {
  return (
    <section id="categories" className="relative bg-[#FAF7F2] py-32 md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="mb-20 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">§ 01 — Collections</p>
            <h2 className="font-display text-5xl leading-[0.95] text-ink md:text-7xl">
              Curated by <em className="italic text-gold">hand,</em><br/>worn by <em className="italic">heart.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate">
            Four collections, each shaped around a different season of feeling. Choose the mood, find the piece.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cats.map((c, i) => (
            <CategoryCard key={c.name} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
