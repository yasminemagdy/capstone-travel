const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/Client/index.js',
    devtool: 'source-map',
    devServer: {port:3000},
    output: {
        libraryTarget: 'var',
        library: 'Client',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules:[
            {
                test: '/\.js$',
                exclude: 'node_modules',
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader' , 'sass-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use:[{
                    loader: 'file-loader',
                    options:{name: '[name].[ext]'}
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/Client/views/index.html',
            filename: './index.html'
        }),
        new CleanWebpackPlugin({
            // simulate the removal of files
            dry: true,
            //write logs to console
            verbose: true,
            // remove unused webpack assets on rebuild automatically
            cleanStaleWebpackAssets: false,
            protectWebpackAssets: false

        }),
        

    ]
}