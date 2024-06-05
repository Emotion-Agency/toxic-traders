import type {
  iSearchBrokerParams,
  IBrokerSearchParams,
} from '~/types/broker/broker'

export const brokerSearchAdapter = (
  params: IBrokerSearchParams
): iSearchBrokerParams => {
  const getParameter = (id: string) => {
    return params.data.find(item => item.id === id)?.value ?? ''
  }

  return {
    searchResultPage: params.offset,
    searchResultPageSize: params.count,
    sortBy: params.sortBy ?? 'companyNames',
    sortOrder: params.sortOrder ?? 1,
    companyName: getParameter('name'),
    category: getParameter('category'),
    locationServers: getParameter('location-servers'),

    addressCompany: getParameter('address-company'),
    website: getParameter('websites'),
    serverType: -1,
    regulator: -1,
    platforms: -1,
    depositMethods: -1,
    leverage: -1,
    serverTimezone: -1,
    symbolName: '',
    description: '',
    digits: -1,
    contractSize: -1,
    fillPolicy: -1,
    executionType: -1,
    execution: -1,
  }
}
