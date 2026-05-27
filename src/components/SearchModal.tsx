import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { mockProducts } from '@/data/products';
import { Link } from '@tanstack/react-router';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockProducts.slice(0, 4));

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(mockProducts.slice(0, 4));
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = mockProducts.filter(
      p => p.name.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered.slice(0, 8)); // Max 8 results
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-white flex flex-col"
        >
          {/* Header Search Bar */}
          <div className="w-full border-b border-border bg-white px-6 py-4 flex items-center gap-4">
            <Search className="text-slate" size={24} />
            <input
              type="text"
              autoFocus
              placeholder="Search products, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-xl md:text-2xl font-display text-ink placeholder-slate/50 focus:outline-none focus:ring-0"
            />
            <button
              onClick={onClose}
              className="p-2 text-slate hover:text-ink transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto px-6 py-10">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-slate">
                  {query ? 'Search Results' : 'Popular Suggestions'}
                </h3>
                {query && (
                  <Link to={`/shop`} search={{ category: 'all' }} onClick={onClose} className="btn-ghost">
                    View all results
                  </Link>
                )}
              </div>

              {results.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-sans text-lg text-slate">No results found for "{query}"</p>
                  <p className="font-sans text-sm text-slate/70 mt-2">Try checking for typos or using more general terms.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to="/product/$id"
                      params={{ id: product.id }}
                      onClick={onClose}
                      className="group block"
                    >
                      <div className="aspect-square bg-cream overflow-hidden border border-border">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-4">
                        <p className="font-sans text-[11px] text-slate mb-1">{product.category}</p>
                        <h4 className="font-sans text-sm text-ink font-semibold group-hover:underline underline-offset-4 decoration-1 line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="font-sans text-[11px] text-ink mt-1">₹{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
