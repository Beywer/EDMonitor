const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.join(process.cwd(), 'client/app.js'),

    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: 'bundle.js'
    },

    plugins: [
        new CleanWebpackPlugin(['build'], {root: process.cwd()}),
        new HtmlWebpackPlugin({template: path.resolve(process.cwd(), 'client/index.html')})
    ],

    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name][hash].[ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    extends: path.resolve(process.cwd(), 'configs/babel/.babelrc')
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            }
        ]
    },

    devtool: "eval-source-map",

    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./client')
        ],
        extensions: [".jsx", ".jsx.js", ".js"]
    }
};