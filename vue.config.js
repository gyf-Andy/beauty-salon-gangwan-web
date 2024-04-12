const path = require('path');
const VUE_APP_NAME = process.env.VUE_APP_NAME || '';
function resolve(dir) {
  return path.join(__dirname, dir)
}
const vueConfig = {
  outputDir: path.join(__dirname, 'dist', VUE_APP_NAME),
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false, // 生产环境 sourceMap，不生成map文件

  devServer: {
    port: 8081,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // before: createMockServer,
    proxy: {
      '/api': {
        //要访问的跨域的域名
        // target: 'http://test.app.pay.inside.eheren.com:20001/',
        target: 'http://localhost:8080',
        // target: 'http://10.8.76.22:6053',
        secure: false, // 使用的是http协议则设置为false，https协议则设置为true
        cookiePathRewrite: '/', // 增加cookie存放路径重写规则,防止代理请求时cookie无法正常传递
        //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
        changOrigin: true,
        pathRewrite: {
          // '/heren/api': '/hrmg/portal/api' //必须这样写
          '^/api': '/graduation/api', //必须这样写
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  },
  // configureWebpack: {
  //     output: {
  //         library: `${VUE_APP_NAME}-[name]`,
  //         libraryTarget: 'umd', // 把微应用打包成 umd 库格式
  //         jsonpFunction: `webpackJsonp_${VUE_APP_NAME}`
  //     },
  //     plugins: plugins
  // },
  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))
    // 移除 prefetch 插件,减少首次加载的网络请求
    config.plugins.delete('prefetch');
    // 移除 preload 插件,减少首次加载的网络请求
    config.plugins.delete('preload');
    // config.optimization.minimize(true)
  }
}

module.exports = vueConfig
