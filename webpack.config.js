const path = require('path')

const app_config = {
  devtool: 'none',
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, './public/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, './public/dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['cache-loader', 'babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: ['cache-loader', 'style-loader', 'css-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
}

module.exports = [app_config]
