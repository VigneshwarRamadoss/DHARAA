import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function PreLoader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              className="h-px w-40 origin-left bg-gold"
            />
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
                className="font-display text-5xl tracking-[0.4em] text-ink"
              >
                DHARAA
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="eyebrow"
            >
              Est. Mumbai · India
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
