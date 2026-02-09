import { motion, AnimatePresence } from 'framer-motion';
import { X, Wine, Leaf, Sparkles } from 'lucide-react';
import { MenuItem } from '@/lib/menuData';

interface MenuModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const MenuModal = ({ item, onClose }: MenuModalProps) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:w-full md:max-h-[90vh] bg-card border border-border rounded-sm overflow-hidden z-50"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2 h-full">
              {/* Image */}
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:hidden" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 overflow-y-auto">
                <span className="text-primary text-sm tracking-luxury uppercase mb-4 block">
                  {item.category.replace('-', ' ')}
                </span>

                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                  {item.name}
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {item.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-2xl font-serif text-gradient-gold">${item.price}</span>
                  {item.featured && (
                    <span className="flex items-center gap-1 text-sm text-primary">
                      <Sparkles size={14} />
                      Chef's Pick
                    </span>
                  )}
                </div>

                {/* Pairing */}
                {item.pairing && (
                  <div className="flex items-start gap-3 mb-6 p-4 bg-background/50 rounded-sm border border-border/50">
                    <Wine size={20} className="text-primary mt-0.5" />
                    <div>
                      <span className="text-sm text-foreground font-medium block mb-1">
                        Perfect Pairing
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.pairing}
                      </span>
                    </div>
                  </div>
                )}

                {/* Dietary */}
                {item.dietary && item.dietary.length > 0 && (
                  <div className="flex items-start gap-3 mb-8 p-4 bg-background/50 rounded-sm border border-border/50">
                    <Leaf size={20} className="text-accent mt-0.5" />
                    <div>
                      <span className="text-sm text-foreground font-medium block mb-1">
                        Dietary Information
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item.dietary.map((diet) => (
                          <span
                            key={diet}
                            className="text-xs text-accent border border-accent/30 px-2 py-1 rounded-sm capitalize"
                          >
                            {diet}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Moods */}
                <div className="mb-8">
                  <span className="text-sm text-foreground font-medium block mb-3">
                    Perfect For
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.moods.map((mood) => (
                      <span
                        key={mood}
                        className="text-sm text-muted-foreground bg-charcoal-light px-3 py-1.5 rounded-full capitalize"
                      >
                        {mood === 'romantic' && '💕 '}
                        {mood === 'indulgent' && '✨ '}
                        {mood === 'light' && '🌿 '}
                        {mood === 'adventurous' && '🔥 '}
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full btn-gold">
                  Add to Order
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
