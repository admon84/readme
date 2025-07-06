import React from 'react';
import { SocialLink } from '@/types/common';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      platform: 'GitHub @admon84',
      url: 'https://github.com/admon84',
      label: 'GitHub Profile',
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContent} container`}>
        <div className={styles.socialLinks}>
          {socialLinks.map(link => (
            <a
              key={link.platform}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socialLink}
              aria-label={link.label}
            >
              {link.icon && (
                <span className={styles.socialIcon}>{link.icon}</span>
              )}
              <span className={styles.socialLabel}>{link.platform}</span>
            </a>
          ))}
        </div>

        <nav className={styles.footerNav}>
          <button
            onClick={() =>
              document
                .getElementById('home')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Home
          </button>
          <button
            onClick={() =>
              document
                .getElementById('about')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            About
          </button>
          <button
            onClick={() =>
              document
                .getElementById('projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Projects
          </button>
        </nav>
      </div>

      <div className={styles.footerBottom}>
        <div className={`${styles.footerBottomContent} container`}>
          <p className={styles.copyright}>
            &copy; {currentYear} admon's readme
          </p>
          <p className={styles.madeWith}>
            Built with Next.js |{' '}
            <a href='https://github.com/admon84/readme' target='_blank'>
              View Source
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
