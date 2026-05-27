import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";

const products = [
  { img: p1, name: "Halo Hoops", tag: "Anti-Tarnish", price: 249, n: "Nº 01" },
  { img: p2, name: "Mira Pendant", tag: "Oxidised Silver", price: 329, n: "Nº 02" },
  { img: p3, name: "Devi Stack", tag: "Fine Gold", price: 399, n: "Nº 03" },
  { img: p4, name: "Saanjh Chain", tag: "Everyday Gold", price: 189, n: "Nº 04" },
];

export function BestSellers() {
  return (
    <section id="shop" className="bg-cream-soft py-32 md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-4">§ 02 — Most loved</p>
            <h2 className="font-display text-5xl leading-[0.95] text-ink md:text-7xl">
              Best <em className="italic">sellers</em>
            </h2>
          </div>
          <a href="#shop" className="group hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink md:flex">
            <span className="transition-colors group-hover:text-gold">View all 500 pieces</span>
            <span className="h-px w-10 bg-ink transition-all group-hover:w-16 group-hover:bg-gold" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-16 md:grid-cols-4 md:gap-x-8">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.65, 0, 0.35, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-beige">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-background/80 backdrop-blur transition hover:bg-background">
                  <Heart className="h-4 w-4 text-ink" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-ink p-4 text-background transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-center text-xs uppercase tracking-[0.25em]">+ Quick Add</p>
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-warm">{p.n} · {p.tag}</p>
                  <h3 className="mt-1 font-display text-2xl text-ink">{p.name}</h3>
                </div>
                <p className="font-display text-xl text-ink">₹{p.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
