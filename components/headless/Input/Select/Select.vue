<script setup lang="ts">
import { useInputContext } from '~/composables/headless/inputContext'
import type {
  IOption,
  ISelect,
  ISelectOption,
  TSelectEmits,
} from '~/types/headless/input'

const props = withDefaults(defineProps<ISelect>(), {
  as: 'div',
})

const emit = defineEmits<TSelectEmits>()

const model = defineModel<IOption>()

const inputCtx = useInputContext()

if (inputCtx) {
  inputCtx.value = { ...inputCtx.value, ...props }
}

const isOpen = ref(false)
const options = reactive<ISelectOption[]>([])

const error = ref<boolean | string>(false)

const $selectContainer = ref(null)

provide('registerOption', (option: ISelectOption) => {
  // @ts-ignore
  options.push(option)
})
provide('selectOption', selectOption)
provide('selectedOption', model)
provide('isOpen', isOpen)

function toggleDropdown() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const validate = () => {
  if (props.validators) {
    const value = model.value?.value

    if (!value) {
      return
    }

    const falsyValidator = props.validators.find(validator => validator(value))

    if (falsyValidator) {
      error.value = falsyValidator(value)
      emit('error', error.value as string)
    } else {
      error.value = false
    }
  }
}

function selectOption(option: IOption) {
  model.value = option

  nextTick(() => {
    validate()

    emit('change', {
      value: option.value,
      label: option.label,
      id: props.id,
      error: !!error.value,
    })

    if (inputCtx) {
      inputCtx.value = {
        ...inputCtx.value,
        value: option,
        error: error.value,
      }
    }
  })
}

function handleOutsideClick(event: MouseEvent) {
  if (!$selectContainer.value.contains(event.target)) {
    isOpen.value = false
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
  if (event.key === 'ArrowDown') {
    const currentIndex = options.findIndex(
      option => option.value === model.value?.value
    )
    const nextIndex = currentIndex + 1
    const nextOption = options[nextIndex]

    if (nextOption) {
      model.value = nextOption
      nextOption.el.focus()
    }
  }

  if (event.key === 'ArrowUp') {
    const currentIndex = options.findIndex(
      option => option.value === model.value?.value
    )
    const prevIndex = currentIndex - 1
    const prevOption = options[prevIndex]

    if (prevOption) {
      model.value = prevOption
      prevOption.el.focus()
    }
  }

  if (event.key === 'Enter') {
    event.preventDefault()
    selectOption(model.value)
    isOpen.value = !isOpen.value
  }

  if (event.key === 'Tab') {
    isOpen.value = false
  }

  if (event.key === ' ') {
    event.preventDefault()
    isOpen.value = !isOpen.value
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

defineExpose({
  toggleDropdown,
})
</script>

<template>
  <component
    :is="as"
    data-select
    tabindex="0"
    ref="$selectContainer"
    role="combobox"
    :aria-expanded="isOpen"
    :aria-activedescendant="model?.value"
    :disabled="disabled"
    @click="toggleDropdown"
    @keydown="handleKeydown"
  >
    <slot />
  </component>
</template>
