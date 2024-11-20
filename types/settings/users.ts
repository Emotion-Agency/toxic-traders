export interface iOrder {
  id: number
  symbol: string
  description: string
  lotN: number
  lotA: number
  lotT: number
  slppN: number
  slppA: number
  slppT: number
  profN: number
  profA: number
  profT: number
  sl: number
  whenBE: number
  whereBE: number
  trailWhen: number
  trailStep: number
  reverse: boolean
  spread: number
  timer: number
  usePairSuffix: boolean
}

export interface iTradingAccount {
  id: number
  name: string
  login: string
  password: string
  symbolSpec: string
  brokerName: string
  brokerServer: string
  brokerServerType: number
  placedTypeMt4: number
  placedTypeMt5: number
  // orders: iOrder[]
}

export interface iClient {
  id: number
  tradingAccounts: iTradingAccount[]
  connectionId: string
  ip: string
  clientName: string
  status: string
}

export interface iUser {
  user: {
    createdAt: string
    events: any
    clients: iClient[]
    tradingAccounts: iTradingAccount[]
    orders: iOrder[]
    createdUsers: iUser[]
    id: number
    userName: string
    normalizedUserName: string
    email: string
    normalizedEmail: string
    emailConfirmed: boolean
    passwordHash: string
    securityStamp: string
    concurrencyStamp: string
    phoneNumber: string
    phoneNumberConfirmed: boolean
    twoFactorEnabled: boolean
    lockoutEnd: string
    lockoutEnabled: boolean
    accessFailedCount: number
  }
  roles: string[]
}

export interface iCreatedUser {
  name: string
  email: string
  level: string
  attach: string
  access: boolean
}

export type TNewUserModalEmit = {
  (event: 'close'): void
  (event: 'create', user: iCreatedUser): void
}
