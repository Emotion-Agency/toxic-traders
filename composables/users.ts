import type { iUser } from '~/types/settings/users'
import {
  registerRequest,
  type IRegisterRequest,
} from '~/utils/api/auth/register'
import { getUserByIdRequest } from '~/utils/api/auth/user'

export const useUsers = () => {
  const user = useState<iUser>('user', () => null)
  const users = computed<iUser[]>(() => user.value?.user?.createdUsers || [])

  const { toast } = useToasts()

  const fetchUser = async (id: number) => {
    try {
      const data = await getUserByIdRequest(id)
      user.value = data
    } catch (error) {
      toast.error(
        error?.message ||
          'An error occurred while fetching users. Please try again.'
      )

      throw error
    }
  }

  const createUser = async (params: IRegisterRequest) => {
    try {
      const data = await registerRequest(params)

      return data
    } catch (error) {
      toast.error(
        error?.message ||
          'An error occurred while creating user. Please try again.'
      )

      throw error
    }
  }

  return {
    user,
    users,
    fetchUser,
    createUser,
  }
}
