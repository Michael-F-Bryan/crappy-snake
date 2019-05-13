const path = require("path");
const package = require("./package.json");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, package.main),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "static"),
        hot: true,
        overlay: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "static", "index.html")
        })
    ],

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};
