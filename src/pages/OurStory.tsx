import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Quote } from 'lucide-react';

const chefs = [
  {
    name: 'Chef Marcus Laurent',
    title: 'Executive Chef & Founder',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
    bio: 'With over 20 years of experience in Michelin-starred kitchens across Paris, Tokyo, and New York, Chef Marcus brings a unique fusion of French technique with global influences.',
    quote: 'Cooking is not just about feeding the body — it\'s about nourishing the soul.',
    specialties: ['French Cuisine', 'Fusion', 'Seasonal Tasting'],
  },
  {
    name: 'Chef Sofia Reyes',
    title: 'Pastry Chef',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=800&q=80',
    bio: 'A graduate of Le Cordon Bleu, Sofia\'s desserts are legendary. Her chocolate soufflé has been featured in Bon Appétit and Food & Wine.',
    quote: 'Every dessert should be a moment of pure joy.',
    specialties: ['French Pastry', 'Chocolate Artistry', 'Plated Desserts'],
  },
  {
    name: 'Chef Takeshi Yamamoto',
    title: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&q=80',
    bio: 'Trained in Tokyo for 15 years, Chef Takeshi brings the precision and philosophy of traditional Japanese cuisine to our omakase experience.',
    quote: 'Simplicity is the ultimate sophistication.',
    specialties: ['Omakase', 'Kaiseki', 'Fish Preparation'],
  },
];

const OurStory = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&q=80"
            alt="Kitchen"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span
            className="text-primary text-sm tracking-luxury uppercase mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Heart of LUXE BITE
          </motion.span>
          <motion.h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our <span className="text-gradient-gold">Story</span>
          </motion.h1>
          <motion.div
            className="divider-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <AnimatedSection>
            <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed mb-8">
              "At LUXE BITE, we believe that dining is an art form — a symphony of 
              <span className="text-primary"> flavors</span>, 
              <span className="text-primary"> textures</span>, and 
              <span className="text-primary"> emotions</span> that creates memories lasting a lifetime."
            </p>
            <div className="divider-gold mb-8" />
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2018, LUXE BITE was born from a simple vision: to create a space where 
              culinary excellence meets genuine hospitality. Every ingredient is sourced with intention, 
              every dish crafted with passion, and every guest treated like family.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Chefs */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm tracking-luxury uppercase mb-4 block">
              The Artists
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Meet Our Chefs
            </h2>
            <div className="divider-gold" />
          </AnimatedSection>

          <div className="space-y-24">
            {chefs.map((chef, index) => (
              <AnimatedSection key={chef.name} delay={index * 150}>
                <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <motion.div
                      className="relative overflow-hidden rounded-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        src={chef.image}
                        alt={chef.name}
                        className="w-full aspect-[4/5] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    </motion.div>
                    {/* Decorative Frame */}
                    <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/30 rounded-sm -z-10" />
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <span className="text-primary text-sm tracking-wide uppercase mb-2 block">
                      {chef.title}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                      {chef.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {chef.bio}
                    </p>

                    {/* Quote */}
                    <div className="flex items-start gap-4 mb-8 p-6 bg-card border border-border/50 rounded-sm">
                      <Quote size={24} className="text-primary/40 shrink-0" />
                      <p className="font-serif text-lg text-foreground italic">
                        "{chef.quote}"
                      </p>
                    </div>

                    {/* Specialties */}
                    <div>
                      <span className="text-sm text-foreground font-medium mb-3 block">
                        Specialties
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {chef.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="text-sm text-muted-foreground border border-border px-4 py-1.5 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm tracking-luxury uppercase mb-4 block">
              Our Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              What We Stand For
            </h2>
            <div className="divider-gold" />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Sustainability',
                desc: 'We partner with local farms and fisheries committed to sustainable practices. Every ingredient has a story.',
              },
              {
                title: 'Craftsmanship',
                desc: 'No shortcuts. No compromises. Every dish is crafted with the precision and care it deserves.',
              },
              {
                title: 'Hospitality',
                desc: 'You are not just a guest — you are family. We strive to make every visit feel like coming home.',
              },
            ].map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <div className="text-center p-8 bg-background border border-border/50 rounded-sm h-full">
                  <h3 className="font-serif text-2xl text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OurStory;
