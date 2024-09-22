const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');


module.exports = {
    entry: "./src/client/index.js",
    mode: "development",
    devtool: 'source-map',
    output: {
        filename: 'Bundle.js',
        path: path.resolve(__dirname, "dist"),
        libraryTarget: 'var',
        library: 'Client',
        clean: true,
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
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
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
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp('/getLocation|/getWeather|/getPhoto'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'api-cache',
                        networkTimeoutSeconds: 10, 
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 300,
                        },
                        cacheableResponse: {
                            statuses: [200]
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
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
};
