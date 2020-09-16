const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

const configFilePath = path.join(__dirname, '..', 'tsconfig.json');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(ts|tsx)?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader' ]
      },
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.less', '.css' ],
    plugins: [new TsconfigPathsPlugin({ configFile: configFilePath })],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-typescript',
      template: path.join(process.cwd(), '/public/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    })
  ],
}
