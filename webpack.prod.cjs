const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    entry: "./src/client/index.js",
    mode: "production",
    devtool: 'hidden-source-map',
    output: {
        filename: 'Bundle.js',
        path: path.resolve(__dirname, "dist"),
        libraryTarget: 'var',
        library: 'Client',
        clean: true,
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),

        new GenerateSW({ 
            clientsClaim: true, 
            skipWaiting: true,  
            runtimeCaching: [
                {
                    urlPattern: new RegExp('/getLocation|/getWeather|/getPhoto'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'api-cache',
                        networkTimeoutSeconds: 10,  // Timeout after 10 seconds
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 300,  // Cache the API response for 5 minutes
                        },
                        cacheableResponse: {
                            statuses: [200]  // Only cache responses with status 200
                        }
                    },
                },
                {
                    urlPattern: /\.(?:js|css|html)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'static-resources',
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 86400, 
                        },
                    },
                }
            ],
        }),
    ],
};
