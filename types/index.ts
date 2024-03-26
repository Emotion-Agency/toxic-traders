export interface iSearchItem {
  title: string
  required?: boolean
  id?: string
  name?: string
  type?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  isLeftButton?: boolean
  isRightButton?: boolean
  options?: string[]
}

export interface iInput {
  id: string
  value: string | number
  error: boolean
}

export interface iReviewsForexPeaceArmy {
  forexPeaceArmyRating: string
  forexPeaceArmyCount: string
}

export interface iReviewsFx123 {
  fx123Rating: string
  fx123Count: string
}

export interface iReviewsTrustPilot {
  trustPilotRating: string
  trustPilotCount: string
}

export interface iReviewsWikifx {
  wikifxRating: string
  wikifxCount: string
}
