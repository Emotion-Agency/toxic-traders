export interface iBrokerServerAccountOrder {
  login: string
  openTime: string
  ticket: number
  type: number
  comment: string
}

export interface iBrokerServerAccountOrdersData {
  data: iBrokerServerAccountOrder[]
}
