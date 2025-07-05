import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NavigationItem } from '@/types/common';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={`${styles.nav} container`}>
        <div className={styles.logo}>
          <Link href='/' className={styles.logoLink}>
            <span className={styles.logoText}>admon's readme</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className={styles.navList}>
          {navigationItems.map(item => (
            <li key={item.id} className={styles.navItem}>
              <button
                onClick={() => handleSmoothScroll(item.href)}
                className={styles.navLink}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label='Toggle mobile menu'
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>

        {/* Mobile Navigation */}
        <div
          className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}
        >
          <ul className={styles.mobileNavList}>
            {navigationItems.map(item => (
              <li key={item.id} className={styles.mobileNavItem}>
                <button
                  onClick={() => handleSmoothScroll(item.href)}
                  className={styles.mobileNavLink}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
