import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  devServer: {
    port: 9000,
    proxy: {
      "/api": {//地址中以api开头的
        target: "<url>", //转发地址
        ws: true,//代理 websockets
        changeOrigin: true,//允许跨域
        pathRewrite: {//对象/函数，重写目标的url路径。对象键将用作RegExp以匹配路径。
          '^/old/api' : '/new/api'
        }
      },
      "/foo": {//地址中以foo开头的
        target: "<other_url>",//转发地址
      },
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
