import React from 'react';
import Head from 'next/head';
import { LayoutProps } from '@/types/common';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ParticleBackground from '../ParticleBackground/ParticleBackground';
import styles from './Layout.module.css';

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "admon's readme",
  description = 'Modern website showcasing innovative projects and technical expertise',
  keywords = ['developer', 'projects', 'github', 'typescript', 'nextjs'],
  ogImage = '/og-image.jpg',
  noIndex = false,
  className = '',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords.join(', ')} />

        {/* Open Graph */}
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={ogImage} />
        <meta property='og:type' content='website' />

        {/* Twitter */}
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={ogImage} />

        {/* SEO */}
        {noIndex && <meta name='robots' content='noindex, nofollow' />}
      </Head>

      <div className={`${styles.layout} ${className}`}>
        <ParticleBackground />
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
