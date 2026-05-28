import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { OptimizedImage } from "@/components/OptimizedImage";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-cream">
      <motion.div style={{ y, scale }} className="parallax-el absolute inset-0">
        <OptimizedImage src={hero} alt="DHARAA jewellery" priority={true} className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream/60" />
      </motion.div>

      <div className="absolute left-0 right-0 top-28 z-10 flex justify-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="eyebrow text-ink/70"
        >
          Spring Edition · MMXXVI
        </motion.p>
      </div>

      <motion.div
        style={{ y: titleY, opacity }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="font-display text-[14vw] leading-[0.95] text-ink md:text-[9vw] lg:text-[8rem]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 1.7 }}
              className="block italic"
            >
              Everyday
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 1.85 }}
              className="block"
            >
              Heirlooms
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="mt-8 max-w-md text-sm leading-relaxed text-slate md:text-base"
        >
          Handcrafted in Mumbai. Worn from morning coffee to candlelit evenings.
          Thoughtful jewellery from <span className="text-gold">₹59</span>.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
        style={{ opacity }}
        className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center gap-3"
      >
        <span className="eyebrow text-ink/60">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-ink/60" />
        </motion.div>
      </motion.div>

      {/* corner labels */}
      <div className="absolute bottom-10 left-6 z-10 hidden text-[11px] uppercase tracking-[0.25em] text-ink/60 md:block">
        Mumbai<br/>19.0760° N
      </div>
      <div className="absolute bottom-10 right-6 z-10 hidden text-right text-[11px] uppercase tracking-[0.25em] text-ink/60 md:block">
        Volume 01<br/>Folio I
      </div>
    </section>
  );
}
