import request from '@/utils/request'

// 数据相关接口
const userApi = {
    MedInsurance: '/api/medical/insurance',
    MedicalList: '/api/medical/medicalList',
    MedPatientInfo: '/api/medical/patientInfo',
    ShopOrderList: 'api/shopping/orderList',
    ShopUserList: '/api/shopping/userList',
    ShopPayList: '/api/shopping/payList',
    StuRewardPunishment: '/api/stuInfo/rewardPunishment',
    StuScoreList: '/api/stuInfo/scoreList',
    StuStatus: '/api/stuInfo/status',
    StuInfoList: '/api/stuInfo/infoList',
    AllDatabase: '/api/databases',
    AllTable: '/api/DB_tables',
    TableData: '/api/database/getList'
//    UploadData: '/api/database/upload',
}

export function getTableData(parameter) {
  return request({
    url: userApi.TableData,
    method: 'get',
    params: parameter
  })
}

export function getAllDatabase(parameter) {
  return request({
    url: userApi.AllDatabase,
    method: 'get',
    params: parameter
  })
}

export function getAllTable(parameter) {
  return request({
    url: userApi.AllTable,
    method: 'get',
    params: parameter
  })
}

export function getMedInsurance(parameter) {
  return request({
    url: userApi.MedInsurance,
    method: 'get',
    params: parameter
  })
}

export function getMedicalList(parameter) {
  return request({
    url: userApi.MedicalList,
    method: 'get',
    params: parameter
  })
}

export function getMedPatientInfo(parameter) {
  return request({
    url: userApi.MedPatientInfo,
    method: 'get',
    params: parameter
  })
}

export function getShopOrderList(parameter) {
  return request({
    url: userApi.ShopOrderList,
    method: 'get',
    params: parameter
  })
}

export function getShopUserList(parameter) {
  return request({
    url: userApi.ShopUserList,
    method: 'get',
    params: parameter
  })
}

export function getShopPayList(parameter) {
  return request({
    url: userApi.ShopPayList,
    method: 'get',
    params: parameter
  })
}

export function getStuRewardPunishment(parameter) {
  return request({
    url: userApi.StuRewardPunishment,
    method: 'get',
    params: parameter
  })
}

export function getStuScoreList(parameter) {
  return request({
    url: userApi.StuScoreList,
    method: 'get',
    params: parameter
  })
}

export function getStuStatus(parameter) {
  return request({
    url: userApi.StuStatus,
    method: 'get',
    params: parameter
  })
}

export function getStuInfoList(parameter) {
  return request({
    url: userApi.StuInfoList,
    method: 'get',
    params: parameter
  })
}
