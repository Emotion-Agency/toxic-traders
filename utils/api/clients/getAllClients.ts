import type {
  IClientData,
  IGetAllClientsPayload,
} from '~/types/clients/clients'
import axiosInstance from '../axiosInstance'

export const getAllClientsRequest = async (
  payload?: IGetAllClientsPayload
): Promise<IClientData> => {
  const { data } = await axiosInstance.get<IClientData>('/Clients', {
    ...(payload && {
      params: {
        page: payload.page,
        count: payload.count,
        sort: payload.sortBy ?? 'id',
        sortOrder: payload.sortOrder ?? 0,
      },
    }),
  })

  return data
}
