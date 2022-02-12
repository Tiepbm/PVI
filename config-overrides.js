/* config-overrides.js */
const { override, fixBabelImports, addLessLoader, disableEsLint } = require('customize-cra');
module.exports = override(
    disableEsLint(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            // '@layout-header-background': '#fff',
            // '@font-family': 'Roboto, "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
            '@primary-color': '#F59F32',
            // '@link-color': '#ec4649',
            '@font-size-base': '12px',
            '@text-color':'#000000',
        },
    })
);
