const htmlWebpackPlugin = require('html-webpack-plugin');
const custom = config => {
    config.output = {
        publicPath: "./",
    };
    config.plugins.push(new htmlWebpackPlugin({
        scriptLoading: "defer",
        minify: true,
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
