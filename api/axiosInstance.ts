import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://toxictraders.ca:5001/Api',
  // timeout: 1000,
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

export default axiosInstance
