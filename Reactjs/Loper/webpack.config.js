var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'public/app');

var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var MinifyPlugin = require("babel-minify-webpack-plugin");

var config = {
  mode: 'development',
   plugins: [
   new webpack.NamedModulesPlugin(),
   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
 ],
 mode: 'production',
   plugins: [
   new webpack.NamedModulesPlugin(),
   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
 ],
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
   module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;