const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vanilla: [
            'webpack-hot-middleware/client',
            './example/vanilla/index.js'
        ],
        react: [
            'webpack-hot-middleware/client',
            './example/react/index.js'
        ],
        todo: [
            'webpack-hot-middleware/client',
            './example/todo/index.js'
        ],
        userInfo: [
            'webpack-hot-middleware/client',
            './example/userInfo/index.js'
        ],
    },
    output: {
        path: path.join(__dirname, 'example'),
        filename: '[name]/bundle.[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] }
        ]
    }
};