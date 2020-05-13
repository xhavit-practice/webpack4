const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dirBuild = path.resolve(__dirname, '.');
const dirDLL = path.join(dirBuild, 'dll');

module.exports = {
    mode: 'production',
    entry: {
        vendor: ['react', 'react-dom'],
    },
    output: {
        filename: '[name].dll.js',
        path: dirDLL,
        library: '[name]_[chunkhash:8]',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            format: true,
            name: '[name]_[chunkhash:8]',
            path: path.join(dirDLL, '[name].manifest.json'),
        }),
    ],
};
