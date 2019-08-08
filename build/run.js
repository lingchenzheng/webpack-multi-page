const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server/lib/Server')
const webpackConfig = require('./webpack.dev.js')
const compiler = webpack(webpackConfig)
const { resolve } = require('./util')
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    open: true,
    stats: {
        colors: true
    },
    contentBase: resolve('dist'),
    openPage: 'html/home.html'
})
const server = new WebpackDevServer(compiler, devServerOptions)
server.listen(3300, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:3300')
})
