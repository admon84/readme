import React from 'react';
import Layout from '@/components/common/Layout/Layout';
import Hero from '@/components/sections/Hero/Hero';
import Projects from '@/components/sections/Projects/Projects';
import About from '@/components/sections/About/About';

const HomePage: React.FC = () => {
  return (
    <Layout
      title="admon's readme"
      // description=''
      keywords={[
        'admon84',
        'developer',
        'typescript',
        'react',
        'nextjs',
        'projects',
        'github',
      ]}
    >
      <Hero />
      <About />
      <Projects />
    </Layout>
  );
};

export default HomePage;
