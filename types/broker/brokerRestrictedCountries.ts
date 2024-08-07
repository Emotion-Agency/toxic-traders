export interface iRestrictedCountriesItem {
  countryCode: number
}

export interface iRestrictedCountriesData {
  data: {
    restrictedCountries: iRestrictedCountriesItem[]
  }
}

export interface iRestrictedCountriesListData {
  data: {
    [key: number]: string
  }
}
