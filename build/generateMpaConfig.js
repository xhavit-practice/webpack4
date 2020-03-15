const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const mpa = require("../src/mpa");

// root dir
const rootDir = path.resolve(__dirname, "..");

// generate MPA config
module.exports = function generateMpaConfig() {
  const entry = {};
  const config = [];

  mpa.forEach(v => {
    entry[v.key] = path.join(rootDir, v.entry);
    config.push(
      new HtmlWebpackPlugin({
        filename: `${v.key}.html`,
        template: path.join(rootDir, v.template),
        chunks: [v.key]
      })
    );
  });

  return { entry, htmlWebpackPluginConfig: config };
};
