export const colorTokens = {
  background: "#ffffff",
  foreground: "#171717",
  card: "#ffffff",
  cardForeground: "#171717",
  popover: "#ffffff",
  popoverForeground: "#171717",
  primary: "#18181b",
  primaryForeground: "#fafafa",
  secondary: "#f4f4f5",
  secondaryForeground: "#18181b",
  accent: "#f4f4f5",
  accentForeground: "#18181b",
  muted: "#f4f4f5",
  mutedForeground: "#71717a",
  border: "#e4e4e7",
  input: "#d4d4d8",
  ring: "#18181b",
  destructive: "#dc2626",
  destructiveForeground: "#ffffff",
  success: "#16a34a",
  warning: "#d97706",
  info: "#2563eb",
} as const;

export const radiusTokens = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
} as const;

export const spacingTokens = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
} as const;

export const designTokens = {
  color: colorTokens,
  radius: radiusTokens,
  spacing: spacingTokens,
} as const;

export type DesignTokens = typeof designTokens;
