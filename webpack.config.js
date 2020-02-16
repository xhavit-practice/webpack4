const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    search: "./src/search.js",
    index: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    hashDigestLength: 8
  },
  mode: "development",
  devtool: "none",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true
  },
  module: {
    rules: [
      // js
      {
        // test: /\.js$/,
        test: /\.js$/,
        use: "babel-loader"
      },
      // less
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      // image
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[contenthash:8].[ext]",
          outputPath: "asset/image"
        }
      },
      // font
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[contenthash:8].[ext]",
          outputPath: "asset/font"
        }
      }
    ]
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()]
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/template/index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "search.html",
      template: "src/template/search.html",
      chunks: ["search"]
    })
  ]
};
