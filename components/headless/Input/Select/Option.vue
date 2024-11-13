<script setup lang="ts">
import type { IOption } from '~/types/headless/input'

const props = defineProps<IOption>()

const selectOption = inject('selectOption') as any
const selectedOption = inject('selectedOption') as Ref<IOption>
const registerOption = inject('registerOption') as any

const isSelected = computed(() => selectedOption.value?.value === props.value)

const optionRef = ref<HTMLElement>(null)

onMounted(() => {
  registerOption({ value: props.value, label: props.label, el: optionRef })
})

function select() {
  selectOption({ value: props.value, label: props.label })
}

function setActive() {
  optionRef.value.focus()
}
</script>

<template>
  <button
    data-option
    :data-selected="isSelected"
    @click="select"
    role="option"
    :aria-selected="isSelected"
    @mouseenter="setActive"
    ref="optionRef"
    :value="props.value"
  >
    <slot :is-selected="isSelected"></slot>
  </button>
</template>
