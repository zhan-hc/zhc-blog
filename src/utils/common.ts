import dayjs from 'dayjs'

/**
 * 
 * @param url 用相对路径
 * @returns 
 */
export function getImageUrl (url:string) {
    return new URL('../' + url, import.meta.url).href
}

export const formatDate = (time: any, formatStr: string = 'YYYY-MM-DD hh:mm:ss') => {
    return dayjs(time).format(formatStr)
  }