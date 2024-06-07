export interface iBrokerCompanyName {
  id: number
  companyName: string
  website: string
  domainCreateDateTime: string | null
}

export interface iTrafficHistory {
  date: string
  organic: number
}

export interface iTopCountry {
  country: string
  share: number
}

export interface iBrokerCompanyNameStatisticAhrefs {
  trafficHistory: iTrafficHistory[]
  trafficMonthlyAvg: string
  trafficMonthlyCost: string
  topCountries: iTopCountry[]
  id: number
  parsingTimestamp: string
  webSite: string
  brokerCompanyNameId: number
  brokerCompanyName: iBrokerCompanyName
}

export interface iIdentifier {
  uuid: string
}

export interface iLocationIdentifier extends iIdentifier {
  value: string
  permalink: string
  entity_def_id: string
}

export interface iLocation {
  identifier: iIdentifier
  visits_mom_pct: number | null
  uuid: string
  rank: number
  rank_mom_pct: number | null
  location_identifiers: iLocationIdentifier[]
  visits_pct: number
}

export interface iBrokerCompanyNameStatisticSemrush {
  organicSearchTraffic: string
  globalRank: number
  locationList: iLocation[]
  lastUpdated: string
  id: number
  parsingTimestamp: string
  webSite: string
  brokerCompanyNameId: number
  brokerCompanyName: iBrokerCompanyName
}

export interface iEngagements {
  Month: string
  Year: string
  Visits: string
}

export interface iCountryRank {
  Country: number
  CountryCode: string
  Rank: number
}

export interface iCategoryRank {
  Rank: string
  Category: string
}

export interface iTopCountryShare {
  Country: number
  CountryCode: string
  Value: number
}

export interface iBrokerCompanyNameStatisticSimilarWeb {
  engagments: iEngagements
  engagmentsVisists: string
  estimatedMonthlyVisits: string
  globalRank: number
  countryRank: iCountryRank
  categoryRank: iCategoryRank
  globalCategoryRank: string | null
  topCountryShares: iTopCountryShare
  lastUpdated: string
  id: number
  parsingTimestamp: string
  webSite: string
  brokerCompanyNameId: number
  brokerCompanyName: iBrokerCompanyName
}

export interface iStatisticCurrentProviderData {
  data: {
    brokerCompanyNameStatistic:
      | iBrokerCompanyNameStatisticAhrefs[]
      | iBrokerCompanyNameStatisticSemrush[]
      | iBrokerCompanyNameStatisticSimilarWeb[]
  }
}

export interface iStatisticProviderData {
  data: {
    providerNames: string[]
  }
}
