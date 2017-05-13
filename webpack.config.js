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
    }
}