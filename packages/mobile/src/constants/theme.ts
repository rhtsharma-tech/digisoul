export const COLORS = {
  gold: {
    50: "#FFF9E6",
    100: "#FFF0B3",
    200: "#FFE680",
    300: "#FFD94D",
    400: "#FFCC1A",
    500: "#C9A84C",
    600: "#A68A3E",
    700: "#836D31",
    800: "#604F23",
    900: "#3D3216",
  },
  navy: {
    50: "#E8E9ED",
    100: "#C5C7D3",
    200: "#9FA2B9",
    300: "#797D9F",
    400: "#535885",
    500: "#1A1B2E",
    600: "#151625",
    700: "#10111C",
    800: "#0B0C13",
    900: "#06070A",
  },
  violet: {
    500: "#6C63FF",
  },
  background: "#06070A",
  foreground: "#F8FAFC",
  muted: "#94A3B8",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
