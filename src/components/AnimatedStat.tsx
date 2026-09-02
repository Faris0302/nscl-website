import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface AnimatedStatProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  label,
  className = '',
}) => {
  const { formattedValue, elementRef } = useCountUp({
    end: value,
    decimals,
    suffix,
    prefix,
  });

  return (
    <div ref={elementRef} className={`hero-stat-item ${className}`}>
      <div className="hero-stat-number">
        {formattedValue}
      </div>
      <div className="hero-stat-label">{label}</div>
    </div>
  );
};
