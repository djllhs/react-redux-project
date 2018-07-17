/*
 * @Author: daijialing
 * @Date: 2018-06-13 11:14:07
 * @Last Modified by: daijialing
 * @Last Modified time: 2018-07-04 17:37:04
 */
const {injectBabelPlugin} = require("react-app-rewired");
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  return config;
};

const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
    config.resolve.alias = {
        '@': resolve('src'),
        'actions': resolve('src/redux/actions'),
        'components': resolve('src/redux/components'),
        'utils':  resolve('src/utils'),
        'api':resolve('src/api'),
        'containers': resolve('src/redux/containers'),
    }
    return config;
}
