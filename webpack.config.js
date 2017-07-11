'use strict';
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/blackTip.js'
    },
    output: {
        path: __dirname + '/build/',
        filename: 'blackTip.js',
        chunkFilename: 'blackTip.js',
        library: 'blackTip',
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
            inject: true
        })
    ]
}