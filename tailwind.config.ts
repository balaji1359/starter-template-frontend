import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  
  // Add safelist to ensure dynamic color classes are included
  safelist: [
    // Border colors with opacity for all color variants
    'border-red-500/50',
    'border-red-400/50',
    'border-orange-500/50',
    'border-orange-400/50',
    'border-amber-500/50',
    'border-amber-400/50',
    'border-yellow-500/50',
    'border-yellow-400/50',
    'border-green-500/50',
    'border-green-400/50',
    'border-teal-500/50',
    'border-teal-400/50',
    'border-cyan-500/50',
    'border-cyan-400/50',
    'border-blue-500/50',
    'border-blue-400/50',
    'border-indigo-500/50',
    'border-indigo-400/50',
    'border-purple-500/50',
    'border-purple-400/50',
    'border-pink-500/50',
    'border-pink-400/50',
    'border-gray-500/50',
    'border-gray-400/50',
    
    // Dark mode variants
    'dark:border-red-400/50',
    'dark:border-orange-400/50',
    'dark:border-amber-400/50',
    'dark:border-yellow-400/50',
    'dark:border-green-400/50',
    'dark:border-teal-400/50',
    'dark:border-cyan-400/50',
    'dark:border-blue-400/50',
    'dark:border-indigo-400/50',
    'dark:border-purple-400/50',
    'dark:border-pink-400/50',
    'dark:border-gray-400/50',
    
    // Hover states
    'hover:border-red-500/70',
    'hover:border-orange-500/70',
    'hover:border-amber-500/70',
    'hover:border-yellow-500/70',
    'hover:border-green-500/70',
    'hover:border-teal-500/70',
    'hover:border-cyan-500/70',
    'hover:border-blue-500/70',
    'hover:border-indigo-500/70',
    'hover:border-purple-500/70',
    'hover:border-pink-500/70',
    'hover:border-gray-500/70',
    
    // Dark mode hover states
    'dark:hover:border-red-400/70',
    'dark:hover:border-orange-400/70',
    'dark:hover:border-amber-400/70',
    'dark:hover:border-yellow-400/70',
    'dark:hover:border-green-400/70',
    'dark:hover:border-teal-400/70',
    'dark:hover:border-cyan-400/70',
    'dark:hover:border-blue-400/70',
    'dark:hover:border-indigo-400/70',
    'dark:hover:border-purple-400/70',
    'dark:hover:border-pink-400/70',
    'dark:hover:border-gray-400/70',
    
    // Background colors for icons
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-gray-500',
    
    // Gradient backgrounds (if you use them)
    'from-red-500/20',
    'to-red-600/20',
    'from-orange-500/20',
    'to-orange-600/20',
    'from-amber-500/20',
    'to-amber-600/20',
    'from-yellow-500/20',
    'to-yellow-600/20',
    'from-green-500/20',
    'to-green-600/20',
    'from-teal-500/20',
    'to-teal-600/20',
    'from-cyan-500/20',
    'to-cyan-600/20',
    'from-blue-500/20',
    'to-blue-600/20',
    'from-indigo-500/20',
    'to-indigo-600/20',
    'from-purple-500/20',
    'to-purple-600/20',
    'from-pink-500/20',
    'to-pink-600/20',
    'from-gray-500/20',
    'to-gray-600/20',
    
    // Dark mode gradients
    'dark:from-red-500/15',
    'dark:to-red-600/15',
    'dark:from-orange-500/15',
    'dark:to-orange-600/15',
    'dark:from-amber-500/15',
    'dark:to-amber-600/15',
    'dark:from-yellow-500/15',
    'dark:to-yellow-600/15',
    'dark:from-green-500/15',
    'dark:to-green-600/15',
    'dark:from-teal-500/15',
    'dark:to-teal-600/15',
    'dark:from-cyan-500/15',
    'dark:to-cyan-600/15',
    'dark:from-blue-500/15',
    'dark:to-blue-600/15',
    'dark:from-indigo-500/15',
    'dark:to-indigo-600/15',
    'dark:from-purple-500/15',
    'dark:to-purple-600/15',
    'dark:from-pink-500/15',
    'dark:to-pink-600/15',
    'dark:from-gray-500/15',
    'dark:to-gray-600/15',
  ],
  
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;