import type { iSearchInput } from '~/types'

export const useBrokerSearch = () => {
  const router = useRouter()
  const route = useRoute()

  const initialSearchItems: iSearchInput[] = [
    {
      title: 'Name',
      required: false,
      id: 'name',
      name: 'Name',
      type: 'text',
      value: (route.query?.name as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      id: 'category',
      name: 'Category',
      title: 'Category',
      placeholder: 'Placeholder',
      options: [],
      value: (route.query?.category as string) ?? '',
    },
    {
      title: 'Location Servers',
      required: false,
      id: 'location-servers',
      name: 'Location Servers',
      type: 'text',
      value: (route.query['location-servers'] as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      title: 'Address Company',
      required: false,
      id: 'address-company',
      name: 'Address Company',
      type: 'text',
      value: (route.query['address-company'] as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      title: 'Websites',
      required: false,
      id: 'websites',
      name: 'Websites',
      type: 'text',
      value: (route.query.websites as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      type: 'select',
      id: 'server-type',
      name: 'Servers',
      title: 'Servers (MT4 or MT5)',
      placeholder: 'Placeholder',
      options: ['MT4', 'MT5'],
      value: (route.query['server-type'] as string) ?? '',
    },
    {
      title: 'Regulator',
      required: false,
      id: 'regulator',
      name: 'Regulator',
      type: 'select',
      options: [],
      value: (route.query.regulator as string) ?? '',
      placeholder: 'Placeholder',
    },
    {
      title: 'Platforms',
      required: false,
      id: 'platforms',
      name: 'Platforms',
      type: 'select',
      options: [],
      value: (route.query.platforms as string) ?? '',
      placeholder: 'Placeholder',
    },
    {
      title: 'Method of Deposits',
      required: false,
      id: 'method-of-deposits',
      name: 'Method of Deposits',
      type: 'select',
      options: [],

      value: (route.query['method-of-deposits'] as string) ?? '',
      placeholder: 'Placeholder',
    },
    {
      title: 'Leverage',
      required: false,
      id: 'leverage',
      name: 'Leverage',
      type: 'number',
      value: (route.query.leverage as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      title: 'Server Timezone',
      required: false,
      id: 'server-timezone',
      name: 'Server Timezone',
      type: 'text',
      value: (route.query['server-timezone'] as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      title: 'Order ID Digits',
      required: false,
      id: 'order-id-digits',
      name: 'Order ID Digits',
      type: 'number',
      value: (route.query['order-id-digits'] as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      title: 'Currency (Symbol)',
      required: false,
      id: 'currency-symbol',
      name: 'Currency (Symbol)',
      type: 'text',
      value: (route.query['currency-symbol'] as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      title: 'Description',
      required: false,
      id: 'description',
      name: 'Description',
      type: 'text',
      value: (route.query.description as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      title: 'Digits',
      required: false,
      id: 'digits',
      name: 'Digits',
      type: 'number',
      value: (route.query.digits as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      title: 'Contract Size',
      required: false,
      id: 'contract-size',
      name: 'Contract Size',
      type: 'number',
      value: (route.query['contract-size'] as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      title: 'FillPolicy',
      required: false,
      id: 'fillpolicy',
      name: 'FillPolicy',
      type: 'select',
      options: [],
      value: (route.query.fillpolicy as string) ?? '',
      placeholder: 'Placeholder',
    },
    {
      title: 'ExecutionType (MT5)',
      required: false,
      id: 'executiontype-mt5',
      name: 'ExecutionType (MT5)',
      type: 'select',
      options: [],
      value: (route.query['executiontype-mt5'] as string) ?? '',
      placeholder: 'Placeholder',
    },
    {
      title: 'ExecutionType (MT4)',
      required: false,
      id: 'executiontype-mt4',
      name: 'ExecutionType (MT4)',
      type: 'select',
      options: [],
      value: (route.query['executiontype-mt4'] as string) ?? '',
      placeholder: 'Placeholder',
    },
    {
      title: 'MT4 ServerNames',
      required: false,
      id: 'mt4-servernames',
      name: 'MT4 ServerNames',
      type: 'text',
      value: (route.query['mt4-servernames'] as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
    {
      title: 'MT5 ServerNames',
      required: false,
      id: 'mt5-servernames',
      name: 'MT5 ServerNames',
      type: 'text',
      value: (route.query['mt5-servernames'] as string) ?? '',
      placeholder: 'Placeholder',
      disabled: false,
      isLeftButton: false,
      isRightButton: false,
    },
  ]

  const { getCategoriesList } = useBrokerCategories()
  const { getAllEnums } = useEnums()

  const getOptions = async () => {
    const {
      depositMethods,
      executionMT4,
      executionMT5,
      fillPolicy,
      platforms,
      regulators,
    } = await getAllEnums()

    const categoriesList = await getCategoriesList()

    searchItems.value = searchItems.value.map(item => {
      if (item.id === 'category') {
        item = {
          ...item,
          options: categoriesList,
        }
      }

      if (item.id === 'platforms') {
        item = {
          ...item,
          options: Object.values(platforms),
        }
      }
      if (item.id === 'method-of-deposits') {
        item = {
          ...item,
          options: Object.values(depositMethods),
        }
      }
      if (item.id === 'regulator') {
        item = {
          ...item,
          options: Object.values(regulators),
        }
      }
      if (item.id === 'fillpolicy') {
        item = {
          ...item,
          options: Object.values(fillPolicy),
        }
      }
      if (item.id === 'executiontype-mt4') {
        item = {
          ...item,
          options: Object.values(executionMT4),
        }
      }
      if (item.id === 'executiontype-mt5') {
        item = {
          ...item,
          options: Object.values(executionMT5),
        }
      }
      return item
    })
  }

  const searchItems = useState<iSearchInput[]>('searchItems', () =>
    deepClone(initialSearchItems)
  )

  const getEnumIdx = (item: iSearchInput) => {
    return item.options?.findIndex(option => option === item.value)?.toString()
  }

  const search = () => {
    const searchItemsWithEnums = searchItems.value.map(item => {
      if (item.id === 'platforms') {
        item = {
          ...item,
          value: getEnumIdx(item),
        }
      }
      if (item.id === 'method-of-deposits') {
        item = {
          ...item,
          value: getEnumIdx(item),
        }
      }
      if (item.id === 'regulator') {
        item = {
          ...item,
          value: getEnumIdx(item),
        }
      }
      if (item.id === 'fillpolicy') {
        item = {
          ...item,
          value: getEnumIdx(item),
        }
      }
      if (item.id === 'executiontype-mt4') {
        item = {
          ...item,
          value: getEnumIdx(item),
        }
      }
      if (item.id === 'executiontype-mt5') {
        item = {
          ...item,
          value: getEnumIdx(item),
        }
      }
      return item
    })

    const notEmptyItems = searchItems.value.filter(item => item.value)

    const searchObj = notEmptyItems.reduce((acc, item) => {
      return {
        ...acc,
        [item.id]: item.value,
      }
    }, {})

    const newQuery = { ...route.query }

    for (const item of searchItems.value) {
      if (!item.value) {
        delete newQuery[item.id]
      }
    }

    router.push({
      query: {
        ...newQuery,
        ...searchObj,
      },
    })

    return searchItemsWithEnums
  }

  const resetSearch = async () => {
    searchItems.value = searchItems.value.map(item => {
      return {
        ...item,
        value: '',
      }
    })
  }

  return { search, resetSearch, searchItems, getOptions }
}
