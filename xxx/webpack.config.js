const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function relativeXxx(p) {
    return path.resolve(__dirname, p);
}

module.exports = {
    mode: 'none',
    entry: relativeXxx('index.js'),
    output: {
        path: relativeXxx('dist'),
        filename: '[name].js',
    },
    module: {
        noParse: /noParse\.js/,
    },
    plugins: [new CleanWebpackPlugin()],
};
