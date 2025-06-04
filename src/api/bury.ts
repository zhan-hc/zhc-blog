import { BuryReportType } from '@/constants/types'
import MyRequest from '@/services/index'

export const report = (data: BuryReportType) => {
  return MyRequest.request({
    url: '/bury/report',
    method: 'POST',
    data
  })
}

export const reportVisitor = (data: any) => {
  return MyRequest.request({
    url: '/visitor/addRecord',
    method: 'POST',
    data
  })
}