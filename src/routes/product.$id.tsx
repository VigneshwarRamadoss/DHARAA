import { createFileRoute } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { mockProducts } from '@/data/products';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Heart, Minus, Plus, ShoppingBag, Truck, Shield } from 'lucide-react';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { OptimizedImage } from '@/components/OptimizedImage';

export const Route = createFileRoute('/product/$id')({
  component: ProductDetail,
  loader: ({ params }) => {
    const product = mockProducts.find(p => p.id === params.id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
});

function ProductDetail() {
  const product = Route.useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <CartDrawer />
      <WishlistDrawer />

      <main className="pt-24 pb-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="aspect-[4/5] w-full bg-cream relative overflow-hidden border border-border">
                <OptimizedImage 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnails (Simulated) */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <button key={i} className="aspect-square border border-border overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
                    <OptimizedImage src={product.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col pt-4 lg:pt-10">
              <div className="mb-2">
                <span className="badge-gold">{product.category}</span>
              </div>
              <h1 className="font-display text-4xl text-ink mb-4">{product.name}</h1>
              <p className="font-sans text-xl text-ink mb-6 font-medium">₹{product.price}</p>
              
              <div className="h-px w-full bg-border mb-6" />

              <p className="font-sans text-slate leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border h-12 bg-white w-32">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 h-full text-slate hover:text-ink hover:bg-cream transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="flex-1 text-center font-sans">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-4 h-full text-slate hover:text-ink hover:bg-cream transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="btn-primary flex-1 h-12 flex gap-2 items-center justify-center"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={() => toggleWishlist(product)}
                        className="h-12 w-12 flex items-center justify-center border border-border bg-white hover:bg-cream transition-colors shrink-0"
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart size={20} className={wishlisted ? 'fill-red text-red' : 'text-ink'} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-ink text-background border border-border rounded-none text-[10px] tracking-widest uppercase py-2 px-3 font-semibold shadow-md">
                      {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-10">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-sans text-slate">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Accordions (Simulated hardcoded for now) */}
              <div className="border-t border-border flex flex-col">
                <details className="group border-b border-border py-4 cursor-pointer">
                  <summary className="flex justify-between items-center font-sans text-sm font-semibold text-ink list-none">
                    <span className="flex items-center gap-2"><Truck size={18} /> Shipping & Returns</span>
                    <Plus size={16} className="text-slate group-open:hidden" />
                    <Minus size={16} className="text-slate hidden group-open:block" />
                  </summary>
                  <div className="pt-4 font-sans text-sm text-slate leading-relaxed">
                    Free shipping on orders over ₹999. Returns accepted within 7 days of delivery for unworn items in original packaging.
                  </div>
                </details>
                
                <details className="group border-b border-border py-4 cursor-pointer">
                  <summary className="flex justify-between items-center font-sans text-sm font-semibold text-ink list-none">
                    <span className="flex items-center gap-2"><Shield size={18} /> Care Instructions</span>
                    <Plus size={16} className="text-slate group-open:hidden" />
                    <Minus size={16} className="text-slate hidden group-open:block" />
                  </summary>
                  <div className="pt-4 font-sans text-sm text-slate leading-relaxed">
                    Store in the provided pouch or a dry box. Avoid direct contact with perfumes, lotions, and water to maintain the finish.
                  </div>
                </details>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
