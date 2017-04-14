var path = require('path');

module.exports = {
    entry: './src/blackTip.js',
    output: {
        path: __dirname + '/build/',
        filename: 'blackTip.js',
        library: 'blackTip',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }
}