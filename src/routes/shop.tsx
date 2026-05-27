import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { mockProducts } from '@/data/products';
import { useState, useMemo } from 'react';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';

// Define search params type
interface ShopSearch {
  category?: string;
}

export const Route = createFileRoute('/shop')({
  component: ShopPage,
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    return {
      category: typeof search.category === 'string' ? search.category : 'all',
    }
  }
});

const CATEGORIES = ["All", "Anti-Tarnish", "Oxidised", "Gift Combos", "Under ₹99"];

function ShopPage() {
  const { category = 'all' } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [activeTab, setActiveTab] = useState(category.toLowerCase());

  // Handle URL sync
  const handleCategoryChange = (cat: string) => {
    const slug = cat.toLowerCase();
    setActiveTab(slug);
    navigate({ search: { category: slug }, replace: true });
  };

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return mockProducts;
    return mockProducts.filter(p => p.category.toLowerCase() === activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <CartDrawer />
      <WishlistDrawer />
      
      <main className="pt-32 pb-20">
        <div className="section-container">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-ink mb-4">Our Collection</h1>
            <p className="font-sans text-slate max-w-lg">
              Explore our thoughtful range of everyday jewelry. Carefully crafted to 
              withstand the test of time and trends.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-10 border-b border-border pb-6">
            {CATEGORIES.map(cat => {
              const slug = cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`category-pill ${activeTab === slug ? 'category-pill-active' : ''}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
