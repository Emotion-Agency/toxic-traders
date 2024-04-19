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
  value: string
  error: boolean
}

export interface iCountriesFlagItem {
  flagFullName: string
  flagShortName: string
  flagImg: {
    url: string
    alt: string
  }
}
