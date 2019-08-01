const path = require('path');
const slsw = require('serverless-webpack');
const _ = require('lodash');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: _.assign({
    'app/public/css/style': './app/public/css/style.scss',
    // 'app/public/css/style-amp': './app/public/css/style-amp.scss'
  }, slsw.lib.entries),
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'app/views', to: 'app/views' },
      { from: 'app/public', to: 'app/public', ignore: ['*.scss','robots.*.txt'] },
      {
        from: (slsw.lib.webpack.isLocal || slsw.lib.options.stage == 'dev') ? 'app/public/robots.dev.txt' : 'app/public/robots.prd.txt', to: 'app/public/robots.txt'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    })
  ]
};