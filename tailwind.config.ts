import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        primary:"#B1F827",
        secondary:"#313338",
        primaryBg:"#16181C"
      },
      fontFamily:{
        montserrart:["Montserrat",'sans-serif'],
        karla:["Karla",'sans-serif']
      },
      flexBasic:{
        '60p':'60%',
        '20p':'20%',
      }
    },
  },
  plugins: [],
}
export default config
