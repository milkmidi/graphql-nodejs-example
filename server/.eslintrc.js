module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'flowtype',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'object-curly-newline': 0,
    'no-underscore-dangle': 0,
    'max-len': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'func-names': 0,
  },
};
