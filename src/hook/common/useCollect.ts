import { report } from "@/api/bury"
import Fingerprint2 from 'fingerprintjs2'
import { ref } from "vue"

export default function () {
  const userId = ref()
  const getUserId = () => {
    return new Promise((resolve) => {
      Fingerprint2.get(function (components:any) {
        const values = components.map((component:any) => component.value) // 配置的值的数组
        const murmur = Fingerprint2.x64hash128(values.join(''), 31) // 生成浏览器指纹
        resolve(murmur)
      })
    })
  }
  const reportEvent = async (eventName: string, { type = 'click', common = '' } = {}) => {
    if (!userId.value) {
      userId.value = await getUserId()
    }
    report({
      event_name: eventName,
      event_type: type,
      page_url: window.location.href,
      timestamp: +new Date(),
      user_id: userId.value,
      common
    })
  }

  return {
    getUserId,
    reportEvent
  }
}