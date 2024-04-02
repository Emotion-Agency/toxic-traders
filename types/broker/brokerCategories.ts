export interface iCategoriesItem {
  category: string
}

export interface iCategoriesData {
  data: {
    brokerCategories: iCategoriesItem[]
  }
}

export interface iCategoriesListData {
  data: {
    uniqueBrokerCategories: string
  }
}
