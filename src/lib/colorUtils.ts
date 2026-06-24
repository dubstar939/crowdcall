// Color mapping utilities for template application
import { THEME_COLORS, ACCENT_COLORS } from '@/types';
import type { FlyerTemplate } from '@/types';

/**
 * Creates a lookup map for theme colors by hex value
 */
export const themeColorMap = new Map(
  THEME_COLORS.map(color => [color.hex.toLowerCase(), color.id])
);

/**
 * Creates a lookup map for accent colors by hex value
 */
export const accentColorMap = new Map(
  ACCENT_COLORS.map(color => [color.hex.toLowerCase(), color.id])
);

/**
 * Gets the theme color ID from a hex value, with fallback
 */
export function getThemeColorId(hex: string): string {
  return themeColorMap.get(hex.toLowerCase()) || 'black';
}

/**
 * Gets the accent color ID from a hex value, with fallback
 */
export function getAccentColorId(hex: string): string {
  return accentColorMap.get(hex.toLowerCase()) || 'yellow';
}

/**
 * Extracts color IDs from a template using lookup maps instead of fragile string comparisons
 */
export function extractColorIdsFromTemplate(template: FlyerTemplate): { themeColorId: string; accentColorId: string } {
  return {
    themeColorId: getThemeColorId(template.bgColor),
    accentColorId: getAccentColorId(template.accentColor),
  };
}
