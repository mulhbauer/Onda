import type { Config } from 'tailwindcss';
export default {
  darkMode: ['class'], content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: { colors: {
    background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))',
    card: 'hsl(var(--card))', elevated: 'hsl(var(--elevated))', border: 'hsl(var(--border))',
    primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
    muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
    accent: 'hsl(var(--accent))', destructive: 'hsl(var(--destructive))',
    popover: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--foreground))' },
    secondary: { DEFAULT: 'hsl(var(--elevated))', foreground: 'hsl(var(--foreground))' },
    input: 'hsl(var(--border))', ring: 'hsl(var(--primary))',
  }, fontFamily: { sans: ['Manrope', 'sans-serif'] }, borderRadius: { lg: '12px', md: '8px', sm: '6px' } } },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
