// tailwind.config.js

// Change `module.exports = {}` to `export default {}`
// Change `require('daisyui')` to `daisyui` after importing it
// Change `const daisyui = require('daisyui')` to `import daisyui from 'daisyui'`

import daisyui from 'daisyui'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        autumn: {
          primary: '#164ff9', // Orange
          secondary: '#22D3EE', // Cyan
          accent: '#A3E635', // Lime
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
        },
      },
      'light',
      'dark',
    ],
  },
  plugins: [daisyui],
};