import request from '@utils/request'

export const reqSendCode = (phone) => {
  return request({
    method: 'POST',
    url: '/login/digits',
    data: {phone}
  })
}

export const reqLoginByPhone = (phone, code) => {
  return request({
    method: 'POST',
    url: '/login/phone',
    data: {phone, code}
  })
}

export const reqPwdLogin = (phone, password) => {
  return request({
    method: 'POST',
    url: '/login/user',
    data: {phone, password}
  })
}
