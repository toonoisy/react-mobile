import request from '@utils/request'

export const reqVerifyPhone = (phone) => {
  return request({
    method: 'POST',
    url: '/regist/verify_phone',
    data: {phone},
  })
}

export const reqVerifyCode = (phone, code) => {
  return request({
    method: 'POST',
    url: '/regist/verify_code',
    data: {phone, code},
  })
}

export const reqRegister = (phone, password) => {
  return request({
    method: 'POST',
    url: '/regist/user',
    data: {phone, password},
  })
}
