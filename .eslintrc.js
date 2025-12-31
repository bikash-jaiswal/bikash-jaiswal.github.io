module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@next/next/no-html-link-for-pages': 'warn',
  },
  ignorePatterns: ['.next', 'node_modules', 'out', '*.d.ts'],
};
