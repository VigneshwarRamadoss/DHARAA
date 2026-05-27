import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Deals() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-40">
      <motion.div
        style={{ x: x1 }}
        className="parallax-el whitespace-nowrap font-display text-[14vw] leading-none italic text-beige"
      >
        Under ₹99 · Under ₹99 · Under ₹99 ·
      </motion.div>
      <motion.div
        style={{ x: x2 }}
        className="parallax-el mt-[-2vw] whitespace-nowrap font-display text-[14vw] leading-none text-cream"
      >
        Daily Luxuries · Daily Luxuries ·
      </motion.div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .deals-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(171, 140, 82, 0.3), transparent);
          animation: shimmer 3s infinite 2s;
          pointer-events: none;
        }
      `}</style>
      <motion.div style={{ y: textY, willChange: "transform" }} className="relative z-10 mx-auto mt-16 max-w-2xl px-6 text-center">
        <p className="eyebrow mb-4">Limited drop</p>
        <h3 className="deals-shimmer relative overflow-hidden font-display text-4xl text-ink md:text-5xl">
          <span className="relative z-10">210 pieces. <em className="italic text-orange">99 rupees.</em></span>
        </h3>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate">
          Hand-picked everyday essentials. New drops every fortnight, gone before you blink.
        </p>
        <a
          href="#shop"
          className="mt-8 inline-flex items-center gap-3 bg-ink px-10 py-4 text-xs uppercase tracking-[0.3em] text-background transition hover:bg-gold"
        >
          Shop the drop
          <span>→</span>
        </a>
      </motion.div>
    </section>
  );
}
