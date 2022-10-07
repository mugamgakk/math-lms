const { override, addBabelPlugin, addBabelPreset } = require('customize-cra');
module.exports = override(
    addBabelPlugin('styled-jsx/babel')
);