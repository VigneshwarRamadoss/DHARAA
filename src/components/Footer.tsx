

export function Footer() {
  return (
    <footer className="bg-ink text-background">
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-12">
        <div className="grid grid-cols-2 gap-12 border-b border-background/15 pb-16 md:grid-cols-5">
          <div className="col-span-2">
            <h4 className="font-display text-5xl tracking-[0.3em] md:text-6xl">DHARAA</h4>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/60">
              Everyday accessories, thoughtfully crafted in Mumbai. From ₹59.
            </p>
            <div className="mt-8 flex items-center gap-3 text-gold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold text-[10px]">IG</span>
              <span className="text-xs uppercase tracking-[0.25em]">@dharaa.in</span>
            </div>
          </div>
          {[
            { h: "Shop", l: ["Anti-Tarnish", "Oxidised", "Combos", "Under ₹99", "All Pieces"] },
            { h: "House", l: ["Our Story", "The Journal", "Atelier", "Press"] },
            { h: "Care", l: ["Contact", "Shipping", "Returns", "Jewellery care"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="eyebrow mb-5 text-gold">{col.h}</p>
              <ul className="space-y-3 text-sm text-background/70">
                {col.l.map((i) => (
                  <li key={i} className="cursor-pointer transition hover:text-background">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-10 text-xs uppercase tracking-[0.2em] text-background/40 md:flex-row md:items-center">
          <p>© MMXXVI Dharaa · All Rights Reserved to The Dot Company</p>
          <p>hello@dharaa.com · +91 98765 43210</p>
          <p className="text-gold">Made with ♡ in India</p>
        </div>
      </div>
    </footer>
  );
}
