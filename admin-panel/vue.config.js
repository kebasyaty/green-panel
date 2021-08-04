const path = require('path')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/contrib/'
    : '/',
  outputDir: path.resolve(__dirname, '../admin')
}
