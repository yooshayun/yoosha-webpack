const utils = require('./util')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': utils.env()
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-i18n', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: '系统 v' + package.version,
            // template: '!!ejs-loader!./src/template/index.ejs',
            filename: '../index.html',
            favicon: 'static/logo.ico',
            inject: false
        })
    ]
});
