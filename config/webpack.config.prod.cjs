const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

const envPath = path.resolve(__dirname, `../.env/.env.prod`);
const envConfig = require("dotenv").config({ path: envPath }).parsed;

const definePlugin = {};
Object.keys(envConfig).map((key) => {
  definePlugin[`process.env.${key}`] = JSON.stringify(envConfig[key]);
});

const config = {
  mode: "production",
  output: {
    clean: true,
    path: path.resolve(__dirname, "../dist"),
    filename: (pathData) => {
      let name = pathData.chunk.name;
      if (name === "main") {
        return "static/js/[name].[hash:8].js";
      }
      return "static/js/[name].[hash:8].chunk.js";
    },
    chunkFilename: "static/js/[name].[hash:8].chunk.js",
    assetModuleFilename: "static/media/[ext]/[hash][ext][query]",
  },
  plugins: [
    new webpack.DefinePlugin(definePlugin),
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        let name = pathData.chunk.name;
        if (name === "main") {
          return "static/css/[name].[hash:8].css";
        }
        return "static/css/[name].[hash:8].chunk.css";
      },
      chunkFilename: "static/css/[name].[hash:8].chunk.css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `${packageName.replace("@", "")}`;
          },
          priority: 100,
        },
      },
    },
    minimizer: [
      new TerserJSPlugin({
        extractComments: false,
        parallel: true,
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
};

module.exports = config;
