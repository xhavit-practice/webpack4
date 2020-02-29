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
      // ejs
      {
        test: /\.ejs$/,
        use: "ejs-webpack-loader"
      },
      // hbs
      { test: /\.hbs$/, use: "handlebars-loader" },
      // js
      {
        // test: /\.js$/,
        test: /\.js$/,
        use: "babel-loader"
      },
      // less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
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
    // use default ejs(LoDash Templates) as template
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/template/index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "search.html",
      template: "src/template/search.html",
      chunks: ["search"]
    }),
    // use ejs(mde/ejs) as template
    new HtmlWebpackPlugin({
      filename: "index-ejs.html",
      template: "src/template/index.ejs",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "search-ejs.html",
      template: "src/template/search.ejs",
      chunks: ["search"]
    }),
    // use handlebars as template
    new HtmlWebpackPlugin({
      filename: "index-hbs.html",
      template: "src/template/index.hbs",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "search-hbs.html",
      template: "src/template/search.hbs",
      chunks: ["search"]
    })
  ]
};
