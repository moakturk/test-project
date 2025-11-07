import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#007bff", // Logo rengi
          50: "#e6f2ff",
          100: "#b3d9ff",
          200: "#80c0ff",
          300: "#4da7ff",
          400: "#1a8eff",
          500: "#007bff", // Ana renk
          600: "#0062cc",
          700: "#004999",
          800: "#003166",
          900: "#001833",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#7B2FFF", // Mor - AI/İnovasyon
          50: "#f3e8ff",
          100: "#e0c4ff",
          200: "#cda0ff",
          300: "#ba7cff",
          400: "#a758ff",
          500: "#7B2FFF",
          600: "#6226cc",
          700: "#491c99",
          800: "#311366",
          900: "#180933",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#00D9A3", // Yeşil - Başarı
          50: "#e6fff9",
          100: "#b3ffec",
          200: "#80ffe0",
          300: "#4dffd3",
          400: "#1affc6",
          500: "#00D9A3",
          600: "#00ad82",
          700: "#008262",
          800: "#005641",
          900: "#002b21",
          foreground: "hsl(var(--accent-foreground))",
        },
        orange: {
          DEFAULT: "#FF6B35", // Turuncu - CTA
          50: "#fff3ed",
          100: "#ffd9cc",
          200: "#ffbfaa",
          300: "#ffa588",
          400: "#ff8b66",
          500: "#FF6B35",
          600: "#cc562a",
          700: "#99401f",
          800: "#662b15",
          900: "#33150a",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
