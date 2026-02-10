import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="font-serif text-xl sm:text-2xl tracking-luxury text-gradient-gold mb-3 sm:mb-4">
              LUXE BITE
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A fine-dining experience where every dish tells a story and every moment becomes a memory.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-base sm:text-lg text-foreground mb-4 sm:mb-6">Explore</h3>
            <ul className="space-y-2 sm:space-y-3">
              {['Menu', 'Our Story', 'Reservations', 'Private Events'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-base sm:text-lg text-foreground mb-4 sm:mb-6">Contact</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="break-words">123 Elegance Avenue, NYC</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-sm">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-muted-foreground text-sm">
                <Mail size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:hello@luxebite.com" className="hover:text-primary transition-colors break-all">hello@luxebite.com</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-base sm:text-lg text-foreground mb-4 sm:mb-6">Hours</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex justify-between gap-4">
                <span className="whitespace-nowrap">Mon - Thu</span>
                <span className="text-right whitespace-nowrap">5:30 PM - 10:00 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="whitespace-nowrap">Fri - Sat</span>
                <span className="text-right whitespace-nowrap">5:00 PM - 11:00 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="whitespace-nowrap">Sunday</span>
                <span className="text-right whitespace-nowrap">5:00 PM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold my-8 sm:my-12 w-full opacity-30" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <p className="text-muted-foreground text-xs tracking-wide text-center sm:text-left">
            © 2024 LUXE BITE. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-5 sm:gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 active:scale-90"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 active:scale-90"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="mailto:hello@luxebite.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 active:scale-90"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
