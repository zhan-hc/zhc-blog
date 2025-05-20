import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store'
import '@/assets/style/main.css'
import '@/assets/style/index.scss'
import 'virtual:svg-icons-register'
import { imgError } from './utils/directive'
import JanusBury from 'janus-bury'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(JanusBury, {
  appName: 'zhc-blog',
  server_url: 'https://www.janus-c.top/blog/event/report'
})
app.directive('imgErr', imgError)
app.mount('#app')
