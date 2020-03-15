const { parsed: env } = require("dotenv").config();
const path = require("path");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// webpack base config
const { config, rootDir } = require("./webpack.config.base");

module.exports = merge(config, {
  mode: env.ENV || "production",
  output: {
    filename: "[name].[chunkHash].js"
  },
  module: {
    rules: [
      // less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  },
  devtool: env.ENV === "production" ? "none" : "eval-cheap-module-source-map",
  devServer: {
    contentBase: path.join(rootDir, "dist"),
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ]
});
