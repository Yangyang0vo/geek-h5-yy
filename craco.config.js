const path = require('path')
module.exports = {
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            require('postcss-px-to-viewport', {
              unitToConvert: 'px',
              viewportWidth: 375,
              exclude: /node_modules/i // 要忽略并保留为 px 的文件路径
            })
          ]
        }
      }
    }
  },
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '@scss': path.join(__dirname, 'src/assets/styles')
    }
  }
}
