const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

const mode = "development";

module.exports = {
    mode,
    entry: path.resolve(__dirname, "src", "main.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
        filename: "main.js",
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
    })],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
}