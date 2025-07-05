import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  const skillCategories = {
    languages: [
      { id: '1', name: 'TypeScript', level: 100 },
      { id: '2', name: 'JavaScript', level: 100 },
      { id: '3', name: 'Python', level: 100 },
      { id: '5', name: 'Rust', level: 80 },
      { id: '6', name: 'C#', level: 80 },
    ],
    frontend: [
      { id: '7', name: 'React', level: 100 },
      { id: '8', name: 'Next.js', level: 100 },
      { id: '12', name: 'HTML', level: 100 },
      { id: '19', name: 'Zustand', level: 100 },
      { id: '9', name: 'Astro', level: 100 },
    ],
    styling: [
      { id: '16', name: 'CSS Modules', level: 100 },
      { id: '17', name: 'Emotion', level: 100 },
      { id: '15', name: 'Styled Components', level: 100 },
      { id: '13', name: 'Tailwind', level: 100 },
      { id: '14', name: 'Sass/SCSS', level: 100 },
    ],
    backend: [
      { id: '25', name: 'Node.js', level: 100 },
      { id: '26', name: 'Express', level: 100 },
      { id: '28', name: 'Rest APIs', level: 100 },
      { id: '30', name: 'GraphQL', level: 100 },
    ],
    databases: [
      { id: '30', name: 'PostgreSQL', level: 100 },
      { id: '31', name: 'MongoDB', level: 100 },
      { id: '33', name: 'DynamoDB', level: 100 },
      { id: '32', name: 'Redis', level: 100 },
    ],
    other: [
      { id: '41', name: 'Automated Testing', level: 100 },
      { id: '41', name: 'AI Proficiency', level: 80 },
      { id: '40', name: 'DevOps & CI/CD', level: 60 },
      { id: '39', name: 'Cloud & Deployment', level: 60 },
    ],
  };

  const categoryLabels = {
    languages: 'Programming Languages',
    frontend: 'Frontend',
    styling: 'CSS & Styling',
    buildTools: 'Build Tools & Bundlers',
    testing: 'Testing & QA',
    backend: 'Backend & APIs',
    databases: 'Databases & Storage',
    other: 'Other Tools',
  };

  return (
    <section id='about' className={styles.about}>
      <div className={`${styles.aboutContent} container`}>
        <div className={styles.aboutHeader}>
          <h2 className={styles.aboutTitle}>About Me</h2>
          <p className={styles.aboutSubtitle}>
            Just a developer who enjoys coding and learning new things.
          </p>
        </div>

        <div className={styles.aboutIntro}>
          <div className={styles.statsSection}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Years of experience</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>20+</div>
              <div className={styles.statLabel}>Open-source projects</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>10k+</div>
              <div className={styles.statLabel}>Commits</div>
            </div>
          </div>
        </div>

        <div className={styles.skillsSection}>
          <h3 className={styles.skillsTitle}>What I'm good at</h3>
          <div className={styles.skillsContainer}>
            {Object.entries(skillCategories).map(([category, skills]) => {
              // Sort skills by level for ranking
              const sortedSkills = [...skills].sort(
                (a, b) => b.level - a.level
              );

              return (
                <div key={category} className={styles.skillCategory}>
                  <h4 className={styles.categoryTitle}>
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h4>
                  <div className={styles.skillCards}>
                    {sortedSkills.map(skill => (
                      <div className={styles.skillCard} key={skill.id}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <div className={styles.skillDots}>
                          {[1, 2, 3, 4, 5].map(dot => (
                            <div
                              className={`${styles.dot} ${dot <= skill.level / 20 ? styles.active : ''}`}
                              key={dot}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
