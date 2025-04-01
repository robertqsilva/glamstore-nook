
import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Categories } from '@/components/home/Categories';
import { AboutSection } from '@/components/home/AboutSection';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <AboutSection />
    </Layout>
  );
};

export default Home;
