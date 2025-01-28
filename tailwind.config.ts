import { nextui } from '@nextui-org/theme';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'main': '#9a4b2c',
      },
      backgroundImage: {
        'logo': "url('/Assets/Images/logo.png')",
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#9a4b2c',
            },
            // Tambahkan warna kustom lainnya di sini
          },
        },
        // Anda juga bisa menambahkan tema dark jika diperlukan
      },
    }),
  ],
};
