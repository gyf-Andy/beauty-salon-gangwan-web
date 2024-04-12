module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  globals: {
    Hi: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'comma-dangle': ['warn', 'never'],
    'arrow-parens': ['warn', 'as-needed'],
    'no-useless-escape': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'no-tabs': 'off',
    indent: 'off',
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [
      'warn',
      'never',
      {
        beforeStatementContinuationChars: 'never'
      }
    ],
    'no-delete-var': 'warn',
    // 'prefer-const': [
    //   'warn',
    //   {
    //     ignoreReadBeforeAssign: false
    //   }
    // ],
    'template-curly-spacing': 'off'
    // 'vue/no-multiple-template-root': 'off'
  }
}
