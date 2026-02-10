import { motion, AnimatePresence } from 'framer-motion';
import { X, Wine, Leaf, Sparkles, Plus, Minus, ShoppingCart } from 'lucide-react';
import { MenuItem } from '@/lib/menuData';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface MenuModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const MenuModal = ({ item, onClose }: MenuModalProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  if (!item) return null;

  const handleAddToCart = () => {
    addToCart(item, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${item.name} added to your cart.`,
    });
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

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
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-5xl md:w-full max-h-[90vh] bg-card border border-border/50 rounded-lg overflow-hidden shadow-2xl z-50"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 bg-background/90 backdrop-blur-md rounded-full text-foreground/80 hover:text-primary hover:bg-background transition-all hover:scale-110 shadow-lg"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-[45%_55%] overflow-y-auto max-h-[90vh]">
              {/* Image */}
              <div className="relative h-64 md:h-auto md:min-h-[600px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80 md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent md:hidden" />
                
                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="flex items-center gap-2 text-xs tracking-widest uppercase text-primary bg-background/95 backdrop-blur-sm px-3 py-2 rounded-full border border-primary/40 shadow-lg">
                      <Sparkles size={14} />
                      Chef's Selection
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-10 bg-gradient-to-b from-card to-background/50">
                <div className="space-y-6">
                  {/* Category Badge */}
                  <span className="inline-block text-primary text-xs tracking-luxury uppercase px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    {item.category.replace('-', ' ')}
                  </span>

                  {/* Title & Price */}
                  <div className="space-y-3">
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                      {item.name}
                    </h2>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-serif text-gradient-gold">Rs {item.price}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {item.description}
                  </p>

                  {/* Pairing */}
                  {item.pairing && (
                    <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg border border-border/50 backdrop-blur-sm">
                      <Wine size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-sm text-foreground font-semibold block mb-1">
                          Perfect Pairing
                        </span>
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {item.pairing}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Dietary */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg border border-border/50 backdrop-blur-sm">
                      <Leaf size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-sm text-foreground font-semibold block mb-2">
                          Dietary Information
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {item.dietary.map((diet) => (
                            <span
                              key={diet}
                              className="text-xs text-accent border border-accent/30 px-3 py-1 rounded-full capitalize bg-accent/5"
                            >
                              {diet}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Moods */}
                  <div>
                    <span className="text-sm text-foreground font-semibold block mb-3">
                      Perfect For
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.moods.map((mood) => (
                        <span
                          key={mood}
                          className="text-sm text-foreground/90 bg-charcoal-light px-4 py-2 rounded-full capitalize border border-border/30 hover:border-primary/30 transition-colors"
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

                  {/* Add to Cart Section */}
                  <div className="space-y-4 mt-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between p-4 bg-background/80 rounded-lg border border-border/50">
                      <span className="text-sm font-semibold text-foreground">Quantity</span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={decrementQuantity}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-light border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} className="text-foreground" />
                        </button>
                        <span className="text-lg font-semibold text-foreground w-8 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={incrementQuantity}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-light border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} className="text-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="flex items-center justify-between px-4">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="text-2xl font-serif text-gradient-gold">
                        Rs {item.price * quantity}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={handleAddToCart}
                      className="w-full btn-gold flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
