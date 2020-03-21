const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// webpack base config
const { config, rootDir } = require('./webpack.config.base');

module.exports = merge(config, {
    mode: 'development',
    output: {
        // 在devServer模式下必须使用hash，不能使用contentHash或者chunkHash
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            // less
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
        ],
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(rootDir, 'dist'),
        hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
