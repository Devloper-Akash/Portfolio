/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./assets/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#07090e",
          surface: "#0d1117",
          elevated: "#161b22",
          border: "rgba(255, 255, 255, 0.08)",
          emerald: "#10b981",
          cyan: "#06b6d4",
          blue: "#38bdf8",
          indigo: "#6366f1",
          violet: "#8b5cf6",
        },
        lightHover: "#f1f5f9",
        darkHover: "#161b22",
        darkTheme: "#07090e",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        Outfit: ["var(--font-space-grotesk)", "sans-serif"],
        Ovo: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "neon-emerald": "0 0 25px -5px rgba(16, 185, 129, 0.4)",
        "neon-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "neon-indigo": "0 0 25px -5px rgba(99, 102, 241, 0.4)",
        "cyber-card": "0 12px 35px -10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};
