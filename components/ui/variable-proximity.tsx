"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface VariableProximityProps {
  label: string;
  className?: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: React.RefObject<HTMLElement>;
  radius?: number;
  falloff?: 'linear' | 'easeInOut' | 'easeIn' | 'easeOut' | 'circIn' | 'circOut' | 'circInOut';
}

const VariableProximity = ({
  label,
  className = '',
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 100,
  falloff = 'linear'
}: VariableProximityProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const distance = useMotionValue(0);
  
  // Parse font variation settings
  const parseFontVariation = (settings: string) => {
    const result: Record<string, number> = {};
    const pairs = settings.split(',').map(s => s.trim());
    
    pairs.forEach(pair => {
      const [key, value] = pair.split(' ').map(s => s.replace(/'/g, ''));
      if (key && value) {
        result[key] = parseFloat(value);
      }
    });
    
    return result;
  };

  const fromSettings = parseFontVariation(fromFontVariationSettings);
  const toSettings = parseFontVariation(toFontVariationSettings);
  
  // Create transforms for each font variation setting
  const transforms: Record<string, any> = {};
  
  Object.keys(fromSettings).forEach(key => {
    if (toSettings[key] !== undefined) {
      transforms[key] = useTransform(
        distance,
        [0, radius],
        [toSettings[key], fromSettings[key]],
        { ease: falloff }
      );
    }
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const currentDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      mouseX.set(deltaX);
      mouseY.set(deltaY);
      distance.set(Math.max(0, Math.min(radius, currentDistance)));
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      distance.set(radius);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef, mouseX, mouseY, distance, radius]);

  // Build the font variation settings string
  const getCurrentFontVariationSettings = () => {
    const settings: string[] = [];
    
    Object.keys(transforms).forEach(key => {
      const value = transforms[key].get();
      settings.push(`'${key}' ${value}`);
    });
    
    return settings.join(', ');
  };

  return (
    <motion.div
      className={`variable-proximity ${className}`}
      style={{
        fontVariationSettings: getCurrentFontVariationSettings(),
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'font-variation-settings 0.1s ease-out'
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.div>
  );
};

export default VariableProximity;
