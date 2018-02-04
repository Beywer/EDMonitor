module.exports = require('./webpack.base.babel')({
    imagesName: '[name].[ext]',

    cssLoaders: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                importLoaders: 1,
                sourceMap: true
            }
        },
        {
            loader: 'postcss-loader', options: {
                config: {
                    path: 'configs/postcss/postcss.config.js'
                }
            }
        }
    ],

    plugins: [],

    devtool: 'eval-source-map',
});
