import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://toxictraders.com:5001/Api/',
  // timeout: 1000,
})

export default axiosInstance
