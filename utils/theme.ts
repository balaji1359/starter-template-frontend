import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and merges Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the CSS variable value for a theme color
 * @param variable The CSS variable name without the -- prefix
 */
export function getThemeColor(variable: string) {
  return `hsl(var(--${variable}))`
}

/**
 * Theme-aware class generator for components
 * @param classes Object containing classes for different themes
 */
export function themeClass(classes: {
  base?: string
  light?: string
  dark?: string
}) {
  return cn(
    classes.base,
    classes.light && "dark:!{classes.dark}",
    classes.dark && "dark:{classes.dark}"
  )
}

/**
 * Theme-aware hover class generator
 * @param classes Object containing hover classes for different themes
 */
export function themeHover(classes: {
  light?: string
  dark?: string
}) {
  return cn(
    classes.light && `hover:${classes.light}`,
    classes.dark && `dark:hover:${classes.dark}`
  )
}

/**
 * Theme-aware focus class generator
 * @param classes Object containing focus classes for different themes
 */
export function themeFocus(classes: {
  light?: string
  dark?: string
}) {
  return cn(
    classes.light && `focus:${classes.light}`,
    classes.dark && `dark:focus:${classes.dark}`
  )
}

/**
 * Theme-aware active class generator
 * @param classes Object containing active classes for different themes
 */
export function themeActive(classes: {
  light?: string
  dark?: string
}) {
  return cn(
    classes.light && `active:${classes.light}`,
    classes.dark && `dark:active:${classes.dark}`
  )
} 