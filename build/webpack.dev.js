const {
    resolve,
    getFileList,
    generateHtmls,
    generateEntries
} = require('./util')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const fileList = getFileList('src/html/**/*.html')
const htmls = generateHtmls(fileList)
//生成插件
const htmlPlugins = htmls.map(item => {
    const { name, fullName, filePath } = item
    return new HtmlWebpackPlugin({
        template: resolve(filePath),
        filename: `html/${fullName}`,
        chunks: ['common', name]
    })
})
const entries = generateEntries()
module.exports = {
    mode: 'development',
    entry: entries,
    output: {
        path: resolve('dist'),
        filename: 'js/[name].js'
    },
    plugins: [...htmlPlugins]
}
