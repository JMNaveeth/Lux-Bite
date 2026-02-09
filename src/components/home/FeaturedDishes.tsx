import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedItems } from '@/lib/menuData';
import { AnimatedSection } from '@/components/common/AnimatedSection';

export const FeaturedDishes = () => {
  const featuredItems = getFeaturedItems();

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm tracking-luxury uppercase mb-4 block">
            Culinary Excellence
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Signature Creations
          </h2>
          <div className="divider-gold" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 100}>
              <motion.div
                className="group relative card-3d"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-3d-inner bg-card rounded-sm overflow-hidden border border-border/50 hover:border-primary/30 transition-colors duration-500">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-xs tracking-widest uppercase text-primary bg-background/80 backdrop-blur-sm px-3 py-1 rounded-sm">
                        {item.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium">${item.price}</span>
                      <span className="text-xs text-muted-foreground tracking-wide">
                        {item.moods[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-16" delay={400}>
          <Link to="/menu" className="btn-outline-gold">
            View Full Menu
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};
