export default [
  {
    ignores: [
      'node_modules/**',
      'lib/**',
      'icons/**',
      '.git/**',
      'dist/**',
      '*.webp'
    ]
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        Cache: 'readonly',
        ServiceWorkerContainer: 'readonly',
        self: 'readonly',
        importScripts: 'readonly',
        caches: 'readonly',
        addEventListener: 'readonly',
        removeEventListener: 'readonly',
        skipWaiting: 'readonly',
        clients: 'readonly',
        Notification: 'readonly',
        indexedDB: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-constant-condition': 'warn',
      'no-empty': 'off'
    }
  }
];
