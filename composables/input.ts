import { clamp } from '~/utils/ea'
import validator from '~/utils/Validation'

export interface iInputData {
  id: string
  value: string
  error: boolean
}

export const useInput = (emit, props) => {
  const inputValue = ref(props.value ?? '')
  const numberInputSave = ref('')
  const isInputChanged = ref(false)
  const inputBlur = ref(false)
  const error = ref(false)
  const $input = ref(null)
  const isPasswordVisible = ref(false)

  const inputType = computed(() => {
    if (props.type === 'password') {
      return isPasswordVisible.value ? 'text' : 'password'
    }

    return props.type
  })

  watch(
    () => props.value,
    () => {
      inputValue.value = props.value
      updateFields()
    }
  )

  const onFocus = () => {
    if (
      props.type === 'number' &&
      typeof props.min === 'number' &&
      typeof props.max === 'number'
    ) {
      numberInputSave.value = inputValue.value
      inputValue.value = ''
    }
    inputBlur.value = true
    emit('inputFocus', {
      id: props.id,
      value: inputValue.value.toString(),
      error: error.value,
    })
  }

  const onBlur = () => {
    if (
      props.type === 'number' &&
      typeof props.min === 'number' &&
      typeof props.max === 'number'
    ) {
      if (!isInputChanged.value) {
        inputValue.value = numberInputSave.value
      }
      isInputChanged.value = false
      numberInputSave.value = ''

      emit('inputBlur', {
        id: props.id,
        value: inputValue.value.toString(),
        error: error.value,
      })
    }

    if (props.type !== 'number') {
      emit('inputBlur', {
        id: props.id,
        value: inputValue.value,
        error: error.value,
      })
    }
    inputBlur.value = false
  }

  const updateFields = () => {
    if (props.type === 'number') {
      if (inputValue.value) {
        // onFocus()
        // $input.value.focus()
        emit('inputValue', {
          id: props.id,
          value: inputValue.value.toString(),
          error: error.value,
        })
      }
    }

    if (props.type !== 'number') {
      if (inputValue.value.trim() !== '') {
        // onFocus()
        // $input.value.focus()
        emit('inputValue', {
          id: props.id,
          value: inputValue.value,
          error: error.value,
        })
      }
    }
  }

  const onPasswordVisibilityChange = () => {
    isPasswordVisible.value = !isPasswordVisible.value
  }

  const validate = () => {
    if (props.validators) {
      const falsyValidator = props.validators.find(validator =>
        validator(inputValue.value)
      )

      if (falsyValidator) {
        error.value = falsyValidator(inputValue.value)
      } else {
        error.value = false
      }
    }
  }

  const onInput = () => {
    validate()

    if (
      props.type === 'number' &&
      typeof props.min === 'number' &&
      typeof props.max === 'number'
    ) {
      isInputChanged.value = true
      inputValue.value = clamp(+inputValue.value, props.min, props.max)
    }

    emit('inputValue', {
      id: props.id,
      value: inputValue.value,
      error: error.value,
    })
  }

  const throwError = () => {
    validate()
    if (error.value) {
      inputBlur.value = true
      error.value = true
      $input.value.focus()
    }
  }

  const reset = () => {
    inputValue.value = ''
    error.value = false
    onBlur()
    updateFields()
  }

  const resetSearch = () => {
    reset()
    emit('inputValue', {
      id: props.id,
      value: '',
      error: error.value,
    })
  }

  onMounted(() => {
    updateFields()
  })

  return {
    inputValue,
    inputBlur,
    error,
    $input,
    onFocus,
    onBlur,
    onInput,
    reset,
    resetSearch,
    throwError,
    onPasswordVisibilityChange,
    isPasswordVisible,
    inputType,
  }
}
