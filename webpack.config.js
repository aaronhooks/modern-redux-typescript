const path = require("path")
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.png$/i,
        include: /[/\\]node_modules[/\\]semantic-ui-css[/\\]/,
        loader: "file-loader",
        options: { name: "images/[name].[hash].[ext]", publicPath: "../" }
      },
      {
        test: /\.(woff2?|[ot]tf|eot|svg)$/i,
        loader: "file-loader",
        options: { name: "fonts/[name].[hash].[ext]", publicPath: "../" }
      }
    ]
  },
  resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    contentBase: path.join(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv()
  ]
}
