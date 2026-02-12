import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Calendar, Clock, Users, MessageCircle, Check } from 'lucide-react';
import { createReservation } from '@/lib/reservationService';
import { useToast } from '@/hooks/use-toast';

const timeSlots = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', 
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
];

const occasions = [
  'Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 
  'Celebration', 'Just Dining', 'Other'
];

const Reservations = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Creating reservation...');
      
      // Create reservation with timeout
      const reservationPromise = createReservation({
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        occasion: formData.occasion || undefined,
        specialRequests: formData.notes || undefined,
      });

      // Set a timeout of 10 seconds
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 3000)
      );

      await Promise.race([reservationPromise, timeoutPromise]);

      console.log('Reservation created successfully');
      setIsSubmitted(true);
      toast({
        title: "Reservation confirmed!",
        description: "We'll send you a confirmation email shortly.",
      });
    } catch (error) {
      console.error('Reservation error:', error);
      const errorMessage = error instanceof Error && error.message === 'Request timeout'
        ? 'The request is taking too long. Please check your connection and try again.'
        : 'There was an error creating your reservation. Please try again.';
      
      toast({
        title: "Reservation failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center pt-20">
          <motion.div
            className="text-center max-w-lg mx-auto px-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Check size={40} className="text-primary" />
            </div>
            <h2 className="font-serif text-4xl text-foreground mb-4">
              Reservation Confirmed
            </h2>
            <p className="text-muted-foreground mb-8">
              Thank you, {formData.name}. We've reserved a table for {formData.guests} on{' '}
              {formData.date} at {formData.time}. A confirmation has been sent to {formData.email}.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-outline-gold"
            >
              Make Another Reservation
            </button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-8 sm:pt-32 sm:pb-12 md:pt-40 md:pb-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.span
            className="text-primary text-xs sm:text-sm tracking-luxury uppercase mb-3 sm:mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join Us
          </motion.span>
          <motion.h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4 sm:mb-6 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Reserve Your <span className="text-gradient-gold">Table</span>
          </motion.h1>
          <motion.div
            className="divider-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            {/* Info */}
            <AnimatedSection className="md:col-span-2">
              <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">
                An Evening Awaits
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                Whether it's an intimate dinner or a grand celebration, we're here to make 
                your experience unforgettable. Let our AI concierge know if you're planning 
                something special.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar size={20} className="text-primary mt-1" />
                  <div>
                    <span className="text-foreground font-medium block">Hours</span>
                    <span className="text-muted-foreground text-sm">
                      Mon-Thu 5:30-10PM<br />
                      Fri-Sat 5:00-11PM<br />
                      Sun 5:00-9PM
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle size={20} className="text-primary mt-1" />
                  <div>
                    <span className="text-foreground font-medium block">Need Assistance?</span>
                    <span className="text-muted-foreground text-sm">
                      Our concierge is here to help with special requests, 
                      dietary needs, or private events.
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection className="md:col-span-3" delay={100}>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="text-xs sm:text-sm text-foreground mb-2 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-sm text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-foreground mb-2 block">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-sm text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs sm:text-sm text-foreground mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-sm text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="text-xs sm:text-sm text-foreground mb-2 flex items-center gap-2">
                      <Calendar size={14} />
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-sm text-sm sm:text-base text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-foreground mb-2 flex items-center gap-2">
                      <Clock size={14} />
                      Time
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-sm text-sm sm:text-base text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="text-xs sm:text-sm text-foreground mb-2 flex items-center gap-2">
                    <Users size={14} />
                    Party Size
                  </label>
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-sm text-sm sm:text-base text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                    <option value="9+">9+ (Private Event)</option>
                  </select>
                </div>

                {/* Occasion */}
                <div>
                  <label className="text-xs sm:text-sm text-foreground mb-2 sm:mb-3 block">Occasion (Optional)</label>
                  <div className="flex flex-wrap gap-2">
                    {occasions.map((occasion) => (
                      <button
                        key={occasion}
                        type="button"
                        onClick={() => setFormData({ ...formData, occasion })}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-300 rounded-sm ${
                          formData.occasion === occasion
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background border border-border text-muted-foreground hover:border-primary'
                        }`}
                      >
                        {occasion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="text-xs sm:text-sm text-foreground mb-2 block">
                    Special Requests or Dietary Needs
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-sm text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Any allergies, accessibility needs, or special arrangements..."
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gold py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
                </motion.button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reservations;
