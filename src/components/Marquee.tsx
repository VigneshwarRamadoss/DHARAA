export function Marquee() {
  const items = ["Handcrafted in Mumbai", "✦", "Anti-Tarnish Guaranteed", "✦", "Free Shipping Over ₹999", "✦", "Cash on Delivery", "✦", "30-Day Returns", "✦"];
  return (
    <div className="overflow-hidden border-y border-border bg-cream py-5">
      <div className="marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="mx-8 font-display text-2xl italic text-ink/80">{t}</span>
        ))}
      </div>
    </div>
  );
}
