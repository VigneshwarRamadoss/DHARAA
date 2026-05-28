import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import editorial from "@/assets/editorial.jpg";
import { OptimizedImage } from "@/components/OptimizedImage";

export function Editorial() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} className="relative grid min-h-[100vh] grid-cols-1 overflow-hidden bg-ink md:grid-cols-12">
      <div className="relative col-span-7 h-[60vh] overflow-hidden md:h-auto">
        <motion.div style={{ y }} className="parallax-el absolute inset-0 h-[130%]">
          <OptimizedImage src={editorial} alt="DHARAA editorial" className="h-full w-full object-cover" />
        </motion.div>
      </div>
      <motion.div
        style={{ y: textY }}
        className="parallax-el col-span-5 flex flex-col justify-center gap-8 p-10 text-background md:p-16 lg:p-24"
      >
        <p className="eyebrow text-gold">§ 03 — The Atelier</p>
        <h2 className="font-display text-5xl leading-[1] md:text-6xl">
          Each piece <em className="italic">passes</em> through<br/>
          <em className="italic text-gold">seven</em> pairs of hands.
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-background/70">
          From the bylanes of Zaveri Bazaar to the quiet of our Bandra studio, DHARAA is shaped by craftspeople whose families have worked metal for generations. We bring you their best, at a price that respects your everyday.
        </p>
        <div className="grid grid-cols-3 gap-6 border-t border-background/15 pt-8">
          <div>
            <p className="font-display text-4xl">12</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-background/50">Years crafting</p>
          </div>
          <div>
            <p className="font-display text-4xl">5K+</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-background/50">Women adorned</p>
          </div>
          <div>
            <p className="font-display text-4xl">4.9</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-background/50">Avg. rating</p>
          </div>
        </div>
        <a href="#about" className="group mt-2 inline-flex w-fit items-center gap-3 border-b border-gold pb-2 text-xs uppercase tracking-[0.3em] text-gold">
          Read our story
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </motion.div>
    </section>
  );
}
