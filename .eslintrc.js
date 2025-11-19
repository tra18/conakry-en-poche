module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Désactiver temporairement les règles problématiques
    'no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'warn'
  },
  // Désactiver ESLint pour éviter les problèmes de cache
  ignorePatterns: ['node_modules/**', 'build/**', 'public/**'],
  env: {
    browser: true,
    es2021: true,
    node: true
  }
};










