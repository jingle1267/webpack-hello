var path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        index: './src/js/index.js',
        hello: './src/js/hello.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]-[chunkhash].js'
    },
    // 设置开发者工具的端口号,不设置则默认为8080端口
    devServer: {
        inline: true,
        port: 8181
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]-[hash:5].min.[ext]",
                            limit: 10000, // size <= 20KB
                            publicPath: "static/",
                            outputPath: "static/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // filename: "index.html",
            template: "./src/index.html",
            inject: "head",
            // chunks: ["src"], // entry中的app入口才会被打包
            minify: {
                // 压缩选项
                collapseWhitespace: true
            },
            title: 'webpack test title'
        })
    ]
};
