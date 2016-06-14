const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        "vanilla-counter": [
            'webpack-hot-middleware/client',
            './example/vanilla-counter/index.js'
        ],
        "react-counter": [
            'webpack-hot-middleware/client',
            './example/react-counter/index.js'
        ],
        "react-todo": [
            'webpack-hot-middleware/client',
            './example/react-todo/index.js'
        ],
        "react-user": [
            'webpack-hot-middleware/client',
            './example/react-user/index.js'
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