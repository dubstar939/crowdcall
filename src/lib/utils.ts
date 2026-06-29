import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Determines if a color is light or dark based on luminance.
 * Used for determining text color contrast on colored backgrounds.
 * 
 * @param hex - Hex color string (e.g., "#ffffff" or "fff")
 * @returns true if the color is light, false if dark
 */
export function isLightColor(hex: string): boolean {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, '');
  
  // Parse hex to RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  // Calculate luminance using WCAG formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5;
}
