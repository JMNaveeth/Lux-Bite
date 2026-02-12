import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { AnimatedSection } from '@/components/common/AnimatedSection';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemCount } = useCart();
  const total = getCartTotal();
  const itemCount = getCartItemCount();

  const deliveryFee = total > 0 ? 200 : 0;
  const grandTotal = total + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-background via-charcoal-light to-background">
          <div className="container mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center py-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="inline-block mb-6"
                >
                  <ShoppingBag size={80} className="text-muted-foreground/30" />
                </motion.div>
                <h1 className="font-serif text-4xl text-foreground mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">
                  Looks like you haven't added any delicious items yet.
                </p>
                <Link to="/menu" className="btn-gold inline-flex items-center gap-2">
                  <ArrowLeft size={20} />
                  Browse Menu
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-background via-charcoal-light to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gradient-gold mb-2">
                  Shopping Cart
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              <Link 
                to="/menu" 
                className="btn-outline-gold flex items-center gap-2 text-xs sm:text-sm px-4 sm:px-6"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Continue Shopping</span>
                <span className="sm:hidden">Menu</span>
              </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border/50 rounded-lg overflow-hidden hover:border-primary/30 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4">
                      {/* Image */}
                      <div className="relative w-full sm:w-24 md:w-32 h-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2">
                            <div className="flex-1">
                              <h3 className="font-serif text-lg sm:text-xl text-foreground mb-1">
                                {item.name}
                              </h3>
                              <span className="text-xs text-primary uppercase tracking-wide">
                                {item.category.replace('-', ' ')}
                              </span>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all flex-shrink-0"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">
                            {item.description}
                          </p>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-charcoal-light border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-base sm:text-lg font-semibold w-6 sm:w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-charcoal-light border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-base sm:text-lg font-serif text-gradient-gold">
                              Rs {item.price * item.quantity}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Rs {item.price} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 lg:sticky lg:top-32"
                >
                  <h2 className="font-serif text-2xl text-foreground mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-foreground/80">
                      <span>Subtotal</span>
                      <span>Rs {total}</span>
                    </div>
                    <div className="flex justify-between text-foreground/80">
                      <span>Delivery Fee</span>
                      <span>Rs {deliveryFee}</span>
                    </div>
                    <div className="border-t border-border/50 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-foreground">Total</span>
                        <span className="text-2xl font-serif text-gradient-gold">
                          Rs {grandTotal}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link to="/checkout" className="btn-gold w-full block text-center">
                    Proceed to Checkout
                  </Link>

                  <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                      🚚 Free delivery on orders above Rs 5000
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
