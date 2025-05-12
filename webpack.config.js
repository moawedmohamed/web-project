const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/js/main.js",
    cart: "./src/js/cart.js",
    coupon: "./src/js/coupon.js",
    filter: "./src/js/filter.js",
  },
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/html/index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      filename: "cart.html",
      template: "./src/html/cart.html",
      chunks: ["cart"],
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: "./src/html/contact.html",
      chunks: [], // لا تحتوي على js
    }),
  ],
  mode: "development",
};
