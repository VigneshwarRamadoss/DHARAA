import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/about')({
  component: AboutPage
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-32 pb-20">
        
        {/* Hero Section */}
        <section className="section-container text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-4xl md:text-6xl text-ink mb-6">The DHARAA Story</h1>
            <p className="font-sans text-lg text-slate max-w-2xl mx-auto leading-relaxed">
              We believe that everyday luxury should be accessible, enduring, and effortlessly elegant. 
              DHARAA was born from a simple desire: to create jewelry that lives with you, not just for special occasions.
            </p>
          </motion.div>
        </section>

        {/* Feature Image */}
        <section className="w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 mb-24">
          <div className="aspect-[21/9] bg-cream relative overflow-hidden border border-border">
            {/* Using hero image as placeholder */}
            <div className="absolute inset-0 bg-ink/10" />
            <img src="/src/assets/hero.jpg" alt="DHARAA Jewelry" className="w-full h-full object-cover object-center" />
          </div>
        </section>

        {/* Values Grid */}
        <section className="section-container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-ink">Our Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-cream border border-border flex items-center justify-center mb-6">
                <span className="font-display text-2xl text-gold">I</span>
              </div>
              <h3 className="font-sans text-lg font-semibold text-ink mb-3">Anti-Tarnish Promise</h3>
              <p className="font-sans text-sm text-slate leading-relaxed">
                Our pieces are crafted using advanced plating techniques that resist tarnishing, 
                ensuring your jewelry remains radiant through daily wear.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-cream border border-border flex items-center justify-center mb-6">
                <span className="font-display text-2xl text-gold">II</span>
              </div>
              <h3 className="font-sans text-lg font-semibold text-ink mb-3">Accessible Luxury</h3>
              <p className="font-sans text-sm text-slate leading-relaxed">
                By cutting out the traditional retail markups, we bring you premium quality materials 
                and craftsmanship at honest prices.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-cream border border-border flex items-center justify-center mb-6">
                <span className="font-display text-2xl text-gold">III</span>
              </div>
              <h3 className="font-sans text-lg font-semibold text-ink mb-3">Mindful Design</h3>
              <p className="font-sans text-sm text-slate leading-relaxed">
                Every piece is designed with versatility in mind—effortlessly transitioning from 
                morning coffee to evening celebrations.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
