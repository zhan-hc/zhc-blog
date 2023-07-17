import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routers from '@/routers/index';
import store from '@/store'

const app = createApp(App)
app.use(routers)
app.use(store)
app.mount('#app')
