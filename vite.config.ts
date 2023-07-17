import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000, // 设置服务启动端口号
    // open: true, // 设置服务启动时是否自动打开浏览器
    // cors: true, // 允许跨域
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': { //apiTest是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
        target: 'http://192.168.0.6:3000',
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/style/variables.scss" as *;'
      }
    }
  },
  resolve: {
  alias: {
    '@': resolve(__dirname, './src')
  },
}
})
