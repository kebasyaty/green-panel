const path = require('path')
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin')
const { styles } = require('@ckeditor/ckeditor5-dev-utils')

module.exports = {
  transpileDependencies: [
    'vuetify',
    /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/contrib/'
    : '/',
  outputDir: path.resolve(__dirname, '../admin'),
  configureWebpack: {
    plugins: [
      new CKEditorWebpackPlugin({
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: 'en',
        // Append translations to the file matching the `app` name.
        translationsOutputFile: /app/
      })
    ]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'))
    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader')
    config.module
      .rule('cke-css')
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap(() => {
        return styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
          },
          minify: true
        })
      })
  }
}
