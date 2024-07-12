const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");

const envPath = path.resolve(__dirname, `../.env/.env.dev`);
const envConfig = require("dotenv").config({ path: envPath }).parsed;

const definePlugin = {};
Object.keys(envConfig).map((key) => {
  definePlugin[`process.env.${key}`] = JSON.stringify(envConfig[key]);
});

const config = {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["react-refresh/babel"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(definePlugin),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new ReactRefreshWebpackPlugin({ overlay: false }),
  ],
  stats: "errors-only",
  devServer: {
    client: {
      logging: "error",
      overlay: false,
    },
    hot: true,
    historyApiFallback: true,
    compress: false,
  },
};

module.exports = config;
