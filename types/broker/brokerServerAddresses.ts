export interface iServerAddress {
  id: number
  address: string
}

export interface iServerAddressesData {
  data: {
    addresses: iServerAddress[]
  }
}
