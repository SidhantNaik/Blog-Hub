/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'btn': {
          'primary': '#0ea5e9',
          'primary-hover': '#0284c7',
          'secondary': '#6b7280',
          'secondary-hover': '#4b5563',
          'danger': '#ef4444',
          'danger-hover': '#dc2626',
          'success': '#22c55e',
          'success-hover': '#16a34a'
        },
        'theme': {
          'light': '#f3f4f6',
          'dark': '#1f2937',
          'toggle-light': '#fbbf24',
          'toggle-dark': '#312e81'
        }
      },
      borderRadius: {
        'btn': '0.375rem',
        'btn-lg': '0.5rem',
        'btn-full': '9999px'
      },
      boxShadow: {
        'btn': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'btn-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'btn-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'theme-toggle': '0 0 10px rgba(251, 191, 36, 0.3)',
        'theme-toggle-dark': '0 0 10px rgba(49, 46, 129, 0.3)'
      }
    }
  }
}
