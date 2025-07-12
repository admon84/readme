import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from './ParticleBackground.module.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  opacity: number;
  animationName: string;
  animationDuration: string;
}

interface Connection {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  distance: number;
  particleId1: number;
  particleId2: number;
}

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const particleRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const stableConnections = useRef<Connection[]>([]);

  const establishStableConnections = useCallback((particleList: Particle[]) => {
    const newConnections: Connection[] = [];
    const maxDistance = 300;
    const maxConnectionsPerParticle = 3;
    const processedPairs = new Set<string>();

    // Use initial particle positions for stable connections
    const particlePositions: { [key: number]: { x: number; y: number } } = {};
    particleList.forEach(particle => {
      particlePositions[particle.id] = {
        x: particle.x,
        y: particle.y,
      };
    });

    // Create web-like connections by finding multiple nearest neighbors
    particleList.forEach(particle => {
      const pos1 = particlePositions[particle.id];
      if (!pos1) return;

      // Find all nearby particles and sort by distance
      const nearbyParticles: Array<{
        id: number;
        distance: number;
        angle: number;
      }> = [];

      particleList.forEach(otherParticle => {
        if (otherParticle.id === particle.id) return;

        const pos2 = particlePositions[otherParticle.id];
        if (!pos2) return;

        const dx = (pos1.x - pos2.x) * (window.innerWidth / 100);
        const dy = (pos1.y - pos2.y) * (window.innerHeight / 100);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= maxDistance) {
          // Calculate angle for better distribution
          const angle = Math.atan2(dy, dx);
          nearbyParticles.push({
            id: otherParticle.id,
            distance: distance,
            angle: angle,
          });
        }
      });

      // Sort by distance and select up to maxConnectionsPerParticle
      nearbyParticles.sort((a, b) => a.distance - b.distance);

      // Create connections with angular distribution for web-like structure
      const selectedParticles: Array<{
        id: number;
        distance: number;
        angle: number;
      }> = [];

      // Always connect to closest particle
      if (nearbyParticles.length > 0) {
        selectedParticles.push(nearbyParticles[0]);
      }

      // Add additional connections with angular separation for web formation
      for (
        let i = 1;
        i < nearbyParticles.length &&
        selectedParticles.length < maxConnectionsPerParticle;
        i++
      ) {
        const candidate = nearbyParticles[i];

        // Check if this particle creates good angular separation
        let goodSeparation = true;
        for (const selected of selectedParticles) {
          const angleDiff = Math.abs(candidate.angle - selected.angle);
          const normalizedDiff = Math.min(angleDiff, 2 * Math.PI - angleDiff);

          // Require at least 60 degrees separation for web structure
          if (normalizedDiff < Math.PI / 3) {
            goodSeparation = false;
            break;
          }
        }

        if (goodSeparation) {
          selectedParticles.push(candidate);
        }
      }

      // Create connections to selected particles
      selectedParticles.forEach(targetParticle => {
        const pairKey =
          particle.id < targetParticle.id
            ? `${particle.id}-${targetParticle.id}`
            : `${targetParticle.id}-${particle.id}`;

        // Only process each pair once to avoid duplicate lines
        if (!processedPairs.has(pairKey)) {
          processedPairs.add(pairKey);

          const pos2 = particlePositions[targetParticle.id];
          if (pos2) {
            newConnections.push({
              id: pairKey,
              x1: pos1.x,
              y1: pos1.y,
              x2: pos2.x,
              y2: pos2.y,
              opacity: 0.05,
              distance: targetParticle.distance,
              particleId1: particle.id,
              particleId2: targetParticle.id,
            });
          }
        }
      });
    });

    stableConnections.current = newConnections;
    console.log('Established stable connections:', newConnections.length);
  }, []);

  const updateConnectionPositions = useCallback(() => {
    if (stableConnections.current.length === 0) return;

    const particlePositions: { [key: number]: { x: number; y: number } } = {};

    // Get real-time positions of all particles
    particles.forEach(particle => {
      const element = particleRefs.current[particle.id];
      if (element) {
        const rect = element.getBoundingClientRect();
        const containerRect = element.parentElement?.getBoundingClientRect();

        if (containerRect) {
          const centerX = rect.left + rect.width / 2 - containerRect.left;
          const centerY = rect.top + rect.height / 2 - containerRect.top;

          particlePositions[particle.id] = {
            x: (centerX / containerRect.width) * 100,
            y: (centerY / containerRect.height) * 100,
          };
        }
      }
    });

    // Update connection positions while keeping the same connections
    const updatedConnections = stableConnections.current.map(connection => {
      const pos1 = particlePositions[connection.particleId1];
      const pos2 = particlePositions[connection.particleId2];

      if (pos1 && pos2) {
        return {
          ...connection,
          x1: pos1.x,
          y1: pos1.y,
          x2: pos2.x,
          y2: pos2.y,
        };
      }
      return connection;
    });

    setConnections(updatedConnections);
  }, [particles]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = 35; // Increased for more enterprise feel

      // Enterprise-style animations with varied timing
      const animations = [
        { name: 'float1', duration: '12s' }, // Slow diagonal drift
        { name: 'float2', duration: '15s' }, // Orbital motion
        { name: 'float3', duration: '8s' }, // Vertical drift
        { name: 'float4', duration: '18s' }, // Figure-8 pattern
        { name: 'float5', duration: '10s' }, // Pulsing drift
        { name: 'float6', duration: '25s' }, // Slow rise
        { name: 'float7', duration: '20s' }, // Horizontal sweep
        { name: 'float8', duration: '14s' }, // Gentle spiral
      ];

      for (let i = 0; i < particleCount; i++) {
        const randomAnimation =
          animations[Math.floor(Math.random() * animations.length)];

        // Create different particle types for variety
        const particleType = Math.random();
        let size, opacity;

        if (particleType < 0.3) {
          // Small ambient particles (30%)
          size = Math.random() * 1.5 + 1; // 1-2.5px
          opacity = Math.random() * 0.3 + 0.2; // 0.2-0.5
        } else if (particleType < 0.7) {
          // Medium floating particles (40%)
          size = Math.random() * 2 + 2; // 2-4px
          opacity = Math.random() * 0.4 + 0.3; // 0.3-0.7
        } else {
          // Larger focal particles (30%)
          size = Math.random() * 2.5 + 3; // 3-5.5px
          opacity = Math.random() * 0.3 + 0.4; // 0.4-0.7
        }

        newParticles.push({
          id: i,
          x: Math.random() * 100, // Percentage position
          y: Math.random() * 100, // Random position on screen
          size: size,
          delay: Math.random() * 2, // 0-2s staggered start for immediate animation
          opacity, // Dynamic opacity based on particle type
          animationName: randomAnimation.name,
          animationDuration: randomAnimation.duration,
        });
      }

      setParticles(newParticles);

      // Establish stable connections based on initial positions
      establishStableConnections(newParticles);

      console.log('Generated enterprise particles:', newParticles.length);
    };

    generateParticles();
  }, [establishStableConnections]);

  // Update connection positions as particles move (but keep same connections)
  useEffect(() => {
    if (particles.length === 0) return;

    // Initial position update
    updateConnectionPositions();

    // Use requestAnimationFrame for smooth updates that follow particle movement
    let animationId: number;
    let lastUpdate = 0;

    const animate = (timestamp: number) => {
      // Throttle updates to ~10fps (every 100ms) for performance
      if (timestamp - lastUpdate > 100) {
        updateConnectionPositions();
        lastUpdate = timestamp;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [particles, updateConnectionPositions]);

  return (
    <div className={styles.particleContainer}>
      {/* Connection lines */}
      <svg
        className={styles.connectionSvg}
        width='100%'
        height='100%'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {connections.map((connection, index) => {
          // Create varied line styles for web beauty
          const isMainConnection = connection.opacity > 0.4;
          const strokeWidth = isMainConnection ? '0.7' : '0.4';
          const pulseSpeed = isMainConnection
            ? 6 + (index % 3) * 2
            : 10 + (index % 4) * 3;

          return (
            <line
              key={connection.id}
              x1={`${connection.x1}%`}
              y1={`${connection.y1}%`}
              x2={`${connection.x2}%`}
              y2={`${connection.y2}%`}
              stroke='var(--color-primary)'
              strokeWidth={strokeWidth}
              strokeOpacity={connection.opacity}
              className={styles.connectionLine}
              style={{
                animation: `connectionPulse ${pulseSpeed}s infinite ease-in-out`,
                animationDelay: `${index * 0.15}s`,
              }}
            />
          );
        })}
      </svg>

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          ref={el => {
            particleRefs.current[particle.id] = el;
          }}
          className={styles.particle}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `${particle.animationName} ${particle.animationDuration} infinite ease-in-out`,
            animationDelay: `${particle.delay}s`,
            animationFillMode: 'both',
            zIndex: 2,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
