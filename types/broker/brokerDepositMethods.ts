export interface iDepositMethodItem {
  depositMethod: number
}

export interface iDepositMethodsData {
  data: {
    depositMethods: iDepositMethodItem[]
  }
}
