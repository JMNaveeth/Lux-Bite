import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Salad, Armchair, ChefHat, PartyPopper } from 'lucide-react';

const strengths = [
  {
    icon: Salad,
    title: "Hygienic Food",
    description: "Lorem Ipsum is simply dummy printing and typesetting.",
  },
  {
    icon: Armchair,
    title: "Fresh Environment",
    description: "Lorem Ipsum is simply dummy printing and typesetting.",
  },
  {
    icon: ChefHat,
    title: "Skilled Chefs",
    description: "Lorem Ipsum is simply dummy printing and typesetting.",
  },
  {
    icon: PartyPopper,
    title: "Event & Party",
    description: "Lorem Ipsum is simply dummy printing and typesetting.",
  },
];

export const OurStrength = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm tracking-luxury uppercase mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Our Strength
          </h2>
          <div className="divider-gold" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="bg-card border border-border/50 rounded-sm p-8 text-center h-full flex flex-col items-center">
                  <div className="mb-6">
                    <Icon size={48} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-4">
                    {strength.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {strength.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};
