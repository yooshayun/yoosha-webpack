const utils = require('./util')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const os = require('os');
const fs = require('fs');
const path = require('path');
const package = require('../package.json');

//创建一个版本信息的插件
function CreateVersion() {
  
}
CreateVersion.prototype.apply = function(compiler) {
  compiler.plugin('done', function(){
    var version = new Date().getTime();
    var content = "getVersion('" + version + "')";
    
    fs.writeFile("dist/dist/version.js", content, function(err) {
      if(err) {
        return console.log(err);
      }
    })
  })
}

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '/dist/', // 修改
    // 这部分为你的服务器域名
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': utils.env()
    }),
    new cleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),
    new CreateVersion(),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'vendors',
      // filename: 'vendors.[hash].js'
      name: ['vender-exten', 'vender-i18n', 'vender-base'],
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/styles/fonts',
        to: 'fonts'
      }
    ]),
    new HtmlWebpackPlugin({
      title: '系统 v' + package.version,
      filename: '../index.html',
      template: '!!ejs-loader!./src/template/index.ejs',
      favicon: 'static/logo.ico',
      inject: false
    }),
    // new BundleAnalyzerPlugin({ analyzerPort: 8919 })
  ]
});
