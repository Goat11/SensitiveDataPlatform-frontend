import request from '@/utils/request'

// 日志相关接口
const userApi = {
  getList: '/api/log/getList'
}

// /**
//  * 获取单条日志详细内容
//  * @returns {AxiosPromise}
//  */
// export function syslogGetOne (parameter) {
//   return request({
//     url: syslogApi.GetOne,
//     method: 'get',
//     params: parameter
//   })
// }

/**
 * 分页获取日志内容
 * @returns {AxiosPromise}
 */
export function getList(parameter) {
  return request({
    url: userApi.getList,
    method: 'get',
    params: parameter
  })
}

// /**
//  * 删除日志内容
//  * @returns {AxiosPromise}
//  */
// export function syslogDelete (parameter) {
//   return request({
//     url: syslogApi.Delete,
//     method: 'delete',
//     params: parameter
//   })
// }

// /**
//  * 导出日志内容——获取文件名
//  * @returns {AxiosPromise}
//  */
// export function syslogExport () {
//   return request({
//     url: syslogApi.Export,
//     method: 'get'
//   })
// }

// /**
//  * 下载日志——根据文件名
//  * @returns {AxiosPromise}
//  */
// export function syslogDownload (parameter) {
//   return request({
//     url: syslogApi.Download,
//     method: 'get',
//     params: parameter,
//     // 收到的数据为blob
//     responseType: 'blob'
//   })
// }
