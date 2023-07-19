import { useClipboard } from "@vueuse/core";
import { acountType } from '@/constants/types';
import { operateType } from "../../constants/types";

export default function () {
const { copy, isSupported } = useClipboard()

/**
 * 账号点击
 * @param item 
 */
const accountClick = (item: acountType) => {
  switch(item.type) {
    case operateType.OPEN:
      window.open(item.url)
      break;
    case operateType.COPY:
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