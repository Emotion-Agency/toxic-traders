import type {
  iSearchBrokerParams,
  IBrokerSearchParams,
} from '~/types/broker/broker'

export const brokerSearchAdapter: iSearchBrokerParams = (
  params: IBrokerSearchParams
) => {
  return {
    searchResultPage: params.offset,
    searchResultPageSize: params.count,
    sortBy: params.sortBy ?? 'companyNames',
    sortOrder: params.sortOrder ?? 1,
    companyName: '',
    category: '',
    locationServers: '',
    addressCompany: '',
    website: '',
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
