import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin, Twitter, Youtube, MapPinned } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: `You'll receive 25% off on your first order.`,
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal border-t border-primary/20 relative overflow-hidden">
      {/* Decorative Art Deco Borders */}
      <div className="absolute left-0 top-0 bottom-0 w-24 hidden lg:block">
        <svg 
          viewBox="0 0 100 800" 
          className="w-full h-full text-primary/30" 
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="art-deco-left" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path 
                d="M 50 0 L 60 40 L 50 50 L 40 40 Z M 50 50 L 60 60 L 50 100 L 40 60 Z" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100" height="800" fill="url(#art-deco-left)" />
        </svg>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-24 hidden lg:block">
        <svg 
          viewBox="0 0 100 800" 
          className="w-full h-full text-primary/30" 
          preserveAspectRatio="none"
        >
          <rect width="100" height="800" fill="url(#art-deco-left)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <Link to="/" className="inline-block mb-8">
            <h2 className="font-serif text-3xl tracking-luxury text-gradient-gold mb-2">
              LUXE BITE
            </h2>
          </Link>

          {/* Contact Info */}
          <div className="space-y-3 mb-8">
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
              <MapPin size={16} className="text-primary" />
              123 Elegance Avenue, New York, NY 10001
            </p>
            <p className="text-muted-foreground text-sm">
              <a href="mailto:hello@luxebite.com" className="hover:text-primary transition-colors">
                hello@luxebite.com
              </a>
            </p>
            <p className="text-muted-foreground text-sm">
              Booking Request: 
              <a href="tel:+15551234567" className="hover:text-primary transition-colors ml-2">
                +1 (555) 123-4567
              </a>
            </p>
            <p className="text-primary/80 text-sm font-medium">
              Open: 5:00 PM - 11:00 PM
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-3 h-3 border border-primary/50 rotate-45" />
            <div className="w-3 h-3 border border-primary/50 rotate-45" />
            <div className="w-3 h-3 border border-primary/50 rotate-45" />
          </div>

          {/* Newsletter Section */}
          <div className="mb-8">
            <h3 className="font-serif text-2xl text-foreground mb-2">
              Get News & Offers
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Subscribe us & Get <span className="text-primary font-bold">25% Off</span>.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-background/50 border border-border rounded-lg pl-11 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-gold px-8 whitespace-nowrap"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider"
                aria-label="Facebook"
              >
                FACEBOOK
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider"
                aria-label="Instagram"
              >
                INSTAGRAM
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider"
                aria-label="Twitter"
              >
                TWITTER
              </a>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider"
                aria-label="YouTube"
              >
                YOUTUBE
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider"
                aria-label="Google Map"
              >
                GOOGLE MAP
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-primary/20">
            <p className="text-muted-foreground text-xs tracking-wide">
              © 2024 LUXE BITE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
