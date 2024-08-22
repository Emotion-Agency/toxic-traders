import type {
  iSearchBrokerParams,
  IBrokerSearchParams,
} from '~/types/broker/broker'

const getServerType = (serverType: string) => {
  if (serverType === 'MT4') {
    return 0
  }

  if (serverType === 'MT5') {
    return 1
  }

  return -1
}

const getServerTimezone = (timezone: string): number => {
  // if (!timezone.includes()) {
  //   return -1
  // }
  // return 'number'
  return -1
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
    companyName: getParameter('name') || '*',
    category: getParameter('category'),
    locationServers: getParameter('location-servers'),
    addressCompany: getParameter('address-company'),
    website: getParameter('websites'),
    serverType: getServerType(getParameter('server-type')),
    regulator: Number(getParameter('regulator') || -1),
    platforms: Number(getParameter('platforms') || -1),
    depositMethods: Number(getParameter('method-of-deposits') || -1),
    leverage: Number(getParameter('leverage') || -1),
    serverTimezone: getServerTimezone(getParameter('server-timezone')),
    symbolName: getParameter('currency-symbol'),
    description: getParameter('description'),
    digits: Number(getParameter('digits') || -1),
    contractSize: Number(getParameter('contract-size') || -1),
    fillPolicy: Number(getParameter('fillpolicy') || -1),
    execution: Number(getParameter('executiontype-mt4') || -1),
    executionType: Number(getParameter('executiontype-mt5') || -1),
    brokerServersMT4ServerNames: getParameter('mt4-servernames'),
    brokerServersMT5ServerNames: getParameter('mt5-servernames'),
  }

  console.log(obj)

  return deleteFalseProperties(obj) as unknown as iSearchBrokerParams
}
