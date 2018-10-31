module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix',
    ],
    'no-return-assign': ['error', 'except-parens'],
    'import/no-unresolved': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
      },
    ],
    'max-len': ['off'],
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for reduce accumulators
        ],
      },
    ],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
