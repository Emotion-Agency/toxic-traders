<script setup lang="ts">
interface iProps {
  id: string
  option: string
  name: string
  type?: string
  disabled?: boolean
}

defineProps<iProps>()

const emit = defineEmits(['inputValue'])
</script>

<template>
  <label
    :for="option"
    class="input-selection"
    :class="[
      `input-selection--${type}`,
      disabled && 'input-selection--disabled',
    ]"
  >
    <span class="input-selection__text">
      {{ option }}
    </span>
    <input
      :id="id"
      :type="type"
      :name="name"
      :value="option"
      :disabled="disabled"
      class="input-selection__type"
      @change="emit('inputValue', option)"
    />
    <span v-if="type === 'radio'" class="input-selection__checkmark" />
    <span v-if="type === 'checkbox'" class="input-selection__checkmark">
      <IconsTheCheck />
    </span>
  </label>
</template>
