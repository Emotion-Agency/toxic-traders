import { getSortedBrokers } from '~/api/brokers/getSortedBrokers'
// import { getSortedLogs } from '~/api/brokers/getSortedLogs'

export const useBrokers = () => {
  const getAllBrokers = async () => {
    const data = await getSortedBrokers()

    return data
  }

  return { getAllBrokers }
}

// export const useLogs = () => {
//   const getAllLogs = async () => {
//     const data = await getSortedLogs()

//     return data
//   }

//   return { getAllLogs }
// }
