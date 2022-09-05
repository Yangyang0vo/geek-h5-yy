const { override, addWebpackAlias, addPostcssPlugins, fixBabelImports } = require('customize-cra')
const path = require('path')
const pxtoviewport = require('postcss-px-to-viewport')
//
// const babelPlugins = fixBabelImports('import', {
//   libraryName: 'antd-mobile',
//   style: 'css'
// })

// 配置别名
const alias = addWebpackAlias({
  '@': path.join(__dirname, 'src'),
  '@scss': path.join(__dirname, 'src/assets/styles')
})
//2vw
const postcssPlugins = addPostcssPlugins([
  pxtoviewport({
    viewportWidth: 375
  })
])

// const postcssPlugins = addPostcssPlugins([require('postcss-px-to-viewport'), { viewportWidth: 375 }])
module.exports = override(
  // babelPlugins,
  alias,
  postcssPlugins
)
