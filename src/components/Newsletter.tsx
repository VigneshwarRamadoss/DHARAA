export function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-beige py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="eyebrow mb-4">The Folio</p>
        <h3 className="font-display text-4xl leading-tight text-ink md:text-5xl">
          Letters from the <em className="italic text-gold">atelier.</em>
        </h3>
        <p className="mx-auto mt-5 max-w-md text-sm text-slate">
          New drops, behind-the-scenes notes, and 10% off your first piece. Promise: only when we have something worth saying.
        </p>
        <form className="mx-auto mt-10 flex max-w-md items-center border-b border-ink/30" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-transparent py-3 text-sm text-ink placeholder:text-warm focus:outline-none"
          />
          <button className="ml-4 text-xs uppercase tracking-[0.3em] text-ink transition hover:text-gold">
            Subscribe →
          </button>
        </form>
      </div>
    </section>
  );
}
