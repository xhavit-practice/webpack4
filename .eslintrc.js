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
        'react/jsx-one-expression-per-line': 'off',
    },
    overrides: [
        {
            files: ['*.spec.js', 'mocha/smoke/**/*.js'],
            env: {
                // adds all of the Mocha testing global variables
                mocha: true,
            },
            rules: {
                // Passing arrow functions (aka "lambdas") to Mocha is discouraged
                // https://mochajs.org/#arrow-functions
                // 因此在mocha的测试用例中会多用匿名函数
                'func-names': 'off',
            },
        },
    ],
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
