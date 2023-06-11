import request from '@/utils/request'

const userApi = {
    Login: '/api/user/login',
    Forget: '/api/user/personal/password/reset',
    Logout: '/hello',
    Register: '/api/user/register',
    TokenLogin: '/api/user/tokenLogin',
    lastLoginIP: '/api/user/getIP',
    lastLoginTime: '/api/user/getTime'
}

export function login(parameter) {
    return request({
        url: userApi.Login,
        method: 'post',
        data: parameter
    })
}

export function register(parameter) {
    return request({
        url: userApi.Register,
        method: 'post',
        data: parameter
    })
}

export function forgetPass(parameter) {
    return request({
        url: userApi.Forget,
        method: 'post',
        data: parameter
    })
}

export function getInfo(parameter) {
    return request({
        url: userApi.TokenLogin,
        method: 'get',
        params: parameter
    })
}

export function logout() {
    return request({
        url: userApi.Logout,
        method: 'get'
    })
}

export function getIP(parameter) {
    return request({
        url: userApi.lastLoginIP,
        method: 'get',
        params: parameter
    })
}

export function getTime(parameter) {
    return request({
        url: userApi.lastLoginTime,
        method: 'get',
        params: parameter
    })
}
