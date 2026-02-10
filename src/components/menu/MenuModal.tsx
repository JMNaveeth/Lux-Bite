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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[90vw] md:max-w-6xl max-h-[90vh] bg-card border-2 border-primary/30 rounded-xl overflow-hidden shadow-2xl z-50"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 p-3 bg-background backdrop-blur-md rounded-full text-foreground hover:text-primary hover:bg-primary/10 transition-all hover:scale-110 shadow-xl border-2 border-primary/40"
            >
              <X size={24} className="font-bold" />
            </button>

            <div className="grid md:grid-cols-[40%_60%] overflow-y-auto max-h-[90vh]">
              {/* Image */}
              <div className="relative h-72 md:h-auto md:min-h-[550px] overflow-hidden bg-charcoal-light">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Gradient Overlays - Less opacity for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/60 md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent md:hidden" />
                
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
              <div className="p-5 md:p-12 bg-gradient-to-b from-card to-background/30">
                <div className="space-y-6">
                  {/* Category Badge */}
                  <span className="inline-block text-primary text-sm font-semibold tracking-luxury uppercase px-4 py-2 bg-primary/20 rounded-full border-2 border-primary/40">
                    {item.category.replace('-', ' ')}
                  </span>

                  {/* Title & Price */}
                  <div className="space-y-4">
                    <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight font-bold">
                      {item.name}
                    </h2>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-4xl md:text-5xl font-serif text-gradient-gold font-bold">Rs {item.price}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/90 leading-relaxed text-base md:text-lg font-medium">
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
                  <div className="space-y-5 mt-8">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between p-5 bg-background/90 rounded-xl border-2 border-primary/30 shadow-lg">
                      <span className="text-base font-bold text-foreground">Quantity</span>
                      <div className="flex items-center gap-5">
                        <button
                          onClick={decrementQuantity}
                          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 border-2 border-primary/50 hover:border-primary hover:bg-primary/30 transition-all active:scale-95 shadow-md"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={20} className="text-foreground font-bold" />
                        </button>
                        <span className="text-2xl font-bold text-foreground w-12 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={incrementQuantity}
                          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 border-2 border-primary/50 hover:border-primary hover:bg-primary/30 transition-all active:scale-95 shadow-md"
                          aria-label="Increase quantity"
                        >
                          <Plus size={20} className="text-foreground font-bold" />
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="flex items-center justify-between px-5 py-3 bg-primary/10 rounded-xl">
                      <span className="text-base font-bold text-foreground">Total</span>
                      <span className="text-3xl md:text-4xl font-serif text-gradient-gold font-bold">
                        Rs {item.price * quantity}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={handleAddToCart}
                      className="w-full btn-gold flex items-center justify-center gap-3 text-lg py-4 font-bold shadow-xl hover:shadow-2xl active:scale-95"
                    >
                      <ShoppingCart size={24} />
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
