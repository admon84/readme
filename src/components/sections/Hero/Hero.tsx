import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section id='home' className={styles.hero}>
      <div className={`${styles.heroContent} container`}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            <span className={styles.greeting}>Hello, I'm</span>
            <span className={styles.name}>admon84</span>
          </h1>
          <p className={styles.heroSubtitle}>
            I build web applications from front to back. Always learning new
            technologies and finding better ways to solve problems.
          </p>
          <p className={styles.heroDescription}>
            When I'm not coding for work, I play Screeps (a programming game)
            and contribute to open-source projects.
          </p>
          <div className={styles.heroActions}>
            <button
              className='btn'
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View My Projects
            </button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeDot}></span>
              <span className={styles.codeDot}></span>
              <span className={styles.codeDot}></span>
            </div>
            <div className={styles.codeContent}>
              <div className={styles.codeLine}>
                <span className={styles.codeKeyword}>const</span>
                <span className={styles.codeVariable}> developer</span>
                <span className={styles.codeOperator}> = </span>
                <span className={styles.codeString}>{'{'}</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeProperty}>&nbsp;&nbsp;name</span>
                <span className={styles.codeOperator}>: </span>
                <span className={styles.codeString}>"admon84"</span>
                <span className={styles.codeOperator}>,</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeProperty}>&nbsp;&nbsp;passion</span>
                <span className={styles.codeOperator}>: </span>
                <span className={styles.codeString}>
                  "Creating Intuitive Solutions"
                </span>
                <span className={styles.codeOperator}>,</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeProperty}>&nbsp;&nbsp;skills</span>
                <span className={styles.codeOperator}>: </span>
                <span className={styles.codeString}>
                  ["TypeScript", "React", "Node.js"]
                </span>
                <span className={styles.codeOperator}>,</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeString}>{'}'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.scrollIndicator}
        onClick={() =>
          document
            .getElementById('about')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        role='button'
        tabIndex={0}
        aria-label='Scroll to about section'
      >
        <div className={styles.scrollChevron}></div>
      </div>
    </section>
  );
};

export default Hero;
