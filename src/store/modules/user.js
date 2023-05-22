import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import { login, getInfo, logout } from '@/api/login_api'
import { ACCESS_TOKEN } from '@/store/mutation-types'

storage.addPlugin(expirePlugin)
const user = {
  state: {
    token: '',
    name: '',
    userID: '',
    roleType: '',
    email: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_USERID: (state, userID) => {
      state.userID = userID
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_ROLETYPE: (state, roleType) => {
      state.roleType = roleType
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.status === 1) {
            const result = response.data
            console.log(result.token)
            storage.set(ACCESS_TOKEN, result.token, new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            resolve(response)
          } else {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // 请求后端获取用户信息 /api/user/info
        const tmp = {}
        tmp['token'] = storage.get(ACCESS_TOKEN)
        console.log(tmp)
        getInfo(tmp).then(response => {
          if (response.status === 1) {
            // // 新增
            // // 覆盖响应体的 role, 供下游使用
            // result.role = role
            const result = response.data
            commit('SET_USERID', result.userID)
            commit('SET_EMAIL', result.email)
            commit('SET_ROLETYPE', result.roleType)
            let role = {}
            if (result.roleType === 0 || result.roleType === '0') {
              role = { id: 'admin', name: '管理员', permissions: [{ 'roleId': 'admin', 'permissionId': 'admin' }] }
              role.permissionList = ['home', 'userManage', 'userManage_admin', 'dataManage', 'dataManage_DataTrusteeship', 'dataManage_DataDetail', 'audit']
            } else if (result.roleType === 1 || result.roleType === '1') {
              role = { id: 'user', name: '授权用户', permissions: [{ 'roleId': 'user', 'permissionId': 'user' }] }
              role.permissionList = ['home', 'userManage', 'userManage_user', 'dataManage', 'dataManage_DataTrusteeship', 'dataManage_DataDetail']
            } else if (result.roleType === 2 || result.roleType === '2') {
              role = { id: 'visit', name: '访客', permission: [{ 'roleId': 'visit', 'permissionId': 'visit' }] }
              role.permissionList = ['home', 'userManage', 'userManage_user', 'dataManage', 'dataManage_DataDetail']
            }
            commit('SET_ROLES', role)
            result.role = role
            console.log('12317' + result)
            // 下游
            resolve(result)
          } else {
            reject(response.msg)
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
        }).finally(() => {
        })
      })
    }

  }
}

export default user
