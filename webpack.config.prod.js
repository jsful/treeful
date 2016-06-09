const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        device: './src/device.js',
        desktop: './src/app.desktop.js',
        mobile: './src/app.mobile.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({ 
            filename: 'index.html',
            template: path.join(__dirname, '/src/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '/src/assets'),
                to: '/assets',
            }
        ])
    ],
    module: {
        loaders: [
            { test: /\.jsx?/, loader: 'babel', include: path.join(__dirname, 'src') },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.scss/, loader: 'style!css!sass' },
            { test: /\.(png|jpg|woff|ttf)/, loader: 'url', query: { limit: '10000', name: '/assets/[name].[ext]' } },
            { test: /\.(svg|mp4|webm)/, loader: 'file', query: { limit: '10000', name: '/assets/[name].[ext]' } }
        ]
    }
};
