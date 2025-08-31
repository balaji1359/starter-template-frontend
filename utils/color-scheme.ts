// Color scheme with explicit Tailwind classes to ensure they're included in the build
export const colorMap = {
  red: {
    bg: "from-red-500/20 to-red-600/20 dark:from-red-500/15 dark:to-red-600/15",
    icon: "text-red-700 dark:text-red-300",
    border: "border-red-500/50 dark:border-red-400/20 shadow-red-500/20 dark:shadow-red-400/20",
    hover: "hover:border-red-500/70 dark:hover:border-red-400/70",
    solid: "bg-red-500",
  },
  orange: {
    bg: "from-orange-500/20 to-orange-600/20 dark:from-orange-500/15 dark:to-orange-600/15",
    icon: "text-orange-700 dark:text-orange-300",
    border: "border-orange-500/50 dark:border-orange-400/20 shadow-orange-500/20 dark:shadow-orange-400/20",
    hover: "hover:border-orange-500/70 dark:hover:border-orange-400/70",
    solid: "bg-orange-500",
  },
  amber: {
    bg: "from-amber-500/20 to-amber-600/20 dark:from-amber-500/15 dark:to-amber-600/15",
    icon: "text-amber-700 dark:text-amber-300",
    border: "border-amber-500/50 dark:border-amber-400/20 shadow-amber-500/20 dark:shadow-amber-400/20",
    hover: "hover:border-amber-500/70 dark:hover:border-amber-400/70",
    solid: "bg-amber-500",
  },
  yellow: {
    bg: "from-yellow-500/20 to-yellow-600/20 dark:from-yellow-500/15 dark:to-yellow-600/15",
    icon: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-500/50 dark:border-yellow-400/20 shadow-yellow-500/20 dark:shadow-yellow-400/20",
    hover: "hover:border-yellow-500/70 dark:hover:border-yellow-400/70",
    solid: "bg-yellow-500",
  },
  green: {
    bg: "from-green-500/20 to-green-600/20 dark:from-green-500/15 dark:to-green-600/15",
    icon: "text-green-700 dark:text-green-300",
    border: "border-green-500/50 dark:border-green-400/20 shadow-green-500/20 dark:shadow-green-400/20",
    hover: "hover:border-green-500/70 dark:hover:border-green-400/70",
    solid: "bg-green-500",
  },
  teal: {
    bg: "from-teal-500/20 to-teal-600/20 dark:from-teal-500/15 dark:to-teal-600/15",
    icon: "text-teal-700 dark:text-teal-300",
    border: "border-teal-500/50 dark:border-teal-400/20 shadow-teal-500/20 dark:shadow-teal-400/20",
    hover: "hover:border-teal-500/70 dark:hover:border-teal-400/70",
    solid: "bg-teal-500",
  },
  cyan: {
    bg: "from-cyan-500/20 to-cyan-600/20 dark:from-cyan-500/15 dark:to-cyan-600/15",
    icon: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-500/50 dark:border-cyan-400/50 shadow-cyan-500/20 dark:shadow-cyan-400/20",
    hover: "hover:border-cyan-500/70 dark:hover:border-cyan-400/70",
    solid: "bg-cyan-500",
  },
  blue: {
    bg: "from-blue-500/20 to-blue-600/20 dark:from-blue-500/15 dark:to-blue-600/15",
    icon: "text-blue-700 dark:text-blue-300",
    border: "border-blue-500/50 dark:border-blue-400/50 shadow-blue-500/20 dark:shadow-blue-400/20",
    hover: "hover:border-blue-500/70 dark:hover:border-blue-400/70",
    solid: "bg-blue-500",
  },
  indigo: {
    bg: "from-indigo-500/20 to-indigo-600/20 dark:from-indigo-500/15 dark:to-indigo-600/15",
    icon: "text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-500/30 dark:border-indigo-400/30 shadow-indigo-500/20 dark:shadow-indigo-400/20",
    hover: "hover:border-indigo-500/70 dark:hover:border-indigo-400/70",
    solid: "bg-indigo-500",
  },
  purple: {
    bg: "from-purple-500/20 to-purple-600/20 dark:from-purple-500/15 dark:to-purple-600/15",
    icon: "text-purple-700 dark:text-purple-300",
    border: "border-purple-500/50 dark:border-purple-400/50 shadow-purple-500/20 dark:shadow-purple-400/20",
    hover: "hover:border-purple-500/70 dark:hover:border-purple-400/70",
    solid: "bg-purple-500",
  },
  pink: {
    bg: "from-pink-500/20 to-pink-600/20 dark:from-pink-500/15 dark:to-pink-600/15",
    icon: "text-pink-700 dark:text-pink-300",
    border: "border-pink-500/50 dark:border-pink-400/20 shadow-pink-500/20 dark:shadow-pink-400/20",
    hover: "hover:border-pink-500/70 dark:hover:border-pink-400/70",
    solid: "bg-pink-500",
  },
  gray: {
    bg: "from-gray-500/20 to-gray-600/20 dark:from-gray-500/15 dark:to-gray-600/15",
    icon: "text-gray-700 dark:text-gray-300",
    border: "border-gray-500/50 dark:border-gray-400/20 shadow-gray-500/20 dark:shadow-gray-400/20",
    hover: "hover:border-gray-500/70 dark:hover:border-gray-400/70",
    solid: "bg-gray-500",
  }
}

// Safelist classes - add this comment to help Tailwind detect these classes
/* 
TAILWIND SAFELIST - DO NOT REMOVE:
border-red-500/50 border-red-400/50 hover:border-red-500/70 hover:border-red-400/70 bg-red-500
border-orange-500/50 border-orange-400/50 hover:border-orange-500/70 hover:border-orange-400/70 bg-orange-500
border-amber-500/50 border-amber-400/50 hover:border-amber-500/70 hover:border-amber-400/70 bg-amber-500
border-yellow-500/50 border-yellow-400/50 hover:border-yellow-500/70 hover:border-yellow-400/70 bg-yellow-500
border-green-500/50 border-green-400/50 hover:border-green-500/70 hover:border-green-400/70 bg-green-500
border-teal-500/50 border-teal-400/50 hover:border-teal-500/70 hover:border-teal-400/70 bg-teal-500
border-cyan-500/50 border-cyan-400/50 hover:border-cyan-500/70 hover:border-cyan-400/70 bg-cyan-500
border-blue-500/50 border-blue-400/50 hover:border-blue-500/70 hover:border-blue-400/70 bg-blue-500
border-indigo-500/50 border-indigo-400/50 hover:border-indigo-500/70 hover:border-indigo-400/70 bg-indigo-500
border-purple-500/50 border-purple-400/50 hover:border-purple-500/70 hover:border-purple-400/70 bg-purple-500
border-pink-500/50 border-pink-400/50 hover:border-pink-500/70 hover:border-pink-400/70 bg-pink-500
border-gray-500/50 border-gray-400/50 hover:border-gray-500/70 hover:border-gray-400/70 bg-gray-500
*/
 
// Color options for UI selection - now with 12 reliable colors in a 6x2 grid
export const COLOR_OPTIONS = Object.keys(colorMap).map(color => ({
 value: color,
 class: `bg-${color}-300`
}))
 
export type ColorOption = keyof typeof colorMap
 
export const getColorScheme = (color: ColorOption | string) => {
 return colorMap[color as keyof typeof colorMap] || colorMap.blue // Always fallback to blue
}