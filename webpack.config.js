const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./src/config');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: path.join('static', 'index.js'),
        publicPath: '/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: path.join('static', 'css', `[name].css`),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        }),
        ...config.bot_list.map(bot => new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: path.join(bot.patch || '', `${bot.name}.html`),
        }))
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],

            },
            {
                test: /.(scss|css)$/,

                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,

                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            }
        ]
    },

    optimization: {
        minimizer: [new TerserPlugin()],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/
                }
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true
        }
    },
    resolve: {
        alias: {
            '@config': path.resolve(__dirname, 'src/config'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@view': path.resolve(__dirname, 'src/view'),
            '@static': path.resolve(__dirname, 'src/static'),
            '@selectors': path.resolve(__dirname, 'src/selectors'),

            // '@components': path.resolve(__dirname, 'src/components'),
            // '@database': path.resolve(__dirname, 'src/firebase'),
            // '@react-svg': path.resolve(__dirname, 'src/static/react-svg'),
            // '@router_config': path.resolve(__dirname, 'src/router_config.js'),
        }
    },
    devServer: {
        historyApiFallback: {
            historyApiFallback: true
        },
        port: 9000
    }
};
