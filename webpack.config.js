const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = (env = {}, args = {}) => {
  const isDev = args.mode !== 'production';
  const plugins = [];
  if (!isDev) {
    plugins.push(new MiniCssExtractPlugin({
      filename: '../css/[name].css',
    }));
  };

  return {
    entry: './source/js/main.js',
    devtool: isDev ? 'source-map' : false,
    output: {
      filename: 'main.bundle.js',
      path: path.resolve(__dirname, 'build/js'),
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ],
        }
      ]
    }
  }
};
