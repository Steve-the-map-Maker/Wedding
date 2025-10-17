module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'prettier'
  ],
  rules: {
  'react/prop-types': 'off',
  // Allow keeping a top-level React import for classic JSX runtime without triggering unused-var
  'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }]
  }
};
