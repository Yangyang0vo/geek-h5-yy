// @ts-nocheck
const { override, addWebpackAlias, addPostcssPlugins, addBabelPlugins, addWebpackExternals } = require('customize-cra')
const path = require('path')
const pxtoviewport = require('postcss-px-to-viewport')
// const webpack = require('webpack')
// const Dotenv = require('dotenv-webpack')

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
//
const babelPlugins = addBabelPlugins(['import', { libraryName: 'antd', style: 'css' }])

//  排除第三方的依赖包
// 区分开发环境和生产环境
const environment =
  process.env.NODE_ENV === 'production'
    ? {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    : {}

const externals = addWebpackExternals(environment)
module.exports = override(
  alias,
  postcssPlugins,
  babelPlugins,
  externals
  // addWebpackPlugin(
  //   new webpack.DefinePlugin({
  //     process: { env: {} }
  //   })
  // ),
  // addWebpackPlugin(new Dotenv())
)
