import React, { useState, useEffect } from 'react';
import { Repository } from '@/types/github';
import { getRepositories } from '@/lib/github';
import styles from './Projects.module.css';

const searchTopics = ['screeps', 'typescript', 'react', 'ai'];

const topicLabels: Record<string, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  python: 'Python',
  csharp: 'C#',
  dotnet: '.NET',
  nodejs: 'Node.js',
  react: 'React',
  nextjs: 'Next.js',
  screeps: 'Screeps',
  ai: 'AI',
  mcp: 'MCP',
};

const Projects: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchRepositories = () => {
      try {
        const repos = getRepositories();
        setRepositories(repos);
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  const getTopicLabel = (topic: string): string => {
    return topicLabels[topic] || topic.charAt(0).toUpperCase() + topic.slice(1);
  };

  const categories = [
    { id: 'all', label: 'All Projects' },
    ...searchTopics.map(topic => ({
      id: topic,
      label: getTopicLabel(topic),
    })),
  ];

  const filteredRepositories =
    selectedCategory === 'all'
      ? repositories
      : repositories.filter(repo => repo.topics.includes(selectedCategory));

  const getLanguageColor = (language: string | null): string => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      React: '#61dafb',
      Python: '#3776ab',
      Java: '#f89820',
      'C++': '#f34b7d',
      Solidity: '#363636',
      Go: '#00add8',
      Rust: '#000000',
      Swift: '#fa7343',
      'Node.js': '#339933',
      Vue: '#4fc08d',
      HTML: '#e34c26',
      CSS: '#1572b6',
      'C#': '#239120',
    };
    return colors[language || ''] || '#6c757d';
  };

  return (
    <section id='projects' className={styles.projects}>
      <div className={`${styles.projectsContent} container`}>
        <div className={styles.projectsHeader}>
          <h2 className={styles.projectsTitle}>Featured Projects</h2>
          <p className={styles.projectsSubtitle}>
            A showcase of {repositories.length} projects I'm working on.
          </p>
        </div>

        <div className={styles.categoryFilters}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.loadingGrid}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`${styles.projectCard} ${styles.skeleton}`}
                >
                  <div className={styles.skeletonHeader}></div>
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {filteredRepositories.map(repo => (
              <div key={repo.id} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{repo.name}</h3>
                </div>

                <p className={styles.projectDescription}>
                  {repo.description || 'No description available'}
                </p>

                <div className={styles.projectMeta}>
                  <div className={styles.projectLanguage}>
                    <span
                      className={styles.languageDot}
                      style={{
                        backgroundColor: getLanguageColor(repo.language),
                      }}
                    ></span>
                    {repo.language || 'Unknown'}
                  </div>
                  <div className={styles.projectTopics}>
                    {repo.topics.slice(0, 4).map(topic => (
                      <span key={topic} className={styles.topic}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.projectActions}>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.projectLink}
                  >
                    View Code
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={styles.projectLink}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredRepositories.length === 0 && !loading && (
          <div className={styles.noResults}>
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
