import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://51.89.153.73:5001/Api/',
  // timeout: 1000,
})

export default axiosInstance
