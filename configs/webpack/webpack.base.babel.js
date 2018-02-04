const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// PostCSS plugins
// const cssnext = require('postcss-cssnext');
// const postcssReporter = require('postcss-reporter');


module.exports = function (options) {
    return {
        entry: [
            'webpack-dev-server/client?http://0.0.0.0:3000',
            'webpack/hot/only-dev-server',
            path.join(process.cwd(), 'client/app.js')
        ],

        output: {
            path: path.resolve(process.cwd(), 'server/public'),
            filename: 'main[hash].js'
        },

        plugins: [
            new CleanWebpackPlugin(['server/public'], {root: process.cwd()}),
            new HtmlWebpackPlugin({template: path.resolve(process.cwd(), 'client/index.html')}),

            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                },
            }),

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

        resolve: {
            modules: [
                path.resolve('./node_modules'),
                path.resolve('./client')
            ],
            extensions: [".jsx", ".jsx.js", ".js"]
        },

        devtool: options.devtool,
        // devServer: {
        //     port: 3000,
        //     proxy: {
        //         "/socket.io": "http://localhost:3200"
        //     }
        // }

    }
};