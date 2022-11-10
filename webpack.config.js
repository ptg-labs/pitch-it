const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, '/build'),
    },
    proxy: {
      '/': 'http://localhost:3000/',
    },
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': '*',
    //   'Access-Control-Allow-Methods': '*',
    // },
    // host: 'localhost',
    port: '8080',
  },
  mode: process.env.NODE_ENV,
  // resolve: {
  //   /** "extensions"
  //    * If multiple files share the same name but have different extensions, webpack will
  //    * resolve the one with the extension listed first in the array and skip the rest.
  //    * This is what enables users to leave off the extension when importing
  //    */
  //   extensions: ['.js', '.jsx', '.json'],
  // },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        // debating on whether I want to use SCSS
        test: /\.s?[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './client/index.html'),
    }),
  ],
};
