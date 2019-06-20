const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: path.resolve(__dirname, "server.js"),

    target: "node",

    externals: [nodeExternals()],

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: "html-loader"
            }
        ]
    },

    plugins: [
        new NodemonPlugin()
    ],

    node: {
        __dirname: false
    }
}