export interface iInputData {
  id: string
  value: string
  error: boolean
}

export interface IInput {
  required?: boolean
  id: string
  name?: string
  type?: string
  disabled?: boolean
  placeholder?: string
  autoFocus?: boolean
  validators?: Array<(value: string) => boolean | string>
}

export interface IInputContext extends IInput {
  error: boolean | string
  value: any
}

export type TInputEmits = {
  (event: 'input', value: iInputData): void
  (event: 'focus'): void
  (event: 'blur'): void
  (event: 'error', error: string): void
}

export interface ICheckbox
  extends Omit<IInput, 'type' | 'placeholder' | 'validators'> {}

export interface iCheckboxData {
  id: string
  checked: boolean
  error: boolean
}

export type TCheckboxEmits = {
  (event: 'change', value: iCheckboxData): void
}

export interface iSelectData {
  id: string
  value: string | number
  label: string
  error: boolean
}

export interface ISelect {
  as?: string
  id: string
  disabled?: boolean
  required?: boolean
  autoFocus?: boolean
  name?: string
  validators?: Array<(value: string) => boolean | string>
}

export interface IOption {
  value: string
  label: string
}

export interface ISelectOption extends IOption {
  el: Ref<HTMLElement>
}

export type TSelectEmits = {
  (event: 'change', value: iSelectData | iSelectData[]): void
  (event: 'error', error: string): void
}
