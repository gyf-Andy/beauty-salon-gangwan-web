const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const OUTPUT_DIR = path.join(__dirname, '..', 'dist')
const OUTPUT_PACKAGE = path.join(OUTPUT_DIR, process.env.VUE_APP_NAME || '')
// 构建归档
const fileManagerOptions = {
  events: {
    onStart: {
      delete: [OUTPUT_DIR]
    },
    onEnd: {
      archive: [
        {
          source: OUTPUT_PACKAGE,
          destination: `${OUTPUT_PACKAGE}.zip`
        }
      ]
    }
  }
}

module.exports = new FileManagerPlugin(fileManagerOptions)
