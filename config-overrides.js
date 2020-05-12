const path = require('path');
const root = path.resolve(__dirname, 'public');

const htmlWebpackPlugin = require('html-webpack-plugin');
const custom = config => {
    config.output = {
        publicPath: "./",
        path: path.resolve(__dirname, './build'),
        filename: '[name].[hash].js',
    };
    config.plugins.push(new htmlWebpackPlugin({
        scriptLoading: "defer",
        minify: true,
        template: path.resolve(root, 'index.html'),
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
    custom
);
