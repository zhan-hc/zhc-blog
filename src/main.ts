import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store'
import '@/assets/style/main.css'
import '@/assets/style/index.scss'
import 'janus-ui/theme-chalk/index.css'
import 'virtual:svg-icons-register'
import { imgError } from './utils/directive'
import JanusUi from 'janus-ui'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(JanusUi)
app.directive('imgErr', imgError)
app.mount('#app')
