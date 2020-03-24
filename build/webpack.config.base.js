const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// project root dir
const rootDir = path.resolve(__dirname, '..');
// html-webpack-plugin config
const { entry, htmlWebpackPluginConfig } = require('./generateMpaConfig')();

exports.rootDir = rootDir;
exports.config = {
    entry,
    output: {
        path: path.join(rootDir, 'dist'),
        hashDigestLength: 8,
    },
    resolve: {
        // 这里需要配合jsconfig.js使用，否则ide识别不了路径，开发起来比较麻烦
        alias: {
            '@': path.join(rootDir, 'src'),
        },
    },
    module: {
        rules: [
            // html
            {
                test: /\.ejs$/,
                loader: ['ejs-loader'],
            },
            // js
            {
                // test: /\.js$/,
                test: /\.js$/,
                use: ['babel-loader', 'eslint-loader'],
            },
            // image
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash:8].[ext]',
                    outputPath: 'asset/image',
                    esModule: false,
                },
            },
            // font
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash:8].[ext]',
                    outputPath: 'asset/font',
                    esModule: false,
                },
            },
        ],
    },
    plugins: [...htmlWebpackPluginConfig, new FriendlyErrorsWebpackPlugin()],
};
