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
            className="fixed inset-0 bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-[8%] left-[18%] -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-4xl h-[70vh] bg-card rounded-2xl overflow-hidden shadow-2xl z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-[45%_55%] h-full">
              {/* Image */}
              <div className="relative h-80 md:h-full flex items-center justify-center bg-black">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="flex items-center gap-2 text-xs tracking-widest uppercase text-primary bg-black/70 backdrop-blur-sm px-3 py-2 rounded-full">
                      <Sparkles size={14} />
                      Chef's Selection
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-2 md:p-4 bg-card flex flex-col h-full">
                <div className="space-y-1.5 flex-1 overflow-hidden">
                  {/* Category Badge */}
                  <span className="inline-block text-primary text-[10px] font-semibold tracking-luxury uppercase px-2 py-0.5 bg-primary/20 rounded-full border border-primary/40">
                    {item.category.replace('-', ' ')}
                  </span>

                  {/* Title & Price */}
                  <div className="space-y-1">
                    <h2 className="font-serif text-xl md:text-2xl text-foreground leading-tight font-bold">
                      {item.name}
                    </h2>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xl md:text-2xl font-serif text-gradient-gold font-bold">Rs {item.price}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/90 leading-snug text-xs font-medium">
                    {item.description}
                  </p>

                  {/* Pairing */}
                  {item.pairing && (
                    <div className="flex items-start gap-1.5 p-2 bg-background/80 rounded-lg border border-border/50">
                      <Wine size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-[10px] text-foreground font-semibold block mb-0.5">
                          Perfect Pairing
                        </span>
                        <span className="text-[10px] text-muted-foreground leading-snug">
                          {item.pairing}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Dietary */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex items-start gap-1.5 p-2 bg-background/80 rounded-lg border border-border/50">
                      <Leaf size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-[10px] text-foreground font-semibold block mb-0.5">
                          Dietary Information
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.dietary.map((diet) => (
                            <span
                              key={diet}
                              className="text-[10px] text-accent border border-accent/30 px-1.5 py-0.5 rounded-full capitalize bg-accent/5"
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
                    <span className="text-[10px] text-foreground font-semibold block mb-1">
                      Perfect For
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.moods.map((mood) => (
                        <span
                          key={mood}
                          className="text-[10px] text-foreground/90 bg-charcoal-light px-2 py-0.5 rounded-full capitalize border border-border/30"
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
                  <div className="space-y-1.5 mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between p-2 bg-background/90 rounded-lg border border-primary/30">
                      <span className="text-xs font-bold text-foreground">Quantity</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={decrementQuantity}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/20 border border-primary/50 hover:border-primary hover:bg-primary/30 transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} className="text-foreground font-bold" />
                        </button>
                        <span className="text-sm font-bold text-foreground w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={incrementQuantity}
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/20 border border-primary/50 hover:border-primary hover:bg-primary/30 transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} className="text-foreground font-bold" />
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="flex items-center justify-between px-2 py-1.5 bg-primary/10 rounded-lg">
                      <span className="text-xs font-bold text-foreground">Total</span>
                      <span className="text-xl font-serif text-gradient-gold font-bold">
                        Rs {item.price * quantity}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={handleAddToCart}
                      className="w-full btn-gold flex items-center justify-center gap-1.5 text-sm py-2 font-bold"
                    >
                      <ShoppingCart size={16} />
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
