import React, { useMemo } from 'react';

interface ParticleData {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

export const EmberParticles: React.FC<{ count?: number }> = ({ count = 18 }) => {
  const particles: ParticleData[] = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.floor(Math.random() * 5) + 3, // 3px to 8px
      duration: Math.floor(Math.random() * 6) + 6, // 6s to 12s
      delay: Math.random() * 5,
      drift: Math.floor(Math.random() * 80) - 40, // -40px to +40px drift
    }));
  }, [count]);

  return (
    <div className="ember-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
};
