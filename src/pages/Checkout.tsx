import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, MapPin, Phone, User, Mail } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { useToast } from '@/hooks/use-toast';
import { createOrder } from '@/lib/orderService';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const total = getCartTotal();
  const deliveryFee = total > 0 ? 200 : 0;
  const grandTotal = total + deliveryFee;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'cash',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal: total,
        deliveryFee: deliveryFee,
        total: grandTotal,
        paymentMethod: formData.paymentMethod as 'cash' | 'card',
        notes: formData.notes || undefined,
      };

      // Save order to Firebase
      const orderId = await createOrder(orderData);

      // Clear cart and show success message
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: `Your order #${orderId.slice(-6).toUpperCase()} will be delivered within 45-60 minutes.`,
      });

      // Redirect to home page
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: "Order failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-background via-charcoal-light to-background">
          <div className="container mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center py-12 sm:py-16 md:py-20">
                <h1 className="font-serif text-4xl text-foreground mb-4">No Items to Checkout</h1>
                <p className="text-muted-foreground mb-8">
                  Your cart is empty. Please add items before proceeding to checkout.
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
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <AnimatedSection>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gradient-gold">
                Checkout
              </h1>
              <Link 
                to="/cart" 
                className="btn-outline-gold flex items-center gap-2 text-xs sm:text-sm px-4 sm:px-6"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back to Cart</span>
                <span className="sm:hidden">Cart</span>
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  {/* Delivery Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border/50 rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Truck className="text-primary" size={18} />
                      </div>
                      <h2 className="font-serif text-xl sm:text-2xl text-foreground">Delivery Information</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                          <User size={14} className="inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border/50 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm sm:text-base text-foreground"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                          <Phone size={14} className="inline mr-2" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border/50 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm sm:text-base text-foreground"
                          placeholder="0771234567"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                          <Mail size={14} className="inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border/50 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm sm:text-base text-foreground"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                          <MapPin size={14} className="inline mr-2" />
                          Delivery Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border/50 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm sm:text-base text-foreground"
                          placeholder="Street address, apartment, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border/50 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm sm:text-base text-foreground"
                          placeholder="Colombo"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border/50 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm sm:text-base text-foreground"
                          placeholder="00100"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                          Special Instructions
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border/50 rounded-lg focus:border-primary focus:outline-none transition-colors text-sm sm:text-base text-foreground resize-none"
                          placeholder="Any special requests for your order?"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Payment Method */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border border-border/50 rounded-lg p-4 sm:p-6"
                  >
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="text-primary" size={18} />
                      </div>
                      <h2 className="font-serif text-xl sm:text-2xl text-foreground">Payment Method</h2>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-4 p-4 border border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-all">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={() => handlePaymentMethodChange('cash')}
                          className="w-4 h-4 text-primary"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-sm sm:text-base text-foreground">Cash on Delivery</span>
                          <p className="text-xs sm:text-sm text-muted-foreground">Pay when you receive your order</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-all">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={() => handlePaymentMethodChange('card')}
                          className="w-4 h-4 text-primary"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-sm sm:text-base text-foreground">Card Payment</span>
                          <p className="text-xs sm:text-sm text-muted-foreground">Pay securely with your credit/debit card</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-all">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank"
                          checked={formData.paymentMethod === 'bank'}
                          onChange={() => handlePaymentMethodChange('bank')}
                          className="w-4 h-4 text-primary"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-sm sm:text-base text-foreground">Bank Transfer</span>
                          <p className="text-xs sm:text-sm text-muted-foreground">Direct bank transfer</p>
                        </div>
                      </label>
                    </div>
                  </motion.div>
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

                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-foreground/80">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-foreground">Rs {item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 mb-6 pt-4 border-t border-border/50">
                      <div className="flex justify-between text-foreground/80">
                        <span>Subtotal</span>
                        <span>Rs {total}</span>
                      </div>
                      <div className="flex justify-between text-foreground/80">
                        <span>Delivery Fee</span>
                        <span>Rs {deliveryFee}</span>
                      </div>
                      <div className="border-t border-border/50 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-foreground">Total</span>
                          <span className="text-2xl font-serif text-gradient-gold">
                            Rs {grandTotal}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By placing your order, you agree to our terms and conditions
                    </p>
                  </motion.div>
                </div>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
