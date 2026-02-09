import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles } from 'lucide-react';
import { AnimatedSection } from '@/components/common/AnimatedSection';

export const ConciergeTeaser = () => {
  return (
    <section className="py-24 md:py-32 bg-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-primary" />
              <span className="text-primary text-sm tracking-luxury uppercase">
                Your Personal Guide
              </span>
              <Sparkles size={16} className="text-primary" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
              Meet Your{' '}
              <span className="text-gradient-gold">Food Concierge</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              Like a personal sommelier at your fingertips, our AI concierge understands 
              your mood, preferences, and occasion to craft perfect dining recommendations.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            {/* Chat Preview */}
            <div className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-8 mb-12 max-w-lg mx-auto">
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-charcoal-light text-foreground px-4 py-3 rounded-lg rounded-br-sm max-w-xs text-sm">
                    I'm celebrating our anniversary tonight...
                  </div>
                </div>

                {/* Concierge Response */}
                <div className="flex justify-start">
                  <div className="bg-primary/10 border border-primary/20 text-foreground px-4 py-3 rounded-lg rounded-bl-sm max-w-xs text-sm">
                    <span className="text-primary font-medium">How wonderful!</span> For such a 
                    special evening, might I suggest our Butter-Poached Lobster paired with 
                    vintage Champagne? ✨
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <motion.button
              className="inline-flex items-center gap-3 btn-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={18} />
              Chat with Concierge
            </motion.button>
          </AnimatedSection>

          {/* Features */}
          <AnimatedSection delay={500}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { title: 'Mood-Based', desc: 'Tell us your vibe, we\'ll find your dish' },
                { title: 'Wine Pairings', desc: 'Expert sommelier suggestions' },
                { title: 'Dietary Aware', desc: 'Respects your preferences' },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <h4 className="font-serif text-lg text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
