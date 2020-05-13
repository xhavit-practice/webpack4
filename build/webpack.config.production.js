const dotenv = require('dotenv');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

// webpack base config
const { config } = require('./webpack.config.base');
// env variables
const { parsed: env } = dotenv.config();

module.exports = smp.wrap(
    merge(config, {
        mode: env.ENV || 'production',
        output: {
            filename: '[name].[chunkHash].js',
        },
        devtool: 'none',
        stats: 'errors-warnings',
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
                // sass
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        optimization: {
            minimize: env.MINIMIZE === 'true',
            runtimeChunk: {
                name: (entryPoint) => `~runtime.${entryPoint.name}`,
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
                    '~vendor': {
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
            // handleBuildErrorPlugin,
        ],
    })
);

// // 主动捕获并处理构建错误，抛出错误码，webpack4中已经默认处理
// function handleBuildErrorPlugin() {
//     this.hooks.done.tap('done', stats => {
//         if (
//             stats.compilation.errors &&
//             stats.compilation.errors.length &&
//             process.argv.indexOf('--watch') === -1
//         ) {
//             console.log('build error');
//             process.exit(1111);
//         }
//     });
// }
