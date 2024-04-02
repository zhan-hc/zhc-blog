import { useRoute } from "vue-router"
import { useRouter } from 'vue-router'

export default function () {

  const route = useRoute()
  const router = useRouter()
  
  const getRouterParams = (key: string) => {
    return route.params[key]
  }

  const routerGo = ( path: string, way: string = 'push') => {
    switch(way) {
      case 'push': 
        router.push(path);
        break;
      case 'replace': 
        router.replace(path);
        break;
      case 'back': 
        router.back();
        break;
      default: 
        break;
    }
  }

  const openWindow = (url: any) => {
    window.open(url)
  }

  return {
    getRouterParams,
    routerGo,
    openWindow
  }
}