module.exports = {
    spec: ['**/*.spec.js'],
    ignore: ['node_modules/**/*.spec.js'],
    recursive: true,
    // babel实时编译
    require: [
        './mocha/requireRegister.js',
        'jsdom-global/register',
        '@babel/register',
    ],
    diff: true,
    opts: false,
    package: './package.json',
    // reporter: "mochawesome",
    slow: 75,
    timeout: 5000,
    ui: 'bdd',
    //   "watch-files": ["lib/**/*.js", "test/**/*.js"]
    //   "watch-ignore": ["lib/vendor"]
};
