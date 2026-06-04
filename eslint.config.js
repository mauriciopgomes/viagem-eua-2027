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
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_|^e$|^err$|^error$',
        varsIgnorePattern: '^_|^e$|^err$|^error$|^fs$|^result$|^modal$|^skipped$|^regionColors$|^locName$|^hotels$|^parks$'
      }],
      'no-console': 'off',
      'no-constant-condition': 'warn',
      'no-empty': 'warn'
    }
  }
];
