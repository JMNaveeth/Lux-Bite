import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { FeaturedDishes } from '@/components/home/FeaturedDishes';
import { ConciergeTeaser } from '@/components/home/ConciergeTeaser';
import { OurStrength } from '@/components/home/OurStrength';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedDishes />
      <ConciergeTeaser />
      <OurStrength />
    </Layout>
  );
};

export default Home;
