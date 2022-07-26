const path = require('path');
const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');




const commonConfig = merge([
    {
        output: {
            clean: true,
            path: path.resolve(__dirname, "dist"),//this is the global output path control
            filename: '[name].js',
            chunkFilename: '[name].js', //this is for testing dynamic import plug-in
            publicPath: "/",
            globalObject: 'this',
            assetModuleFilename: "images/[hash][ext][query]"
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },

    },

    parts.loadImages({ limit: 25 * 1024 }),
    parts.loadCSS(),
    parts.loadJavaScript(),



])
const productionConfig = merge([
    parts.eliminateUnusedCSS(),

]);


const developmentConfig = merge([
    parts.devServer(),

]);



const getConfig = (mode) => {
    console.log('current mode: ' + mode);
    const plugins = [
    ];

    if (process.env.SERVE) {
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    const indexPage = [
        parts.page({
            entry: {
                "index": "./src/index.js",
            },
            template: './src/index.html',
            filename: 'index.html',
            path: 'index',
            chunks: ['index'],
            plugins: plugins
        }),
        parts.page({
            entry: {
                "sub-index": "./src/sub-index.js"
            },
            template: './src/sub-index.html',
            filename: 'sub-index.html',
            path: 'sub-index',
            chunks: ['sub-index'],
            plugins: plugins
        })

    ];

    const pages = [
        ...indexPage
        // ...indexPage, ...generalPages

    ];

    switch (mode) {
        case "production":
            return merge([commonConfig, productionConfig, { mode }].concat(pages));
        case "development":
            return merge([commonConfig, developmentConfig, { mode }].concat(pages));
        default:
            throw new Error(`Trying to use an unknown mode, ${mode}`);
    }


}


module.exports = getConfig(mode);