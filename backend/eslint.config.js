import js from '@eslint/js'
import globals from 'globals'

export default [
  // the standard rule set: real mistakes, no style opinions
  js.configs.recommended,
  {
    // TODO(you): which files should eslint check? Same idea as the "include" you
    // wrote in tsconfig.json, but for .js files instead of .ts.
    files: ["**/*.js"],

    languageOptions: {
      // TODO(you): which environment's free names exist here? globals.browser
      // would be window/document. This is a server.
      globals: globals.node,
    },
  },
]
