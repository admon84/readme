// Animation Types
export interface Point {
  x: number;
  y: number;
}

export interface Vector2D extends Point {
  vx: number;
  vy: number;
}

export interface ParticleConfig {
  count: number;
  speed: number;
  trailLength: number;
  colors: string[];
  interactive: boolean;
  size: {
    min: number;
    max: number;
  };
  opacity: {
    min: number;
    max: number;
  };
  connectionDistance: number;
  mouseRadius: number;
}

export interface Particle extends Vector2D {
  id: string;
  trail: Point[];
  color: string;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export interface ParticleSystemState {
  particles: Particle[];
  mouse: Point;
  isMouseActive: boolean;
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  animationId: number | null;
  config: ParticleConfig;
}

export interface LoadingAnimationConfig {
  duration: number;
  easing: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  delay: number;
  repeat: boolean;
}

export interface ScrollAnimationConfig {
  threshold: number;
  rootMargin: string;
  triggerOnce: boolean;
  animationType: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
}

export interface AnimationTiming {
  duration: number;
  delay: number;
  easing: string;
}

export interface KeyframeAnimation {
  name: string;
  keyframes: Record<string, any>[];
  timing: AnimationTiming;
}

export interface AnimationState {
  isAnimating: boolean;
  progress: number;
  currentKeyframe: number;
  startTime: number;
  pausedTime: number;
}

export interface AnimationHook {
  start: () => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  state: AnimationState;
} 