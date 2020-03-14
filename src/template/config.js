const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// template dir
const templateDir = path.resolve(__dirname, ".");

module.exports = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.join(templateDir, "index.ejs"),
    chunks: ["index"],
    templateParameters: (compilation, assets, assetTags, options) => {
      return {
        compilation,
        webpackConfig: compilation.options,
        htmlWebpackPlugin: {
          tags: assetTags,
          files: assets,
          options
        },
        foo: "foo"
      };
    }
  }),
  new HtmlWebpackPlugin({
    filename: "search.html",
    template: path.join(templateDir, "search.ejs"),
    chunks: ["search"]
  })
];
