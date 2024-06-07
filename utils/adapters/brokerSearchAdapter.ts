import type {
  iSearchBrokerParams,
  IBrokerSearchParams,
} from '~/types/broker/broker'

const getServerType = (serverType: string) => {
  return serverType === 'MT4' ? 0 : 1
}

export const brokerSearchAdapter = (
  params: IBrokerSearchParams
): iSearchBrokerParams => {
  const getParameter = (id: string) => {
    return params.data.find(item => item.id === id)?.value ?? ''
  }

  const obj = {
    searchResultPage: params.offset,
    searchResultPageSize: params.count,
    sortBy: params.sortBy ?? 'companyNames',
    sortOrder: params.sortOrder ?? 1,
    companyName: getParameter('name'),
    category: getParameter('category'),
    locationServers: getParameter('location-servers'),
    addressCompany: getParameter('address-company'),
    website: getParameter('websites'),
    serverType: getServerType(getParameter('server-type')),
    regulator: -1,
    platforms: -1,
    depositMethods: -1,
    leverage: Number(getParameter('leverage') || -1),
    serverTimezone: -1,
    symbolName: getParameter('scurrency-symbol'),
    description: getParameter('description'),
    digits: Number(getParameter('digits') || -1),
    contractSize: Number(getParameter('contract-size') || -1),
    fillPolicy: -1,
    executionType: -1,
    execution: -1,
  }

  return deleteFalseProperties(obj) as unknown as iSearchBrokerParams
}
