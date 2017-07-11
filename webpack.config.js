'use strict';
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/Toast.js'
    },
    output: {
        path: __dirname + '/build/',
        filename: 'Toast.js',
        chunkFilename: 'Toast.js',
        library: 'Toast',
        libraryTarget: 'umd'
    },
    devServer: {
        port: 4000,
        host: '127.0.0.1',
        inline: true,
        hot: false
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['app'],
            inject: 'head'
        })
    ]
}