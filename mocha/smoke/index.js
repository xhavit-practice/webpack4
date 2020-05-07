const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const webpackConfig = require('../../build/webpack.config.production');

const dirRoot = path.resolve(__dirname, '../..');
const dirDist = path.join(dirRoot, 'dist');
const mocha = new Mocha();

rimraf(dirDist, (err) => {
    if (err) throw err;

    webpack(webpackConfig, (e, stats) => {
        if (e) {
            console.error(e);
            process.exit(1);
        }

        console.log(
            stats.toString({ colors: true, modules: false, children: false })
        );

        console.log('Webpack build Success, start smoke test...');
        
        mocha.addFile(path.resolve(__dirname, './checkDistFiles.js'));
        mocha.run(function (failures) {
            process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
        });
    });
});
