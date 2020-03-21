const { parsed: env } = require('dotenv').config();
const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

// webpack base config
const { config, rootDir } = require('./webpack.config.base');

module.exports = merge(config, {
    // 在本地build设置成development，这样方便分析打包后的代码
    mode: env.ENV || 'production',
    output: {
        filename: '[name].[chunkHash].js',
    },
    module: {
        rules: [
            // less
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
        ],
    },
    devtool: env.ENV === 'production' ? 'none' : 'eval-source-map',
    optimization: {
        runtimeChunk: {
            name: entryPoint => `~runtime.${entryPoint.name}`,
        },
        // 用splitChunks分离出来的包需要html-webpack-plugin@next(^4.0.0-beta.14)才能inject到template中
        // 之前的版本只能依赖entry属性inject
        splitChunks: {
            chunks: 'all',
            minSize: 1024 * 0,
            automaticNameDelimiter: '.',
            automaticNameMaxLength: 30,
            hidePathInfo: true,
            cacheGroups: {
                default: false,
                defaultVendors: false,
                '~vender': {
                    test: /[\\/]node_modules[\\/]/,
                    maxSize: 1024 * 500,
                    enforce: true,
                    priority: 10,
                },
                common: {
                    minChunks: 2,
                    // 当前js entry chunk能并行加载js on-demand chunk的最大数目
                    maxAsyncRequests: 100,
                    // 当前html入口初始加载js entry chunk的最大数目
                    maxInitialRequests: 100,
                    priority: 9,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
});
