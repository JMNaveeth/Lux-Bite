import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-2xl tracking-luxury text-gradient-gold mb-4">
              LUXE BITE
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A fine-dining experience where every dish tells a story and every moment becomes a memory.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-lg text-foreground mb-6">Explore</h3>
            <ul className="space-y-3">
              {['Menu', 'Our Story', 'Reservations', 'Private Events'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg text-foreground mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="text-primary" />
                <span>123 Elegance Avenue, NYC</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone size={16} className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail size={16} className="text-primary" />
                <span>hello@luxebite.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-lg text-foreground mb-6">Hours</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex justify-between">
                <span>Mon - Thu</span>
                <span>5:30 PM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat</span>
                <span>5:00 PM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>5:00 PM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold my-12 w-full opacity-30" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-xs tracking-wide">
            © 2024 LUXE BITE. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="mailto:hello@luxebite.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
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
