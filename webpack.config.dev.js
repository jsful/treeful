const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        device: './src/device.js',
        desktop: [
            'eventsource-polyfill', // necessary for hot reloading with IE
            'webpack-hot-middleware/client',
            './src/app.desktop.js'
        ],
        mobile: [
            'eventsource-polyfill', // necessary for hot reloading with IE
            'webpack-hot-middleware/client',
            './src/app.mobile.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'src'), // path to where webpack will build
        filename: 'bundle.[name].js',
        publicPath: '/' // path that will be considered when importing files
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [
            { test: /\.jsx?/, loader: 'babel', include: path.join(__dirname, 'src') },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.scss/, loader: 'style!css!sass' },
            { test: /\.(png|jpg|woff|ttf)/, loader: 'url', query: { limit: '10000', name: 'assets/[name].[ext]' } },
            { test: /\.(svg|mp4|webm)/, loader: 'file', query: { limit: '10000', name: 'assets/[name].[ext]' } }
        ]
    }
};
