import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "An unforgettable evening. The tasting menu was a journey through flavors I never knew existed.",
    author: "Alexandra M.",
    title: "Food Critic, NY Times",
  },
  {
    text: "LUXE BITE redefined my understanding of fine dining. Every detail, from ambiance to the last bite, was perfection.",
    author: "Marcus J.",
    title: "Michelin Guide",
  },
  {
    text: "The AI concierge recommended dishes that perfectly matched our anniversary mood. Magical experience.",
    author: "Sarah & David",
    title: "Celebrating 10 Years",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm tracking-luxury uppercase mb-4 block">
            What They Say
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Memorable Moments
          </h2>
          <div className="divider-gold" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <div className="bg-card border border-border/50 rounded-sm p-8 h-full flex flex-col">
                <Quote size={24} className="text-primary/40 mb-6" />
                <p className="text-foreground leading-relaxed mb-8 flex-1 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-serif text-lg text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
