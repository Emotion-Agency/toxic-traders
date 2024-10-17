import { jwtDecode } from 'jwt-decode'
import { loginRequest } from '~/utils/api/auth/login'

type TUser = {
  email: string
  nameid: string
  role: string
}

export const useAuth = () => {
  const user = useState<TUser>('user', () => null)
  const token = useState('token', () => null)

  const { addToast } = useToasts()

  const router = useRouter()
  const route = useRoute()

  const login = async (email: string, password: string) => {
    try {
      const data = await loginRequest(email, password)
      if (!data?.token) {
        throw new Error('Token not found')
      }

      const oneMonth = 60 * 60 * 24 * 30 * 1000

      const tokenExpiring = (new Date().getTime() + oneMonth).toString()

      const decoded = jwtDecode(data?.token)

      localStorage.setItem('token_expiring', tokenExpiring)
      localStorage.setItem('token', data?.token)

      token.value = data?.token

      user.value = decoded as TUser
    } catch (error) {
      addToast({
        text: error.message,
        color: ToastColor.danger,
      })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token_expiring')
    localStorage.removeItem('token')

    token.value = null
    user.value = null

    if (!route.path.startsWith('/auth')) {
      router.push('/auth/login')
    }
  }

  const checkAuth = () => {
    const lsTokenExpiring = localStorage.getItem('token_expiring')
    const lsToken = localStorage.getItem('token')

    if (!lsTokenExpiring || !lsToken) {
      logout()
      return
    }

    const now = new Date().getTime()

    if (now > parseInt(lsTokenExpiring)) {
      logout()
    } else {
      const decoded = jwtDecode(lsToken)

      user.value = decoded as TUser
      token.value = lsToken
    }
  }

  const isAuthenticated = computed(() => {
    return !!token.value
  })

  return { login, logout, checkAuth, isAuthenticated, user, token }
}
