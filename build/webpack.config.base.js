const path = require("path");

// project root dir
const rootDir = path.resolve(__dirname, "..");
// html-webpack-plugin config
const HtmlWebpackPluginConfig = require("../src/template/config");

exports.rootDir = rootDir;
exports.config = {
  entry: {
    search: path.join(rootDir, "src/search.js"),
    index: path.join(rootDir, "./src/index.js")
  },
  output: {
    path: path.join(rootDir, "dist"),
    hashDigestLength: 8
  },
  module: {
    rules: [
      // html
      {
        test: /\.ejs$/,
        loader: "ejs-loader"
      },
      // js
      {
        // test: /\.js$/,
        test: /\.js$/,
        loader: "babel-loader"
      },
      // image
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "[name].[contenthash:8].[ext]",
          outputPath: "asset/image",
          esModule: false
        }
      },
      // font
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[contenthash:8].[ext]",
          outputPath: "asset/font",
          esModule: false
        }
      }
    ]
  },
  plugins: [...HtmlWebpackPluginConfig]
};
