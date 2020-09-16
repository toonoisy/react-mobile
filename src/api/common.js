import request from '@utils/request'

export const reqCountryData = () => {
  return request.get('/common/countryData')
}