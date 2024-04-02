import { BuryReportType } from '@/constants/types'
import MyRequest from '@/services/index'

export const report = (data: BuryReportType) => {
  return MyRequest.request({
    url: '/bury/report',
    method: 'POST',
    data
  })
}