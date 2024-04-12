filemanager = require('./filemanager')

const plugins = []
if (process.env.NODE_ENV === 'production') {
  // 只在生产环境模式下执行的插件
  plugins.push(filemanager)
}
module.exports = plugins
