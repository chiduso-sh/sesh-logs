import js from '@eslint/js'
import globals from 'globals'

export default [
  // the standard rule set: real mistakes, no style opinions
  js.configs.recommended,
  {
    files: ['**/*.js'],

    languageOptions: {
      globals: globals.node,
    },
  },
]
