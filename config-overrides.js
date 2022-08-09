/* config-overrides.js */
const { override, fixBabelImports, disableEsLint } = require('customize-cra');
const addLessLoader = require("customize-cra-less-loader");

module.exports = override(
    disableEsLint(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessLoaderOptions: {
            lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                    // '@layout-header-background': '#fff',
                    '@font-family': 'Inter, sans-serif',
                    '@primary-color': '#1890ff',
                    // '@link-color': '#ec4649',
                    '@font-size-base': '14px',
                    '@text-color':'#000000',
                }
            }
        }
    })
);
