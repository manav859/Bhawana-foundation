/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0B5ED7',
          accent: '#3FA9F5',
          warm: '#F59E0B',
          success: '#10B981',
          dark: '#1E293B',
          secondary: '#64748B',
          muted: '#94A3B8',
          light: '#F8FAFC',
          border: '#E2E8F0',
        },
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