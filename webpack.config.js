'use strict';

module.exports = {
    entry: {
        app: './src/blackTip.js'
    },
    output: {
        path: __dirname + '/build/',
        filename: 'blackTip.js',
        library: 'blackTip',
        libraryTarget: 'umd'
    },
    devServer: {
        host: '127.0.0.1',
        port: 3001,
        inline: true,
        hot: false
    }
}