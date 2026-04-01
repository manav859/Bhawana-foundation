/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'accent-blue': 'var(--accent-blue)',
        'bg-light': 'var(--bg-light)',
        'border-light': 'var(--border-light)',
        'coral-red': 'var(--coral-red)',
        'light-blue': 'var(--light-blue)',
        'primary-blue': 'var(--primary-blue)',
        'success-green': 'var(--success-green)',
        'text-dark': 'var(--text-dark)',
        'text-muted': 'var(--text-muted)',
        'text-secondary': 'var(--text-secondary)',
        'warm-orange': 'var(--warm-orange)',
        'white': 'var(--white)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        shell: '0 18px 45px rgba(15, 23, 42, 0.08)',
        header: '0 10px 30px rgba(15, 23, 42, 0.06)',
      },
      backgroundImage: {
        'hero-fade': 'linear-gradient(135deg, rgba(11, 94, 215, 0.16), rgba(245, 158, 11, 0.16))',
      },
    },
  },
  plugins: [],
};