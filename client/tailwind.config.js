/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trade: {
          green: '#4caf50',
          red: '#f44336',
          dark: 'var(--trade-bg)',
          card: 'var(--trade-card)',
          border: 'var(--border-color)'
        },
        'primary-bg': 'var(--bg-primary)',
        'primary-card': 'var(--bg-secondary)',
        'primary-light': 'var(--bg-tertiary)',
        'primary-text': 'var(--text-primary)',
        'primary-textMuted': 'var(--text-muted)',
        'primary-border': 'var(--border-color)'
      }
    },
  },
  plugins: [],
}
