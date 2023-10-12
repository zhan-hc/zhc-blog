import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from "path"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default  ({ mode }) => { 
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  return defineConfig({
    server: {
      port: 4000, // 设置服务启动端口号
      // open: true, // 设置服务启动时是否自动打开浏览器
      // cors: true, // 允许跨域
      proxy: {
        '/blogApi': {
          target: process.env.VITE_API_HOST,
          changeOrigin: true, //是否跨域
          rewrite: (path) => path.replace(/^\/blogApi/, '')
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
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/mixins.scss" as *;'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      },
    },
    base: './'
  })
}
