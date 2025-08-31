"use client";
import React from "react";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  
  // Create deterministic particle positions to avoid hydration mismatch
  const particleCount = particleDensity || 50;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    // Use deterministic positioning based on index
    left: ((i * 7) % 100) + ((i * 13) % 20), // Pseudo-random but deterministic
    top: ((i * 11) % 100) + ((i * 17) % 15),  // Pseudo-random but deterministic
    size: (minSize || 1) + ((i * 3) % ((maxSize || 3) - (minSize || 1) + 1)),
    delay: (i * 0.2) % 5,
    duration: 3 + ((i * 5) % 4),
  }));

  return (
    <div className={`w-full h-full ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particleColor || '#ffcc00',
            opacity: 0.7,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
      
      {/* Additional floating elements with deterministic positions */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-amber-400 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-float" style={{ animationDelay: '3s' }} />
    </div>
  );
};
