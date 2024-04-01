export interface iCompanyNamesItem {
  brokerId: number
  companyNames: string[]
}

export interface iCompanyNamesData {
  data: {
    companyNames: iCompanyNamesItem[]
  }
}
