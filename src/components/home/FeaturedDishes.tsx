import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedItems } from '@/lib/menuData';
import { AnimatedSection } from '@/components/common/AnimatedSection';

const FeaturedCard = ({ item, index }: { item: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const rotateXSpring = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -15;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 15;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <AnimatedSection delay={index * 100}>
      <motion.div
        ref={cardRef}
        className="group relative h-full"
        style={{
          perspective: '1500px',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-500 shadow-lg hover:shadow-2xl h-full flex flex-col"
          style={{
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          animate={{
            y: isHovered ? -12 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Image */}
          <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
            <motion.img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              style={{
                transform: 'translateZ(20px)',
              }}
              animate={{
                scale: isHovered ? 1.15 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
              animate={{
                opacity: isHovered ? 0.7 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Category Badge */}
            <div 
              className="absolute top-3 left-3"
              style={{ transform: 'translateZ(40px)' }}
            >
              <span className="text-[10px] sm:text-xs tracking-widest uppercase text-primary bg-background/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-sm shadow-lg">
                {item.category.replace('-', ' ')}
              </span>
            </div>

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(201, 169, 98, 0.3) 50%, transparent 100%)',
                transform: 'translateZ(10px)',
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Content */}
          <div 
            className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between"
            style={{ transform: 'translateZ(50px)' }}
          >
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4">
                {item.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <motion.span 
                className="text-primary font-semibold text-base sm:text-lg"
                animate={{
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                ${item.price}
              </motion.span>
              <span className="text-[10px] sm:text-xs text-muted-foreground tracking-wide capitalize">
                {item.moods[0]}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
};

export const FeaturedDishes = () => {
  const featuredItems = getFeaturedItems();

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="text-primary text-xs sm:text-sm tracking-luxury uppercase mb-3 md:mb-4 block">
            Culinary Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 md:mb-6 px-4">
            Signature Creations
          </h2>
          <div className="divider-gold" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {featuredItems.map((item, index) => (
            <FeaturedCard key={item.id} item={item} index={index} />
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
