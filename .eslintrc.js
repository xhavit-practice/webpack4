module.exports = {
    // ESLint's default parser and core rules only support the latest final ECMAScript
    // standard and do not support experimental (such as new features) and
    // non-standard (such as Flow or TypeScript types) syntax provided by Babel.
    // babel-eslint is a parser that allows ESLint to run on source code that is transformed by Babel.
    parser: 'babel-eslint',
    env: {
        // Node.js global variables and Node.js scoping
        node: true,
        // browser global variables
        browser: true,
        // adds all ECMAScript 2020 globals
        es2020: true,
    },
    extends: [
        'airbnb',
        // enables the linting rules for React hooks (requires v16.8+)
        'airbnb/hooks',
        // Turns off all rules that are unnecessary or might conflict with Prettier
        'prettier',
    ],
    rules: {
        // eslint
        indent: ['error', 4],
        'no-console': 'off',
        // import
        'import/prefer-default-export': 'off',
        // react
        'react/jsx-indent': ['error', 4],
        'react/jsx-filename-extension': 'off',
    },
    settings: {
        // supporting module alias
        // https://github.com/johvin/eslint-import-resolver-alias
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: [],
            },
        },
    },
};
