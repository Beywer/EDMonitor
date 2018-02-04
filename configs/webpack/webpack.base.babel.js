const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// PostCSS plugins
// const cssnext = require('postcss-cssnext');
// const postcssReporter = require('postcss-reporter');


module.exports = function (options) {
    return {
        entry: path.join(process.cwd(), 'client/app.js'),

        output: {
            path: path.resolve(process.cwd(), 'server/public'),
            filename: 'main.js'
        },

        plugins: [
            new CleanWebpackPlugin(['server/public'], {root: process.cwd()}),
            new HtmlWebpackPlugin({template: path.resolve(process.cwd(), 'client/index.html')}),

            new webpack.ProvidePlugin({
                'Promise': 'es6-promise',
            }),

        ].concat(options.plugins),

        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: options.imagesName
                    }
                },
                {
                    test: /\.js$|\.jsx$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        extends: path.resolve(process.cwd(), 'configs/babel/.babelrc')
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    loaders: options.cssLoaders,
                },
                {
                    test: /\.css$/,
                    include: /node_modules/,
                    loaders: ['style-loader', 'css-loader'],
                }
            ]
        },

        devtool: options.devtool,

        resolve: {
            modules: [
                path.resolve('./node_modules'),
                path.resolve('./client')
            ],
            extensions: [".jsx", ".jsx.js", ".js"]
        },
    }
};