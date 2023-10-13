import { useClipboard } from "@vueuse/core"
import { AcountType } from '@/constants/types'
import { OperateType } from "../../constants/types"

export default function () {
const { copy, isSupported } = useClipboard()

/**
 * 账号点击
 * @param item 
 */
const accountClick = (item: AcountType) => {
  switch(item.type) {
    case OperateType.OPEN:
      window.open(item.url)
      break;
    case OperateType.COPY:
      handleCopy(item.url)
      break;
    default:
      break;
      
  }
}
/**
 * 复制功能
 * @param url 
 * @returns 
 */
const handleCopy = (url: string) => {
  if (!isSupported) {
    console.log('您的浏览器不支持Clipboard API')
    return
  }
  copy(url)
};
  return {
    accountClick,
    handleCopy
  }
}