const { override, addWebpackAlias, addPostcssPlugins, addWebpackPlugin } = require('customize-cra')
const path = require('path')
const pxtoviewport = require('postcss-px-to-viewport')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

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

module.exports = override(
  alias,
  postcssPlugins,
  addWebpackPlugin(
    new webpack.DefinePlugin({
      process: { env: {} }
    })
  ),
  addWebpackPlugin(new Dotenv())
)
