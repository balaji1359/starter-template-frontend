"use client";

import { motion } from "framer-motion";

interface BeeLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

const BeeLogo = ({ size = "md", animated = true, className = "" }: BeeLogoProps) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const strokeWidth = size === "sm" ? 1.5 : size === "md" ? 2 : size === "lg" ? 2.5 : 3;

  return (
    <motion.div
      className={`${sizeMap[size]} ${className}`}
      whileHover={animated ? { scale: 1.1, rotate: 5 } : {}}
      whileTap={animated ? { scale: 0.95 } : {}}
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#beeGradient)"
          stroke="url(#borderGradient)"
          strokeWidth={strokeWidth}
          initial={animated ? { scale: 0, opacity: 0 } : {}}
          animate={animated ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        {/* Bee Body - Thorax */}
        <motion.ellipse
          cx="50"
          cy="50"
          rx="25"
          ry="30"
          fill="url(#thoraxGradient)"
          stroke="#8B4513"
          strokeWidth={strokeWidth * 0.8}
          initial={animated ? { scaleX: 0 } : {}}
          animate={animated ? { scaleX: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        />

        {/* Bee Body - Abdomen */}
        <motion.ellipse
          cx="50"
          cy="65"
          rx="20"
          ry="25"
          fill="url(#abdomenGradient)"
          stroke="#8B4513"
          strokeWidth={strokeWidth * 0.8}
          initial={animated ? { scaleX: 0 } : {}}
          animate={animated ? { scaleX: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        />

        {/* Abdomen Stripes */}
        <motion.rect
          x="30"
          y="55"
          width="40"
          height="8"
          fill="#FFD700"
          rx="4"
          initial={animated ? { scaleX: 0 } : {}}
          animate={animated ? { scaleX: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.4 }}
        />
        <motion.rect
          x="30"
          y="68"
          width="40"
          height="8"
          fill="#FFD700"
          rx="4"
          initial={animated ? { scaleX: 0 } : {}}
          animate={animated ? { scaleX: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.5 }}
        />

        {/* Head */}
        <motion.circle
          cx="50"
          cy="35"
          r="18"
          fill="url(#headGradient)"
          stroke="#8B4513"
          strokeWidth={strokeWidth * 0.8}
          initial={animated ? { scale: 0 } : {}}
          animate={animated ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        />

        {/* Eyes */}
        <motion.circle
          cx="44"
          cy="32"
          r="4"
          fill="#000000"
          initial={animated ? { scale: 0 } : {}}
          animate={animated ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
        <motion.circle
          cx="56"
          cy="32"
          r="4"
          fill="#000000"
          initial={animated ? { scale: 0 } : {}}
          animate={animated ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.7 }}
        />

        {/* Eye Highlights */}
        <motion.circle
          cx="42"
          cy="30"
          r="1.5"
          fill="#FFFFFF"
          initial={animated ? { scale: 0 } : {}}
          animate={animated ? { scale: 1 } : {}}
          transition={{ duration: 0.2, delay: 0.8 }}
        />
        <motion.circle
          cx="54"
          cy="30"
          r="1.5"
          fill="#FFFFFF"
          initial={animated ? { scale: 0 } : {}}
          animate={animated ? { scale: 1 } : {}}
          transition={{ duration: 0.2, delay: 0.9 }}
        />

        {/* Antennae */}
        <motion.path
          d="M 35 25 Q 30 20 28 18"
          stroke="#8B4513"
          strokeWidth={strokeWidth * 0.6}
          fill="none"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
        <motion.path
          d="M 65 25 Q 70 20 72 18"
          stroke="#8B4513"
          strokeWidth={strokeWidth * 0.6}
          fill="none"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
        />

        {/* Wings */}
        <motion.path
          d="M 25 40 Q 15 35 10 45 Q 15 55 25 50"
          fill="url(#wingGradient)"
          stroke="#8B4513"
          strokeWidth={strokeWidth * 0.5}
          initial={animated ? { scaleX: 0, opacity: 0 } : {}}
          animate={animated ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
        <motion.path
          d="M 75 40 Q 85 35 90 45 Q 85 55 75 50"
          fill="url(#wingGradient)"
          stroke="#8B4513"
          strokeWidth={strokeWidth * 0.5}
          initial={animated ? { scaleX: 0, opacity: 0 } : {}}
          animate={animated ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        />

        {/* Wing Details */}
        <motion.path
          d="M 25 40 Q 15 35 10 45 Q 15 55 25 50"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth * 0.3}
          opacity="0.6"
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        <motion.path
          d="M 75 40 Q 85 35 90 45 Q 85 55 75 50"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={strokeWidth * 0.3}
          opacity="0.6"
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        />

        {/* Legs */}
        <motion.path
          d="M 35 70 L 30 80"
          stroke="#8B4513"
          strokeWidth={strokeWidth * 0.5}
          strokeLinecap="round"
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.0 }}
        />
        <motion.path
          d="M 50 75 L 50 85"
          stroke="#8B4513"
          strokeWidth={strokeWidth * 0.5}
          strokeLinecap="round"
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.1 }}
        />
        <motion.path
          d="M 65 70 L 70 80"
          stroke="#8B4513"
          strokeWidth={strokeWidth * 0.5}
          strokeLinecap="round"
          initial={animated ? { pathLength: 0 } : {}}
          animate={animated ? { pathLength: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.2 }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="beeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
          
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="100%" stopColor="#654321" />
          </linearGradient>
          
          <linearGradient id="thoraxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4A460" />
            <stop offset="50%" stopColor="#DEB887" />
            <stop offset="100%" stopColor="#CD853F" />
          </linearGradient>
          
          <linearGradient id="abdomenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4A460" />
            <stop offset="50%" stopColor="#DEB887" />
            <stop offset="100%" stopColor="#CD853F" />
          </linearGradient>
          
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4A460" />
            <stop offset="50%" stopColor="#DEB887" />
            <stop offset="100%" stopColor="#CD853F" />
          </linearGradient>
          
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0F8FF" />
            <stop offset="50%" stopColor="#E6E6FA" />
            <stop offset="100%" stopColor="#DDA0DD" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default BeeLogo;
