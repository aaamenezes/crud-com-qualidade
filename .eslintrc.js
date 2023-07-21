module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    node: true,
    'cypress/globals': true
  },
  plugins: [
    'react',
    'prettier',
    '@typescript-eslint',
    'cypress',
    'chai-friendly',
    'no-only-tests'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['node_modules/', '_explicacoes/'],
  // Cherry of the Cake
  rules: {
    'no-only-tests/no-only-tests': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
    // Permitir JSX tanto em arquivos .js quanto em .jsx
    // 'react/jsx-filename-extension': [ 1, { extensions: [ '.js', '.jsx' ] } ],
    // Não permitir uso de var, converter para let
    'no-var': 'error',
    // Não inserir ponto e vírgula no fim da sentença
    /*
    semi: [
      'error',
      'never',
      { beforeStatementContinuationChars: 'never' }
    ],
    */
    // Não inserir vírgula após último elemento de arrays e objetos
    // No prettier é "trailingComma": "none"
    'comma-dangle': ['error', 'never'],
    // Identação com dois espaços
    indent: ['error', 2],
    // Permitir tabs para identação
    // No prettier é "useTabs": false
    'no-tabs': ['error', { allowIndentationTabs: true }],
    // Preferir apóstrofo a aspas
    // No prettier é "singleQuote": true,
    // 'jsx-quotes': [ 'error', 'prefer-single' ],
    quotes: ['error', 'single'],
    // Permitir export não default também
    'import/prefer-default-export': 'off',
    // Exigir espaço dentro de array: [ count, setCount ]
    // Ta dando confliro com o Prettier, então removi
    'array-bracket-spacing': ['error', 'never'],
    // Exigir espaço dentro de objeto: { 1, 2, 3 }
    'template-curly-spacing': ['error'],
    // Não exigir quebra de linha ou linha única para objetos (livre)
    'object-curly-newline': ['error', { consistent: true }],
    // Arrow functions com um parâmetro não devem usar parênteses
    // No prettier é "arrowParens": "avoid"
    'arrow-parens': ['error', 'as-needed'],
    // Máximo de 80 caracteres por linha
    'max-len': ['error', { code: 80 }],
    // Não ter espaço entre o nome da função e os parênteses
    'no-spaced-func': 'error',
    // Permitir spread operator
    // 'react/jsx-props-no-spreading': 'off',
    // Label não se contenta com 'htmlFor' e exige 'for' que é palavra reservada
    // 'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }]
    // Permitir operação unária
    // 'no-plusplus': 'off',
    // Permitir inserção de HTML externo no React por causa do DatoCMS
    // 'react/no-danger': 'off',
    // Ignorar propTypes
    // 'react/prop-types': [ 0 ],
    // Não exigir parênteses em if ternário
    'no-confusing-arrow': 'off'
    // Permitir underline antes de nome de variável
    // 'no-underscore-dangle': 'off'
  }
};
