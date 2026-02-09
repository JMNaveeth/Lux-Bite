import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { FeaturedDishes } from '@/components/home/FeaturedDishes';
import { ConciergeTeaser } from '@/components/home/ConciergeTeaser';
import { Testimonials } from '@/components/home/Testimonials';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedDishes />
      <ConciergeTeaser />
      <Testimonials />
    </Layout>
  );
};

export default Home;
