const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const {Template} = require('webpack')
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "To do List",
      template: "./src/index.html",
    }),
  ],
};
