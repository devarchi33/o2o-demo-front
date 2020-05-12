const path = require('path');
const srcRoot = path.resolve(__dirname, 'public');

const htmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpack = config => {
    config.plugins.push(new htmlWebpackPlugin({
        output: {
            publicPath: "/",
            path: path.resolve(__dirname, './build'),
            filename: '[name].[chunkhash].js',
        },
        scriptLoading: "defer",
        minify: true,
        template: path.resolve(srcRoot, 'index.html'),
    }));
    return config
};

const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('antd', {
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: { '@primary-color': '#25b864' },
    }),
    htmlWebpack
);
