export interface iSearchInput {
  title?: string
  required?: boolean
  id: string
  name: string
  type: string
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

export interface iAccountModalItem {
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
  isPassword?: boolean
}
