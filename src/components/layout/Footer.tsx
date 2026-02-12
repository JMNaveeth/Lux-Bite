import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, Phone, MapPin, Twitter, Youtube, MapPinned, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to Luxury!",
        description: `You'll receive 25% off on your first order. Check your email for exclusive VIP benefits.`,
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-charcoal via-charcoal to-background border-t border-primary/30 relative overflow-hidden">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(201, 169, 98, 0.05) 35px, rgba(201, 169, 98, 0.05) 70px)`
        }} />
      </div>

      {/* Premium Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      {/* Sophisticated Art Deco Borders */}
      <div className="absolute left-0 top-0 bottom-0 w-32 hidden xl:block">
        <svg 
          viewBox="0 0 120 1000" 
          className="w-full h-full text-primary/20" 
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="art-deco-left" x="0" y="0" width="60" height="80" patternUnits="userSpaceOnUse">
              <path 
                d="M 30 0 L 35 20 L 30 40 L 25 20 Z M 15 40 L 30 50 L 45 40 L 30 30 Z M 30 60 L 40 75 L 30 80 L 20 75 Z" 
                stroke="currentColor" 
                strokeWidth="0.8" 
                fill="none"
                opacity="0.6"
              />
              <circle cx="30" cy="10" r="2" fill="currentColor" opacity="0.4" />
              <circle cx="30" cy="70" r="2" fill="currentColor" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="120" height="1000" fill="url(#art-deco-left)" />
        </svg>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-32 hidden xl:block">
        <svg 
          viewBox="0 0 120 1000" 
          className="w-full h-full text-primary/20" 
          preserveAspectRatio="none"
        >
          <rect width="120" height="1000" fill="url(#art-deco-left)" />
        </svg>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary/20 rounded-full blur-sm animate-pulse" />
      <div className="absolute top-40 right-1/3 w-3 h-3 bg-primary/20 rounded-full blur-sm animate-pulse delay-1000" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-primary/20 rounded-full blur-sm animate-pulse delay-2000" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* VIP Crown Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/30 rounded-full bg-primary/5"
          >
            <Crown size={16} className="text-primary" />
            <span className="text-primary text-xs tracking-widest uppercase font-medium">
              Exclusive VIP Experience
            </span>
          </motion.div>

          {/* Premium Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to="/" className="inline-block group">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-luxury text-gradient-gold mb-3 group-hover:scale-105 transition-transform duration-300">
                LUXE BITE
              </h2>
              <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
            </Link>
          </motion.div>

          {/* Elegant Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground/80 text-sm italic mt-4 mb-10 font-serif"
          >
            Where Culinary Art Meets Timeless Elegance
          </motion.p>

          {/* Premium Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3 sm:space-y-4 mb-8 sm:mb-10"
          >
            <div className="flex items-center justify-center gap-2 text-foreground/90 group px-4">
              <MapPin size={18} className="text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
              <p className="text-xs sm:text-sm tracking-wide text-center">
                OLD BOC LANE, KINNIYA - 04, TRINCOMALEE
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm px-4">
              <a 
                href="mailto:naveethkinniya2001@gmail.com" 
                className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group"
              >
                <Mail size={16} className="text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all flex-shrink-0" />
                <span className="break-all">naveethkinniya2001@gmail.com</span>
              </a>
              <span className="hidden sm:inline text-primary/30">|</span>
              <a 
                href="tel:+94759560114" 
                className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group"
              >
                <Phone size={16} className="text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all flex-shrink-0" />
                +94 759560114
              </a>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full">
              <span className="text-primary text-xs font-medium">OPEN</span>
              <span className="text-muted-foreground text-xs">5:00 PM - 11:00 PM Daily</span>
            </div>
          </motion.div>

          {/* Luxury Divider with Ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary/40 rotate-45" />
              <div className="w-2 h-2 bg-primary/60 rotate-45" />
              <div className="w-1.5 h-1.5 bg-primary/40 rotate-45" />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </motion.div>

          {/* Premium Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10 sm:mb-12 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
          >
            <div className="mb-4 sm:mb-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2 sm:mb-3 tracking-wide">
                Exclusive VIP Benefits
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-md mx-auto px-2">
                Join our distinguished members & receive <span className="text-primary font-bold text-sm sm:text-base">25% OFF</span> your first reservation,
                <br className="hidden sm:block" />
                plus early access to special events & seasonal menus
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto px-2 sm:px-0">
              <div className="flex-1 relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-background/80 border border-border rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:bg-background transition-all duration-300 hover:border-primary/50"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="btn-gold px-8 py-3.5 whitespace-nowrap font-semibold tracking-wider"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SUBSCRIBE
              </motion.button>
            </form>

            <p className="text-xs text-muted-foreground/60 mt-4">
              By subscribing, you agree to receive exclusive offers and updates
            </p>
          </motion.div>

          {/* Premium Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            <p className="text-xs text-primary/70 uppercase tracking-widest font-medium">
              Connect With Us
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { label: 'Facebook', href: '#' },
                { label: 'Instagram', href: '#' },
                { label: 'Twitter', href: '#' },
                { label: 'YouTube', href: '#' },
                { label: 'Google Map', href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="relative text-muted-foreground hover:text-primary transition-all duration-300 text-sm uppercase tracking-wider font-medium group"
                  aria-label={social.label}
                >
                  {social.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Elegant Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="my-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          />

          {/* Premium Copyright & Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground/60">
              <Link to="/menu" className="hover:text-primary transition-colors duration-300">Menu</Link>
              <span>•</span>
              <Link to="/reservations" className="hover:text-primary transition-colors duration-300">Reservations</Link>
              <span>•</span>
              <Link to="/our-story" className="hover:text-primary transition-colors duration-300">Our Story</Link>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
            </div>
            
            <p className="text-muted-foreground/50 text-xs tracking-widest font-light">
              © 2024 LUXE BITE. All Rights Reserved.
            </p>
            
            <p className="text-primary/40 text-xs italic font-serif">
              Crafted with passion for the refined palate
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
