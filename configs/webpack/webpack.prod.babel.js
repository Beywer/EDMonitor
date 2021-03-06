const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = require('./webpack.base.babel')({
    imagesName: '[hash].[ext]',

    cssLoaders: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[hash]',
                    importLoaders: 1,
                    sourceMap: false
                }
            },
            {
                loader: 'postcss-loader', options: {
                    config: {
                        path: 'configs/postcss/postcss.config.js'
                    }
                }
            }]
    }),

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("main[hash].css")
    ],

    devtool: false
});
