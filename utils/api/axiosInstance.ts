import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://toxictraders.com:5001/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
})

axiosInstance.interceptors.response.use(
  res => {
    return res
  },

  error => {
    if (!error.response || error.response.status !== 400) {
      console.error('Error:', error)
    }

    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use(config => {
  if (!import.meta.client) {
    return config
  }
  const token = localStorage?.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
