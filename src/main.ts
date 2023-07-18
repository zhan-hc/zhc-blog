import { createApp } from 'vue'
import App from './App.vue'
import routers from '@/routers/index'
import store from '@/store'
import 'normalize.css'
import '@/assets/icon/iconfont.css'
import '@/assets/style/index.scss'

const app = createApp(App)
app.use(routers)
app.use(store)
app.mount('#app')
