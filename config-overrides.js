const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')
// 配置别名
const alias = addWebpackAlias({
  '@': path.join(__dirname, 'src'),
  '@scss': path.join(__dirname, 'src/assets/styles')
})
module.exports = override(alias)
