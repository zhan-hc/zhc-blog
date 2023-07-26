import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from "path"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  server: {
    port: 4000, // 设置服务启动端口号
    // open: true, // 设置服务启动时是否自动打开浏览器
    // cors: true, // 允许跨域
    proxy: {
      '/api': {
        target: 'http://43.138.89.227:3000',
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 图标文件夹为src/assets/icons
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
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
