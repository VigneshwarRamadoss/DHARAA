import { motion } from "framer-motion";

const quotes = [
  { q: "The Mira pendant hasn't left my neck in four months. Still gleams like day one.", a: "Aanya R.", c: "Bengaluru" },
  { q: "Gifted the Devi stack to my mother — she cried. That's the review.", a: "Ishani M.", c: "Delhi" },
  { q: "Finally jewellery that doesn't apologise for being affordable.", a: "Priya K.", c: "Pune" },
];

export function Testimonials() {
  return (
    <section className="bg-cream py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <p className="eyebrow mb-12 text-center">§ 04 — Voices</p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {quotes.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.65, 0, 0.35, 1] }}
              className="flex flex-col gap-6"
            >
              <span className="font-display text-7xl leading-none text-gold">"</span>
              <blockquote className="font-display text-2xl leading-snug italic text-ink">
                {t.q}
              </blockquote>
              <figcaption className="mt-2 text-xs uppercase tracking-[0.25em] text-warm">
                — {t.a}, <span className="text-gold">{t.c}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
