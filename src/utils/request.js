import axios from 'axios'

const request = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {}
})

request.interceptors.request.use((config) => {

  return config
})
request.interceptors.response.use(
  (res) => {
    const result = res.data
    if (result.code === 20000) {
      return result.data
    } else {
      return Promise.reject(result.message)
    }
  },
  (err) => {
    return Promise.reject(err.message)
  }
)

export default request

