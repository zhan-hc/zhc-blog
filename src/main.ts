import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store'
import '@/assets/style/main.css'
import '@/assets/style/index.scss'
import 'virtual:svg-icons-register'
import { imgError } from './utils/directive'

const app = createApp(App)
app.use(router)
app.use(store)
app.directive('imgErr', imgError)
app.mount('#app')
