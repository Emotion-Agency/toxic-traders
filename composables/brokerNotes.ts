import {
  createBrokerNotes,
  deleteBrokerNotes,
  getBrokerNotes,
  updateBrokerNotes,
} from '~/api/brokers/brokerNotes'

export const useBrokerNotes = () => {
  const getNotes = async (brokerId: number) => {
    try {
      const data = await getBrokerNotes(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const updateNotes = async (brokerId: number, notes: string) => {
    try {
      const data = await updateBrokerNotes(brokerId, notes)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const createNotes = async (brokerId: number, notes: string) => {
    try {
      const data = await createBrokerNotes(brokerId, notes)

      return data
    } catch (error) {
      // alert with error
    }
  }

  const deleteNotes = async (brokerId: number) => {
    try {
      const data = await deleteBrokerNotes(brokerId)

      return data
    } catch (error) {
      // alert with error
    }
  }

  return { getNotes, updateNotes, deleteNotes, createNotes }
}
