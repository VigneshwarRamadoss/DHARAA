import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/data/products';
import { Link } from '@tanstack/react-router';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { OptimizedImage } from '@/components/OptimizedImage';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
  })
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      className="product-card group"
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      style={{ willChange: "transform" }}
    >
      {/* Image Area */}
      <Link to="/product/$id" params={{ id: product.id }} className="block relative overflow-hidden aspect-[4/5]">
        <OptimizedImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onHoverScale={1.04}
        />

        {/* Wishlist Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white border border-border opacity-0 group-hover:opacity-100 transition-opacity"
              whileTap={{ scale: 0.9 }}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <motion.div
                animate={wishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Heart
                  size={16}
                  className={wishlisted ? 'fill-[#DC5656] text-[#DC5656]' : 'text-ink'}
                />
              </motion.div>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent className="bg-ink text-background border border-border rounded-none text-[9px] tracking-widest uppercase py-1.5 px-2.5 shadow-md">
            {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </TooltipContent>
        </Tooltip>
      </Link>

      {/* Text Area */}
      <div className="p-4 flex flex-col items-start">
        <span className="badge-gold mb-2">{product.category}</span>
        <h3 className="font-sans text-sm text-ink mb-1 line-clamp-2">{product.name}</h3>
        <p className="font-sans text-[11px] text-slate mb-4">₹{product.price}</p>

        {/* Add to Cart — appears on hover */}
        <motion.button
          onClick={() => addToCart(product)}
          className="btn-secondary w-full flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-auto"
          whileTap={{ scale: 0.97 }}
        >
          <ShoppingBag size={14} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
