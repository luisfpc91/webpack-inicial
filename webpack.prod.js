const HtmlWebpackPlugin              = require('html-webpack-plugin');
const MiniCssExtractPlugin           = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin              = require('copy-webpack-plugin');
const TerserPlugin                   = require('terser-webpack-plugin');
const { CleanWebpackPlugin }         = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserPlugin()
        ],        
    },
    output: {
        filename: '[name].[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false //true
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false  
        }),
        new CopyWebpackPlugin([
            {from: 'src/assets', to: 'assets/'}
        ]),
        new CleanWebpackPlugin(),
    ]
}