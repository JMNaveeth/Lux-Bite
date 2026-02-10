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
        <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-background via-charcoal-light to-background">
          <div className="container mx-auto px-6">
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
      <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-background via-charcoal-light to-background">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl text-gradient-gold mb-2">
                  Shopping Cart
                </h1>
                <p className="text-muted-foreground">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              <Link 
                to="/menu" 
                className="btn-outline-gold flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Continue Shopping
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
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {/* Image */}
                      <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-serif text-xl text-foreground mb-1">
                                {item.name}
                              </h3>
                              <span className="text-xs text-primary uppercase tracking-wide">
                                {item.category.replace('-', ' ')}
                              </span>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {item.description}
                          </p>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-light border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-lg font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-light border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-serif text-gradient-gold">
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
                  className="bg-card border border-border/50 rounded-lg p-6 sticky top-32"
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
