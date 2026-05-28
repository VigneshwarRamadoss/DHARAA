import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  onHoverScale?: number;
}

/**
 * OptimizedImage — A performant, premium image component with:
 * - Native lazy loading + decoding="async"
 * - IntersectionObserver-driven fade-in on scroll
 * - Elegant shimmer placeholder while loading
 * - Smooth scale-on-hover (optional)
 */
export function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  aspectRatio,
  onHoverScale,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${aspectRatio ? `aspect-[${aspectRatio}]` : ""}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-cream animate-pulse">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(171,140,82,0.06) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {inView && (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={onHoverScale ? { scale: onHoverScale } : undefined}
          className={`w-full h-full object-cover ${className}`}
        />
      )}
    </div>
  );
}
