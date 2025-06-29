import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },        // Custom color palette
        alby: {
          orange: {
            DEFAULT: "#FF6B00",  // Main orange color
            light: "#FF8C42",   // Lighter shade for hover states
            dark: "#E65C00",    // Darker shade for active states
            muted: "#FFE0C2",   // Very light for backgrounds
          },          beige: {
            light: "#F7F3E9",   // Very light beige for main backgrounds
            DEFAULT: "#E8DCC6", // Medium beige for sections
            dark: "#D4C4A8",    // Darker beige for borders/dividers
            warm: "#F0E6D2",    // Warm beige for cards
            subtle: "#F5F1E8",  // Subtle beige for muted sections (between light and warm)
            soft: "#F2EDE4",    // Soft beige for better contrast sections
          },
          gray: {
            light: "#F5F5F5",   // Light gray for light mode backgrounds
            DEFAULT: "#9E9E9E",  // Medium gray for text/UI elements
            dark: "#424242",     // Dark gray for dark mode text
            darker: "#212121"    // Very dark for dark mode backgrounds
          },
          blue: "#1976D2",       // For links and interactive elements
          green: "#388E3C",      // For success states
          red: "#D32F2F",        // For errors and destructive actions
          yellow: "#FBC02D"      // For warnings
        },
        // Top-level keys for Tailwind utility compatibility
        'alby-orange': '#FF6B00',
        'alby-orange-light': '#FF8C42',
        'alby-orange-dark': '#E65C00',
        'alby-orange-muted': '#FFE0C2',        'alby-beige-light': '#F7F3E9',
        'alby-beige': '#E8DCC6',
        'alby-beige-dark': '#D4C4A8',
        'alby-beige-warm': '#E8D5B7',
        'alby-beige-subtle': '#F5F1E8',
        'alby-beige-soft': '#F2EDE4',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
