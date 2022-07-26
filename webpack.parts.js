const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const PATHS = {
    src: path.join(__dirname, 'src')
}

exports.devServer = () => ({
    devtool: false,//'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        hot: true
    }
});



exports.loadImages = ({ limit } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jp?g|svg|gif)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: { maxSize: limit }
                },
            }

        ],
    },
});


exports.loadCSS = ({ include, exclude } = {}) => ({

    module: {

        rules: [

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // this is for extract CSS, no need for now
                    {
                        loader: MiniCssExtractPlugin.loader,

                    },
                    // "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
});


exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            // Consider extracting include as a parameter
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
                resolve: {
                    extensions: [".js", ".jsx"],

                },
            },
        ],
    },
});


exports.page = ({ title, path = "", filename, chunks, template, entry, plugins } = {}) => ({
    entry,
    plugins: [
        new HtmlWebpackPlugin({
            publicPath: "/",
            chunks,
            filename: `${path && path + "/"}index.html`,
            template,
            context: { title },
        }),
    ].concat(plugins),
});


exports.eliminateUnusedCSS = () => ({
    plugins: [
        new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
    ],
});