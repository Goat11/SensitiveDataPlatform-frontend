import request from '@/utils/request'

// 数据相关接口
const userApi = {
    MedInsurance: '/api/medical/insurance',
    MedicalList: '/api/medical/medicalList',
    MedPatientInfo: '/api/medical/patientInfo',
    ShopOrderList: 'api/shopping/orderList',
    ShopUserList: '/api/shopping/userList',
    ShopPayList: '/api/shopping/payList?token=eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqViotTi3ydFGyUipOziuNrypR0lEqLk0C8tNL8-PzMkvjcxOBQpmJJUpWhmYWpiamJoYGRjpKqRUFEAFTEwNTA6NaAAAAAP__.4eTqP0N6wU8lv4vD0L8A3gszaoH_xIyn-zplHmyRP7Y',
    StuRewardPunishment: '/api/stuInfo/rewardPunishment?token=eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqViotTi3ydFGyUipOziuNrypR0lEqLk0C8tNL8-PzMkvjcxOBQpmJJUpWhmYWpiamJoYGRjpKqRUFEAFTEwNTA6NaAAAAAP__.4eTqP0N6wU8lv4vD0L8A3gszaoH_xIyn-zplHmyRP7Y',
    StuScoreList: '/api/stuInfo/scoreList',
    StuStatus: '/api/stuInfo/status?token=eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqViotTi3ydFGyUipOziuNrypR0lEqLk0C8tNL8-PzMkvjcxOBQpmJJUpWhmYWpiamJoYGRjpKqRUFEAFTEwNTA6NaAAAAAP__.4eTqP0N6wU8lv4vD0L8A3gszaoH_xIyn-zplHmyRP7Y',
    StuInfoList: '/api/stuInfo/infoList?token=eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqViotTi3ydFGyUipOziuNrypR0lEqLk0C8tNL8-PzMkvjcxOBQpmJJUpWhmYWpiamJoYGRjpKqRUFEAFTEwNTA6NaAAAAAP__.4eTqP0N6wU8lv4vD0L8A3gszaoH_xIyn-zplHmyRP7Y'

}

export function getMedInsurance(parameter) {
  return request({
    url: userApi.MedInsurance,
    method: 'get',
    params: parameter
  })
}
