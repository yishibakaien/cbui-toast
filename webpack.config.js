'use strict';
var htmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'Toast.js',
        chunkFilename: 'Toast.js',
        library: 'Toast',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.css'],
        alias: {
            'common': path.resolve(__dirname, './src/common'),
            'js': path.resolve(__dirname, './src/common/scripts'),
            'animate': path.resolve(__dirname, './src/common/scripts/animate'),
            'widget': path.resolve(__dirname, './src/widget')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true
                }
            }
        ]
    },
    devServer: {
        // port: 4000,
        // host: '127.0.0.1',
        disableHostCheck: true,
        inline: true,
        hot: false,
        overlay: { // 这里配置 html 页面是否显示 eslint 错误信息蒙版 
            errors: true,
            warnings: true,
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['app'],
            inject: 'head'
        }),
        new webpack.optimize.UglifyJsPlugin({ // js压缩
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        new openBrowserPlugin({
            url: 'http://localhost:4000'
        })
    ]
}