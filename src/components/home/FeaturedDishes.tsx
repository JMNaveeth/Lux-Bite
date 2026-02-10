import { useState, useRef, MouseEvent, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedItems } from '@/lib/menuData';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { ChefHat, Sparkles } from 'lucide-react';

const AIChefAnimation = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;
  
  return (
    <motion.div
      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
      initial={{ opacity: 0, y: -50, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [-50, -100, -100, -150],
        scale: [0, 1.2, 1, 0.8],
        rotate: [0, -10, 10, 0],
      }}
      transition={{
        duration: 3,
        times: [0, 0.3, 0.7, 1],
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Chef Icon with Cooking Animation */}
      <div className="relative">
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl border-4 border-background"
          animate={visible ? {
            boxShadow: [
              '0 10px 40px rgba(201, 169, 98, 0.3)',
              '0 20px 60px rgba(201, 169, 98, 0.6)',
              '0 10px 40px rgba(201, 169, 98, 0.3)',
            ],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChefHat size={40} className="text-background" strokeWidth={2.5} />
        </motion.div>

        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={visible ? {
              x: [0, Math.cos((i * Math.PI) / 3) * 50],
              y: [0, Math.sin((i * Math.PI) / 3) * 50],
              opacity: [1, 0],
              scale: [0, 1, 0],
            } : {}}
            transition={{
              duration: 1.5,
              delay: 0.3 + i * 0.1,
              ease: 'easeOut',
            }}
          >
            <Sparkles size={16} className="text-primary" fill="currentColor" />
          </motion.div>
        ))}

        {/* Cooking steam effect */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`steam-${i}`}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-primary/40 to-transparent rounded-full blur-sm"
            style={{
              bottom: '100%',
            }}
            animate={visible ? {
              y: [-20, -60],
              opacity: [0.8, 0],
              scaleX: [1, 1.5],
            } : {}}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.div
        className="mt-4 text-center"
        animate={visible ? {
          opacity: [0, 1, 1, 0],
        } : {}}
        transition={{
          duration: 3,
          times: [0, 0.3, 0.7, 1],
        }}
      >
        <p className="text-primary font-serif text-xl whitespace-nowrap font-bold bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 shadow-lg">
          AI Chef Preparing...
        </p>
      </motion.div>
    </motion.div>
  );
};

const FeaturedCard = ({ item, index }: { item: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showChef, setShowChef] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(mouseX, { stiffness: 200, damping: 25 });

  // Trigger chef animation when card comes into view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowChef(true);
        setTimeout(() => setShowChef(false), 3000);
      }, index * 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, index]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    mouseX.set(xPct * 20);
    mouseY.set(yPct * -20);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <AnimatedSection delay={index * 100}>
      <motion.div
        ref={cardRef}
        className="group relative h-full"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* AI Chef Animation */}
        <AIChefAnimation visible={showChef} />

        {/* Dish appears with animation */}
        <motion.div
          className="bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/40 shadow-lg hover:shadow-2xl h-full flex flex-col relative"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={isInView ? {
            opacity: 1,
            scale: 1,
            y: 0,
          } : {}}
          transition={{
            duration: 0.8,
            delay: index * 0.4 + 1.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            y: -12,
            scale: 1.02,
          }}
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
