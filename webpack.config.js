const WebpackHtmlPlugin = require('webpack-html-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const paths = {
  entry: `${__dirname}/src/index.js`,
  build: `${__dirname}/build/`,
  scripts: `${__dirname}/src/`,
  style: `${__dirname}/src/stylesheets/`
}

module.exports = {
  entry: paths.entry,
  output: {
    path: paths.build,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [paths.scripts, paths.entry],
        loader: 'babel-loader',
        presets: ['react', 'es2015']
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") }
    ]
  },

  plugins: [new WebpackHtmlPlugin({filename: 'index.html', inject: true}),
            new ExtractTextPlugin('style.css')]
}